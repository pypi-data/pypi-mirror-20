#! python3

"""Comic Crawler GUI."""

import os
import webbrowser
import re
import tkinter.messagebox as messagebox
import subprocess
import traceback
import sys
import platform
import desktop

import tkinter as tk
import tkinter.ttk as ttk
import tkinter.font as font

from worker import current
from time import time

from .mods import list_domain, get_module, load_config, domain_index
from .config import setting, config
from .safeprint import print, printer
from .core import safefilepath, create_mission
from .error import ModuleError
from .profile import get as profile

from .download_manager import download_manager
from .mission_manager import mission_manager, init_episode, uninit_episode, edit_mission_id
from .channel import download_ch, mission_ch, message_ch

# Translate state code to readible text.
STATE = {
	"INIT": "準備",
	"ANALYZED": "解析完成",
	"DOWNLOADING": "下載中",
	"PAUSE": "停止",
	"FINISHED": "完成",
	"ERROR": "錯誤",
	"INTERRUPT": "已刪除",
	"UPDATE": "有更新",
	"ANALYZING": "分析中",
	"ANALYZE_INIT": "準備分析"
}

def safe_tk(text):
	"""Encode U+FFFF+ characters. Tkinter doesn't allow to display these character. See http://stackoverflow.com/questions/23530080/how-to-print-non-bmp-unicode-characters-in-tkinter-e-g"""

	return re.sub(r"[^\u0000-\uFFFF]", "_", text)
	
def get_scale(root):
	"""To display in high-dpi we need to grab the scale factor from OS"""
	
	# There is no solution on XP
	if platform.system() == "Windows" and platform.release() == "XP":
		return 1.0
	
	# Windows
	# https://github.com/eight04/ComicCrawler/issues/13#issuecomment-229367171
	try:
		from ctypes import windll
		user32 = windll.user32
		user32.SetProcessDPIAware()
		w = user32.GetSystemMetrics(0)
		return w / root.winfo_screenwidth()
	except ImportError:
		pass
	except Exception:
		traceback.print_exc()
	
	# GNome
	try:
		args = ["gsettings", "get", "org.gnome.desktop.interface", "scaling-factor"]
		with subprocess.Popen(args, stdout=subprocess.PIPE, universal_newlines=True) as p:
			return float(p.stdout.read().rpartition(" ")[-1])
	except Exception:
		traceback.print_exc()
		
	return 1.0
	
class DialogProvider:
	"""Create dialog elements."""

	def __init__(self, dialog):
		"""Construct. Inject dialog instance."""
		self.dialog = dialog

	def create_body(self, body):
		"""Override me."""
		pass

	def create_btn_bar(self, btn_bar):
		"""Override me."""
		ttk.Button(btn_bar, text="確定", command=self.dialog.ok, default="active").pack(side="left")
		ttk.Button(btn_bar, text="取消", command=self.dialog.cancel).pack(side="left")

	def apply(self):
		"""Override me."""
		return True

class Dialog(tk.Toplevel):
	"""Create dialog."""

	def __init__(self, parent, title="Dialog", cls=DialogProvider):
		"""Construct."""

		super().__init__(parent)

		self.parent = parent
		self.result = None
		self.provider = cls(self)

		# title
		self.title(safe_tk(title))

		# body
		self.body = ttk.Frame(self)
		self.provider.create_body(self.body)
		self.body.pack()

		# button bar
		self.btn_bar = ttk.Frame(self)
		self.provider.create_btn_bar(self.btn_bar)
		self.btn_bar.pack()

		# bind event
		self.bind("<Return>", self.ok)
		self.bind("<Escape>", self.cancel)

		# show dialog and disable parent
		self.grab_set()
		self.protocol("WM_DELETE_WINDOW", self.cancel)
		self.focus_set()

	def ok(self, event=None):
		"""Apply and destroy dialog."""
		self.withdraw()
		self.update_idletasks()
		self.result = self.provider.apply()
		self.parent.focus_set()
		self.destroy()

	def cancel(self, event=None):
		"""Destroy dialog."""
		self.parent.focus_set()
		self.destroy()

	def wait(self):
		"""Wait the dialog to close."""
		self.wait_window(self)
		return self.result
		
