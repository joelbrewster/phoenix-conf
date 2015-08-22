// This is my configuration for Phoenix <https://github.com/sdegutis/Phoenix>,
// a super-lightweight OS X window manager that can be configured and
// scripted through Javascript.

var mNone = [],
  mCmd = ['cmd'],
  mAlt = ['alt'],
  mShift = ['shift'],
  mShiftCmd = ['shift', 'cmd'],
  mShiftAlt = ['shift', 'alt'];

var APPNAMES = {
  IM: 'QQ',
  Mail: 'Microsoft Outlook',
  QIM: 'Qunar Talk',
  Term: 'iTerm',
  FileManager: 'Finder',
  Browser: 'Google Chrome',
  Movie: '爱奇艺视频',
  TextEditor: 'Sublime Text 2',
  Todolist: 'Clear',
  Wechat: '微信',
  Preview: '预览',
};

var LAYOUTS = {
  left: [0, 0, 0.5, 1],
  right: [0.5, 0, 0.5, 1],

  left4: [0, 0, 0.33, 1],
  left6: [0, 0, 0.5, 1],
  left8: [0, 0, 0.66, 1],
  right4: [0.66, 0, 0.33, 1],
  right6: [0.5, 0, 0.5, 1],
  right8: [0.33, 0, 0.66, 1],
};

require('phoenix-core.js');

// ############################################################################
// Modal activation
// ############################################################################

// Modal activator
// This hotkey enables/disables all other hotkeys.
var active = false;
api.bind('a', mShiftCmd, function() {
  if (!active) {
    enableKeys();
  } else {
    disableKeys();
  }
});
api.bind('a', mShiftAlt, function() {
  if (!active) {
    enableKeys();
  } else {
    disableKeys();
  }
});

// These keys end Phoenix mode.
bind('escape', [], function() {
  disableKeys();
});
bind('return', [], function() {
  disableKeys();
});

// ############################################################################
// Bindings
// ############################################################################

// ### General key configurations
//
// Space toggles the focussed between full screen and its initial size and position.
bind( 'space', mNone, function() {
  Window.focusedWindow().toggleFullscreen();
  disableKeys();
});

// The cursor keys together with cmd make any window occupy any
// half of the screen.
bindMulti([
  ['right', mCmd],
  ['l', mCmd],
], cycleCalls(
  toGrid,
  [
    [0.5, 0, 0.5, 1], 
    [0.75, 0, 0.25, 1]
  ]
));

bindMulti([
  ['left', mCmd],
  ['h', mCmd],
], cycleCalls(
  toGrid,
  [
    [0, 0, 0.5, 1],
    [0, 0, 0.25, 1]
  ]
));

bindMulti([
  ['down', mCmd],
  ['j', mCmd],
], function() {
  Window.focusedWindow().toGrid(0, 0.7, 1, 0.3);
});

bindMulti([
  ['up', mCmd],
  ['k', mCmd],
], function() {
  Window.focusedWindow().toGrid(0, 0, 1, 0.3);
});

// 左右分屏，四等分屏幕
var changeLayout = function(x, y, width, height) {
  return function() {
    Window.focusedWindow().toGrid(x, y, width, height);
    disableKeys();
  };
};

bind('`', mShiftCmd, function() {
  Window.focusedWindow().toggleFullscreen();
  disableKeys();
}, true);
bind('1', mShiftCmd, changeLayout(0, 0, 0.5, 1), true);
bind('2', mShiftCmd, changeLayout(0.5, 0, 0.5, 1), true);
bind('3', mShiftCmd, changeLayout(0, 0, 0.5, 0.5), true);
bind('4', mShiftCmd, changeLayout(0, 0.5, 0.5, 0.5), true);
bind('5', mShiftCmd, changeLayout(0.5, 0, 0.5, 0.5), true);
bind('6', mShiftCmd, changeLayout(0.5, 0.5, 0.5, 0.5), true);

// The cursor keys move the focussed window.
// hjkl / ← ↑ → ↓ 移动窗口
bindMulti([
  ['up', mNone], 
  ['k', mNone],
], function() {
  Window.focusedWindow().nudgeUp( 5 );
});

bindMulti([
  ['down', mNone], 
  ['j', mNone],
], function() {
  Window.focusedWindow().nudgeDown( 5 );
});

bindMulti([
  ['left', mNone], 
  ['h', mNone],
], function() {
  Window.focusedWindow().nudgeLeft( 5 );
});

bindMulti([
  ['right', mNone], 
  ['l', mNone],
], function() {
  Window.focusedWindow().nudgeRight( 5 );
});

// <SHIFT> + cursor keys grows/shrinks the focussed window.
bindMulti([
  ['right', mShift],
  ['l', mShift],
], function() {
  Window.focusedWindow().growWidth();
});

bindMulti([
  ['left', mShift],
  ['h', mShift],
], function() {
  Window.focusedWindow().shrinkWidth();
});

bindMulti([
  ['up', mShift],
  ['k', mShift],
], function() {
  Window.focusedWindow().shrinkHeight();
});

bindMulti([
  ['down', mShift],
  ['j', mShift],
], function() {
  Window.focusedWindow().growHeight();
});

// ############################################################################
// Bindings for specific apps
// ############################################################################

switchToApp('b', mNone, APPNAMES.Movie);
switchToApp('c', mNone, APPNAMES.Browser);
switchToApp('e', mNone, APPNAMES.QIM);
switchToApp('f', mNone, APPNAMES.FileManager);
switchToApp('i', mNone, APPNAMES.Term);
switchToApp('m', mNone, APPNAMES.Mail);
switchToApp('q', mNone, APPNAMES.IM);
switchToApp('r', mNone, APPNAMES.QIM);
switchToApp('s', mNone, APPNAMES.TextEditor);
switchToApp('t', mNone, APPNAMES.Todolist);
switchToApp('w', mNone, APPNAMES.Wechat);
switchToApp('y', mNone, APPNAMES.Preview);

// ############################################################################
// Bindings for layouts
// ############################################################################
setLayout([
  ['1', mShiftAlt],
], [
  [APPNAMES.IM, LAYOUTS.left],
  [APPNAMES.QIM, LAYOUTS.left],
  [APPNAMES.Term, LAYOUTS.left],
  [APPNAMES.Browser, LAYOUTS.right],
  [APPNAMES.FileManager, LAYOUTS.right],
  [APPNAMES.Mail, LAYOUTS.right],
]);
setLayout([
  ['2', mShiftAlt],
], [
  [APPNAMES.IM, LAYOUTS.left],
  [APPNAMES.QIM, LAYOUTS.left],
  [APPNAMES.Term, LAYOUTS.left4],
  [APPNAMES.Browser, LAYOUTS.right8],
  [APPNAMES.FileManager, LAYOUTS.right],
  [APPNAMES.Mail, LAYOUTS.right],
]);
setLayout([
  ['3', mShiftAlt],
], [
  [APPNAMES.IM, LAYOUTS.left],
  [APPNAMES.QIM, LAYOUTS.left],
  [APPNAMES.Term, LAYOUTS.left8],
  [APPNAMES.Browser, LAYOUTS.right4],
  [APPNAMES.FileManager, LAYOUTS.right],
  [APPNAMES.Mail, LAYOUTS.right],
]);

// ############################################################################
// Init
// ############################################################################

disableKeys();
