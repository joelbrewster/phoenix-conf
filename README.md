
# English Version

## What is this?

> This is my config for [kasper/phoenix](https://github.com/kasper/phoenix), a lightweight window manager for OS X that is scriptable using JavaScript. If you have ever used [jigish/slate](https://github.com/jigish/slate) or `Divvy/SizeUp/ShiftIt/Moom/Spectacle/Optimal Layout`, this is a great substitute.

> **Note:** the default `master`-branch will always be stable.

## Installation

```
git clone git@github.com:NsLib/phoenix-conf.git ~/phoenix
ln -s ~/phoenix/phoenix-core.js ~/.phoenix-core.js
ln -s ~/phoenix/phoenix.js ~/.phoenix.js
```

## Features

* Vim-like key binding.
* You can custom your window layouts easily.
* Focus/start a window(program) with shortcuts.
* Use custom grid to 'draw' a window's desired size and location.
* Move windows around quickly using your keyboard.
* Adjust window size using your keyboard easily.

## Shortcuts

> Global keybings

| shortcut           | info                                                               |
| :---               | :---                                                               |
| `Shift + Cmd + a`  | Toggle vim-mode.                                                   |
| `space`            | Left vim-mode.                                                     |
| `return`           | Left vim-mode.                                                     |
| `Shift + Cmd + \`` | Toggle fullscreen of current window.                               |
| `Shift + Cmd + 1`  | Move and resize current window to the left side of screen(1/2).    |
| `Shift + Cmd + 2`  | Move and resize current window to the right side of screen(1/2).   |
| `Shift + Cmd + 3`  | Move and resize current window to the top-left of screen(1/4).     |
| `Shift + Cmd + 4`  | Move and resize current window to the bottom-left of screen(1/4).  |
| `Shift + Cmd + 5`  | Move and resize current window to the top-right of screen(1/4).    |
| `Shift + Cmd + 6`  | Move and resize current window to the bottom-right of screen(1/4). |
| `Shift + Alt + 1`  | Change to custom layout 1.                                         |
| `Shift + Alt + 2`  | Change to custom layout 2.                                         |
| `Shift + Alt + 3`  | Change to custom layout 3.                                         |
| `Alt + c`          | Focus or start `Google Chrome`                                     |
| `Alt + f`          | Focus or start `Finder`                                            |
| `Alt + i`          | Focus or start `iTerm`                                             |
| `Alt + s`          | Focus or start `Sublime Text 2`                                    |
| `Alt + t`          | Focus or start `Clear`                                             |

> Under vim-mode

| shortcut    | info                                                               |
| :---        | :---                                                               |
| `↑`         | Move the focussed window(up)                                       |
| `↓`         | Move the focussed window(down)                                     |
| `←`         | Move the focussed window(left)                                     |
| `→`         | Move the focussed window(right)                                    |
| `h`         | Move the focussed window(left)                                     |
| `j`         | Move the focussed window(down)                                     |
| `k`         | Move the focussed window(up)                                       |
| `l`         | Move the focussed window(right)                                    |
| `Shift + →` | Grow width                                                         |
| `Shift + ←` | Shrink width                                                       |
| `Shift + ↓` | Grow height                                                        |
| `Shift + ↑` | Shrink height                                                      |
| `Shift + l` | Grow width                                                         |
| `Shift + h` | Shrink width                                                       |
| `Shift + j` | Grow height                                                        |
| `Shift + k` | Shrink height                                                      |
| `space`     | Toggle fullscreen of current window                                |
| `1`         | Move and resize current window to the left side of screen(1/2).    |
| `2`         | Move and resize current window to the right side of screen(1/2).   |
| `3`         | Move and resize current window to the top-left of screen(1/4).     |
| `4`         | Move and resize current window to the bottom-left of screen(1/4).  |
| `5`         | Move and resize current window to the top-right of screen(1/4).    |
| `6`         | Move and resize current window to the bottom-right of screen(1/4). |

## Thanks

* [kasper/phoenix](https://github.com/kasper/phoenix)
* [teetrinkers/.phoenix.js](https://gist.github.com/teetrinkers/9435065)
* [jakemcc/dotfiles](https://github.com/jakemcc/dotfiles/blob/master/home/.phoenix.js)

## License

GNU GENERAL PUBLIC LICENSE VERSION 2. See [license](LICENSE.md).

# 中文版本

## 能做什么?

> 这个项目是我为 kasper/phoenix](https://github.com/kasper/phoenix) 编写的配置文件(一个OS X平台，可以使用JavaScript编程的轻量级窗口管理器). 如果你曾经使用过 [jigish/slate](https://github.com/jigish/slate) 或者 `Divvy/SizeUp/ShiftIt/Moom/Spectacle/Optimal Layout`, 这个项目是一个非常棒的替代品.

> **注意:** `master` 分支始终稳定可用

## 安装

```
git clone git@github.com:NsLib/phoenix-conf.git ~/phoenix
ln -s ~/phoenix/phoenix-core.js ~/.phoenix-core.js
ln -s ~/phoenix/phoenix.js ~/.phoenix.js
```

## 特性

* Vim-like快捷键绑定.
* 可以非常容易的自定义窗口布局.
* 使用快捷键切换到/启动一个窗口(程序).
* 使用'网格'来调整窗口大小和位置.
* 使用键盘快速调整窗口位置.
* 使用键盘快速调整窗口大小.

## 快捷键

> 全局快捷键

| 快捷键             | 说明                             |
| :---               | :---                             |
| `Shift + Cmd + a`  | 开启/关闭vim-mode.               |
| `space`            | 关闭vim-mode.                    |
| `return`           | 关闭vim-mode.                    |
| `Shift + Cmd + \`` | 全屏/恢复当前窗口大小.           |
| `Shift + Cmd + 1`  | 调整窗口到左半边屏幕.            |
| `Shift + Cmd + 2`  | 调整窗口到右半边屏幕.            |
| `Shift + Cmd + 3`  | 调整窗口到左上屏幕(1/4屏幕大小). |
| `Shift + Cmd + 4`  | 调整窗口到左下屏幕(1/4屏幕大小). |
| `Shift + Cmd + 5`  | 调整窗口到右上屏幕(1/4屏幕大小). |
| `Shift + Cmd + 6`  | 调整窗口到右下屏幕(1/4屏幕大小). |
| `Shift + Alt + 1`  | 切换到自定义布局1.               |
| `Shift + Alt + 2`  | 切换到自定义布局1.               |
| `Shift + Alt + 3`  | 切换到自定义布局1.               |
| `Alt + c`          | 切换到/启动 `Google Chrome`      |
| `Alt + f`          | 切换到/启动 `Finder`             |
| `Alt + i`          | 切换到/启动 `iTerm`              |
| `Alt + s`          | 切换到/启动 `Sublime Text 2`     |
| `Alt + t`          | 切换到/启动 `Clear`              |

> vim-mode下快捷键

| 快捷键      | 说明                             |
| :---        | :---                             |
| `↑`         | 向上移动窗口                     |
| `↓`         | 向下移动窗口                     |
| `←`         | 向左移动窗口                     |
| `→`         | 向右移动窗口                     |
| `h`         | 向左移动窗口                     |
| `j`         | 向下移动窗口                     |
| `k`         | 向上移动窗口                     |
| `l`         | 向右移动窗口                     |
| `Shift + →` | 增加宽度                         |
| `Shift + ←` | 减少宽度                         |
| `Shift + ↓` | 增加高度                         |
| `Shift + ↑` | 减少高度                         |
| `Shift + l` | 增加宽度                         |
| `Shift + h` | 减少宽度                         |
| `Shift + j` | 增加高度                         |
| `Shift + k` | 减小高度                         |
| `space`     | 全屏/恢复当前窗口大小            |
| `1`         | 调整窗口到左半边屏幕.            |
| `2`         | 调整窗口到右半边屏幕.            |
| `3`         | 调整窗口到左上屏幕(1/4屏幕大小). |
| `4`         | 调整窗口到左下屏幕(1/4屏幕大小). |
| `5`         | 调整窗口到右上屏幕(1/4屏幕大小). |
| `6`         | 调整窗口到右下屏幕(1/4屏幕大小). |

## 致谢

* [kasper/phoenix](https://github.com/kasper/phoenix)
* [teetrinkers/.phoenix.js](https://gist.github.com/teetrinkers/9435065)
* [jakemcc/dotfiles](https://github.com/jakemcc/dotfiles/blob/master/home/.phoenix.js)

## 开源协议

GNU GENERAL PUBLIC LICENSE VERSION 2. 见 [license](LICENSE.md).