def create_mission_table(parent):
	return Table(
		parent,
		columns = [{
			"id": "#0",
			"text": "#",
			"width": 25
		}, {
			"id": "name",
			"text": "任務"
		}, {
			"id": "host",
			"text": "主機",
			"width": 50,
			"anchor": "center"
		}, {
			"id": "state",
			"text": "狀態",
			"width": 70,
			"anchor": "center"
		}]
	)

class MainWindow:
	"""Create main window GUI."""
	def __init__(self):
		"""Construct."""
		
		self.thread = current()
		self.pre_url = None

		self.create_view()
		
		self.pool_index = {
			id(mission_manager.view): self.view_table,
			id(mission_manager.library): self.library_table
		}
		
		self.bindevent()
		
		self.register_listeners()
		
		printer.add_listener(self.sp_callback)

		if (setting.getboolean("libraryautocheck") and
			time() - setting.getfloat("lastcheckupdate", 0) > 24 * 60 * 60):
			download_manager.start_check_update()
			
		self.update_table(mission_manager.view)
		self.update_table(mission_manager.library)
		
		self.save()
		self.update()
		self.root.mainloop()
		
	def update(self):
		"""Cleanup message every 100 milliseconds."""
		self.thread.update()
		self.root.after(100, self.update)
		
	def save(self):
		"""Save mission periodly"""
		mission_manager.save()
		self.root.after(int(setting.getfloat("autosave", 5) * 60 * 1000), self.save)

	def update_mission_info(self, table, mission):
		"""Update mission info on treeview."""
		if not table.contains(mission):
			return
		table.update(
			mission,
			name=safe_tk(mission.title),
			state=STATE[mission.state]
		)

	def register_listeners(self):
		"""Add listeners."""
		
		mission_ch.sub(self.thread)
		download_ch.sub(self.thread)
		message_ch.sub(self.thread)
		
		@self.thread.listen("LOG_MESSAGE")
		def _(event):
			text = event.data.splitlines()[0]
			self.statusbar["text"] = safe_tk(text)

		@self.thread.listen("MISSION_PROPERTY_CHANGED")
		def _(event):
			self.update_mission_info(self.view_table, event.data)
			self.update_mission_info(self.library_table, event.data)

		@self.thread.listen("MISSION_LIST_REARRANGED")
		def _(event):
			self.update_table(event.data)

		@self.thread.listen("MISSION_ADDED")
		def _(event):
			mission = event.data
			
			init_episode(mission)
			if len(mission.episodes) == 1:
				uninit_episode(mission)
				return
				
			if not select_episodes(self.root, mission):
				mission_manager.remove("view", mission)

		@self.thread.listen("ANALYZE_FAILED", priority=100)
		def _(event):
			if event.target not in download_manager.analyze_threads:
				return
			error, mission = event.data
			messagebox.showerror(
				mission.module.name,
				"解析錯誤！\n{}".format(error)
			)

		@self.thread.listen("MISSION_POOL_LOAD_FAILED")
		def _(event):
			messagebox.showerror(
				"Comic Crawler",
				"讀取存檔失敗！\n{}".format(event.data)
			)

		@self.thread.listen("DOWNLOAD_INVALID")
		def _(event):
			err, mission = event.data
			messagebox.showerror(mission.module.name, err)

		@self.thread.listen("ANALYZE_INVALID")
		def _(event):
			err, mission = event.data
			messagebox.showerror(mission.module.name, err)
			
		@self.thread.listen("LIBRARY_CHECK_UPDATE_FAILED")
		def _(event):
			messagebox.showerror("Comic Crawler", "檢查更新未完成，已重試 10 次")

	def create_view(self):
		"""Draw the window."""
		self.root = tk.Tk()
		
		if sys.platform.startswith("linux"):
			try:
				ttk.Style().theme_use("clam")
			except tk.TclError:
				pass
		
		scale = get_scale(self.root)
		if scale < 1:
			scale = 1.0

		self.root.title("Comic Crawler")
		self.root.geometry("{w}x{h}".format(
			w=int(500 * scale),
			h=int(400 * scale)
		))
		
		if scale != 1:
			old_scale = self.root.tk.call('tk', 'scaling')
			self.root.tk.call("tk", "scaling", old_scale * scale)
			
		# Use pt for builtin fonts
		for name in ("TkDefaultFont", "TkTextFont", "TkHeadingFont", "TkMenuFont", "TkFixedFont", "TkTooltipFont", "TkCaptionFont", "TkSmallCaptionFont", "TkIconFont"):
			f = font.nametofont(name)
			size = f.config()["size"]
			if size < 0:
				size = int(-size / 96 * 72)
				f.config(size=size)

		# Treeview doesn't scale its rowheight
		ttk.Style().configure("Treeview", rowheight=int(20 * scale))
		
		tk.Label(self.root,text="輸入連結︰").pack(anchor="w")

		# url entry
		entry_url = ttk.Entry(self.root)
		entry_url.pack(fill="x")
		self.entry_url = entry_url

		# bunch of buttons
		buttonbox = ttk.Frame(self.root)
		buttonbox.pack()

		btnaddurl = ttk.Button(buttonbox, text="加入連結")
		btnaddurl.pack(side="left")
		self.btn_addurl = btnaddurl

		btnstart = ttk.Button(buttonbox, text="開始下載")
		btnstart.pack(side="left")
		self.btn_start = btnstart

		btnstop = ttk.Button(buttonbox,text="停止下載")
		btnstop.pack(side="left")
		self.btn_stop = btnstop

		btnclean = ttk.Button(buttonbox, text="移除已完成")
		btnclean.pack(side="left")
		self.btn_clean = btnclean

		btnconfig = ttk.Button(buttonbox, text="重載設定檔")
		btnconfig.pack(side="left")
		self.btn_config = btnconfig

		# notebook
		self.notebook = ttk.Notebook(self.root)
		self.notebook.pack(expand=True, fill="both")

		# download manager
		frame = ttk.Frame(self.notebook)
		self.notebook.add(frame, text="任務列表")
		
		# mission table
		self.view_table = create_mission_table(frame)

		# library
		frame = ttk.Frame(self.notebook)
		self.notebook.add(frame, text="圖書館")

		# library buttons
		btnBar = ttk.Frame(frame)
		btnBar.pack()

		self.btn_update = ttk.Button(btnBar, text="檢查更新")
		self.btn_update.pack(side="left")

		self.btn_download_update = ttk.Button(btnBar, text="下載更新")
		self.btn_download_update.pack(side="left")

		# library treeview scrollbar container
		frame_lib = ttk.Frame(frame)
		frame_lib.pack(expand=True, fill="both")
		
		# library table
		self.library_table = create_mission_table(frame_lib)

		# domain list
		frame = ttk.Frame(self.notebook)
		self.notebook.add(frame, text="支援的網域")
		
		table = Table(frame, columns = [{
			"id": "host",
			"text": "域名"
		}, {
			"id": "mod",
			"text": "模組",
			"anchor": "center"
		}], tv_opt={"show": "headings"})
		
		for domain in list_domain():
			table.add({
				"host": domain,
				"mod": domain_index[domain].name
			})
			
		# status bar
		statusbar = ttk.Label(self.root, text="Comic Crawler", anchor="e")
		statusbar.pack(anchor="e")
		self.statusbar = statusbar

	def remove(self, pool_name, *missions):
		"""Wrap mission_manager.remove."""
		for mission in missions:
			if mission.state in ("DOWNLOADING", "ANALYZING"):
				messagebox.showerror("Comic Crawler", "刪除任務失敗！任務使用中")
		mission_manager.remove(pool_name, *missions)

	def bindevent(self):
		"""Bind events."""
		def trieveclipboard(event):
			# Do nothing if there is something in the entry
			if self.entry_url.get():
				return

			try:
				url = self.root.clipboard_get(type="STRING")
			except Exception:
				return

			if get_module(url) and url != self.pre_url:
				self.entry_url.insert(0, url)
				self.entry_url.selection_range(0, "end")
				self.entry_url.focus_set()
		self.root.bind("<FocusIn>", trieveclipboard)

		def entrykeypress(event):
			addurl()
		self.entry_url.bind("<Return>", entrykeypress)

		def ask_analyze_update(mission):
			return messagebox.askyesno(
				"Comic Crawler",
				safe_tk(mission.title) + "\n\n任務已存在，要檢查更新嗎？",
				default="yes"
			)

		# interface for download manager
		def addurl():
			url = self.entry_url.get()
			self.entry_url.delete(0, "end")

			try:
				mission = mission_manager.get_by_url(url)
			except KeyError:
				pass
			else:
				self.pre_url = url
				if ask_analyze_update(mission):
					mission.state = 'ANALYZE_INIT'
					download_manager.start_analyze(mission)
				return
					
			try:
				mission = create_mission(url)
			except ModuleError:
				messagebox.showerror(
					"Comic Crawler",
					"建立任務失敗！不支援的網址！"
				)
			else:
				self.pre_url = url
				download_manager.start_analyze(mission)

		self.btn_addurl["command"] = addurl

		def startdownload():
			download_manager.start_download()
		self.btn_start["command"] = startdownload

		def stopdownload():
			download_manager.stop_download()
			print("停止下載")
		self.btn_stop["command"] = stopdownload

		def cleanfinished():
			# mission_manager.clean_finished()
			missions = mission_manager.get_by_state("view", ("FINISHED",), all=True)
			if not missions:
				return
			mission_manager.remove("view", *missions)
			print("移除 " + ", ".join(mission.title for mission in missions))
		self.btn_clean["command"] = cleanfinished

		def reloadconfig():
			config.load()
			load_config()
			print("設定檔重載成功！")
		self.btn_config["command"] = reloadconfig

		def create_menu_set(name, table):
			"""Create a set of menu"""
			menu = tk.Menu(table.tv, tearoff=False)

			# bind menu helper
			def bind_menu(label):
				def bind_menu_inner(func):
					menu.add_command(label=label, command=func)
					return func
				return bind_menu_inner

			# add commands...
			@bind_menu("刪除")
			def tvdelete():
				if messagebox.askyesno("Comic Crawler", "確定刪除？"):
					self.remove(name, *table.selected())

			@bind_menu("移至頂部")
			def tvlift():
				mission_manager.lift(name, *table.selected())

			@bind_menu("移至底部")
			def tvdrop():
				mission_manager.drop(name, *table.selected())

			@bind_menu("改名")
			def tvchangetitle():
				selected = table.selected()
				if not selected:
					return
				mission = selected[0]
				select_title(self.root, mission)

			@bind_menu("重新選擇集數")
			def tvReselectEP():
				for mission in table.selected():
					reselect_episodes(self.root, mission)

			@bind_menu("開啟資料夾")
			def tvOpen():
				for mission in table.selected():
					savepath = profile(mission.module.config["savepath"])
					folder = os.path.join(savepath, safefilepath(mission.title))
					folder = os.path.expanduser(folder)
					if not os.path.isdir(folder):
						os.makedirs(folder)
					desktop.open(folder)

			@bind_menu("開啟網頁")
			def tvOpenBrowser():
				for mission in table.selected():
					webbrowser.open(mission.url)

			if name == "view":
				@bind_menu("加入圖書館")
				def tvAddToLib():
					missions = table.selected()
					titles = [ m.title for m in missions ]
					mission_manager.add("library", *missions)
					print("已加入圖書館︰{}".format(", ".join(titles)))

			# menu call
			def tvmenucall(event):
				menu.tk_popup(event.x_root, event.y_root)
			table.tv.bind("<Button-3>", tvmenucall)

		create_menu_set("view", self.view_table)

		# library buttons
		def libCheckUpdate():
			download_manager.start_check_update()
		self.btn_update["command"] = libCheckUpdate

		def libDownloadUpdate():
			missions = mission_manager.get_by_state("library", ("UPDATE",), all=True)
			if not missions:
				messagebox.showerror("Comic Crawler", "沒有新更新的任務")
				return
			mission_manager.add("view", *missions)
			download_manager.start_download()
			self.notebook.select(0)
		self.btn_download_update["command"] = libDownloadUpdate

		# library menu
		create_menu_set("library", self.library_table)

		# close window event
		def beforequit():
			if download_manager.is_downloading():
				if not messagebox.askokcancel(
						"Comic Crawler",
						"任務下載中，確定結束？"):
					return
					
			# going to quit
			printer.remove_listener(self.sp_callback)		
		
			self.root.destroy()
			
			download_manager.stop_download()
			download_manager.stop_analyze()
			download_manager.stop_check_update()
			
			mission_manager.save()
			
			config.save()
			
		self.root.protocol("WM_DELETE_WINDOW", beforequit)

	def sp_callback(self, text):
		"""Transport text to LOG_MESSAGE event."""
		message_ch.pub("LOG_MESSAGE", text)

	def update_table(self, pool):
		"""Refresh treeview."""
		table = self.pool_index[id(pool)]
		missions = pool.values()
		
		table.clear(exclude=missions)
		
		for mission in missions:
			if not table.contains(mission):
				table.add({
					"name": safe_tk(mission.title),
					"host": mission.module.name,
					"state": STATE[mission.state]
				}, key=mission)
				
		table.rearrange(missions)

def reselect_episodes(parent, mission):
	"""Reselect episode"""
	if select_episodes(parent, mission):
		mission.state = "ANALYZED"

def select_title(parent, mission):
	"""Create dialog to change mission title."""

	class Provider(DialogProvider):
		def create_body(self, body):
			entry = ttk.Entry(body)
			entry.insert(0, safe_tk(mission.title))
			entry.selection_range(0, "end")
			entry.pack()
			entry.focus_set()
			self.entry = entry

		def apply(self):
			title = self.entry.get()
			mission.title = title

	with edit_mission_id(mission):
		return Dialog(parent, title="重命名", cls=Provider).wait()

def select_episodes(parent, mission):
	"""Create dialog to select episodes."""
	
	init_episode(mission)

	class Provider(DialogProvider):
		def create_body(self, body):
			xscrollbar = ttk.Scrollbar(body, orient="horizontal")
			canvas = tk.Canvas(
				body,
				xscrollcommand=xscrollbar.set,
				highlightthickness="0"
			)

			# split to each page
			pages = [mission.episodes[i:i + 20] for i in range(0, len(mission.episodes), 20)]
			# split to each window
			windows = [pages[i:i + 10] for i in range(0, len(pages), 10)]

			self.ck_holder = ck_holder = {}

			def set_page(ck, page):
				def callback():
					if ck.instate(("selected",)):
						value = ("selected", )
					else:
						value = ("!selected", )

					for ep in page:
						ck_holder[ep].state(value)
				return callback

			left = 0
			for window in windows:
				inner = ttk.Frame(canvas)
				for p_i, page in enumerate(window):
					for e_i, ep in enumerate(page):
						ck = ttk.Checkbutton(inner, text=safe_tk(ep.title))
						ck.state(("!alternate",))
						if not ep.skip:
							ck.state(("selected",))
						ck.grid(column=p_i, row=e_i, sticky="w")
						ck_holder[ep] = ck
					ck = ttk.Checkbutton(inner)
					ck.state(("!alternate", "selected"))
					ck.grid(column=p_i, row=e_i + 1, sticky="w")
					ck.config(command=set_page(ck, page))
				canvas.create_window((left, 0), window=inner, anchor="nw")
				inner.update_idletasks()
				left += inner.winfo_reqwidth()

			# Resize canvas
			canvas.update_idletasks()
			cord = canvas.bbox("all")
			canvas.config(
				scrollregion=cord,
				height=cord[3],
				width=cord[2]
			)

			# caculates canvas's size then deside wether to show scrollbar
			def decide_scrollbar(event):
				if canvas.winfo_width() >= canvas.winfo_reqwidth():
					xscrollbar.pack_forget()
					canvas.unbind("<Configure>")
			canvas.bind("<Configure>", decide_scrollbar)

			# draw innerframe on canvas then show
			canvas.pack()

			# link scrollbar to canvas then show
			xscrollbar.config(command=canvas.xview)
			xscrollbar.pack(fill="x")

		def create_btn_bar(self, btn_bar):
			ttk.Button(btn_bar, text="反相", command=self.toggle).pack(side="left")
			super().create_btn_bar(btn_bar)

		def apply(self):
			for ep, ck in self.ck_holder.items():
				ep.skip = not ck.instate(("selected",))
			return len([ i for i in mission.episodes if not i.skip ])

		def toggle(self):
			for ep, ck in self.ck_holder.items():
				if ck.instate(("selected", )):
					ck.state(("!selected", ))
				else:
					ck.state(("selected", ))

	ret = Dialog(parent, title="選擇集數", cls=Provider).wait()
	
	uninit_episode(mission)
	
	return ret

class Table:
	def __init__(self, parent, *, tv_opt={}, columns=[]):
		# scrollbar
		scrbar = ttk.Scrollbar(parent)
		scrbar.pack(side="right", fill="y")
		self.scrbar = scrbar
		
		# treeview
		tv = ttk.Treeview(
			parent,
			columns=[c["id"] for c in columns if c["id"] != "#0"],
			yscrollcommand=scrbar.set,
			**tv_opt
		)
		for c in columns:
			tv.heading(c["id"], text=c["text"])
			tv.column(c["id"], **{k: v for k, v in c.items() if k in ("width", "anchor")})
		tv.pack(expand=True, fill="both")
		self.tv = tv
		
		scrbar.config(command=tv.yview)
		
		self.key_index = {}
		self.iid_index = {}
		
	def add(self, row, *, key=None):
		if key and key in self.key_index:
			return
		iid = self.tv.insert("", "end")
		if not key:
			key = iid
		self.key_index[key] = iid
		self.iid_index[iid] = key
		self.update(key, **row)
		return key
		
	def remove(self, *rows):
		self.tv.delete(*[self.key_index[k] for k in rows])
		for key in rows:
			if key not in self.key_index:
				continue
			iid = self.key_index[key]
			del self.key_index[key]
			del self.iid_index[iid]
		
	def clear(self, *, exclude=[]):
		keys = [key for key in self.key_index if key not in exclude]
		self.remove(*keys)
		
	def rearrange(self, rows):
		count = len(self.key_index)
		for key in rows:
			if key not in self.key_index:
				continue
			iid = self.key_index[key]
			self.tv.move(iid, "", count)
		
	def update(self, key, **kwargs):
		if key not in self.key_index:
			return
		iid = self.key_index[key]
		for column, value in kwargs.items():
			self.tv.set(iid, column, value)
			
	def selected(self):
		return [self.iid_index[i] for i in self.tv.selection()]
		
	def contains(self, key):
		return key in self.key_index
