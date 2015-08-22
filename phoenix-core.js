// This is my configuration for Phoenix <https://github.com/sdegutis/Phoenix>,
// a super-lightweight OS X window manager that can be configured and
// scripted through Javascript.

var mNone = [],
  mAlt = ['alt'],
  mShiftCmd = ['shift', 'cmd'],
  nudgePixels = 10,
  padding = 0,
  previousSizes = {};

// Remembers hotkey bindings.
var keys = [];
function bind(key, mods, callback, always) {
  var binding = api.bind(key, mods, callback);
  if (!always) {
    keys.push(binding);
  }
}

// ############################################################################
// Helpers
// ############################################################################

// Cycle args for the function, if called repeatedly
// cycleCalls(fn, [ [args1...], [args2...], ... ])
var lastCall = null;
function cycleCalls(fn, argsList) {
  var argIndex = 0, identifier = {};
  return function () {
  if (lastCall !== identifier || ++argIndex >= argsList.length) {
    argIndex = 0;
  }
  lastCall = identifier;
  fn.apply(this, argsList[argIndex]);
  };
}

function bindMulti(keyBindingsList, callback) {
  keyBindingsList.forEach(function(item) {
    if (item.length !== 2) {
      api.alert(item, 0.5);
    }
    bind(item[0], item[1], callback);
  });
}

// Disables all remembered keys.
function disableKeys(notShowTips) {
  active = false;
  _(keys).each(function(key) {
    key.disable();
  });
  if (!notShowTips) {
    api.alert("关闭Phoenix", 0.5);
  }
}

// Enables all remembered keys.
function enableKeys() {
  active = true;
  _(keys).each(function(key) {
    key.enable();
  });
  api.alert("开启Phoenix", 0.5);
}

// alt+<key>方式始终生效，快速切换App
function switchToApp(key, mods, title) {
  var _switchToApp = function() {
    App.focusOrStart(title);

    disableKeys(true);
  };

  bind(key, mods, _switchToApp);
  bind(key, mAlt, _switchToApp, true);
}

function setLayout(keyBindingsList, appLayoutList) {
  var _setLayout = function() {
    appLayoutList.forEach(function(item) {
      var apps = App.allWithTitle(item[0]);

      if (_.isEmpty(apps)) {
        return;
      }

      var grid = item[1];

      var windows = _.chain(apps)
        .map(function(x) { return x.allWindows(); })
        .flatten()
        .value();

      if (_.isEmpty(windows)) {
        return;
      }

      var activeWindows = _(windows).reject(function(win) { return win.isWindowMinimized();});

      if (_.isEmpty(activeWindows)) {
        return;
      }

      activeWindows.forEach(function(win) {
        if (!!win.screen()) {
          windowToGrid(win, grid[0], grid[1], grid[2], grid[3], true);
        }
      });
    });
  };

  keyBindingsList.forEach(function(item) {
    if (item.length !== 2) {
      api.alert(item, 0.5);
    }
    bind(item[0], item[1], _setLayout, true);
  });

  disableKeys(true);
}
// ### Helper methods `Window`
//
// #### Window#toGrid()
//
// This method can be used to push a window to a certain position and size on
// the screen by using four floats instead of pixel sizes.  Examples:
//
//     // Window position: top-left; width: 25%, height: 50%
//     someWindow.toGrid( 0, 0, 0.25, 0.5 );
//
//     // Window position: 30% top, 20% left; width: 50%, height: 35%
//     someWindow.toGrid( 0.3, 0.2, 0.5, 0.35 );
//
// The window will be automatically focussed.  Returns the window instance.
function windowToGrid(window, x, y, width, height, dontFocusWindow) {
  var screen = window.screen().frameWithoutDockOrMenu();

  window.setFrame({
    x: Math.round( x * screen.width ) + padding + screen.x,
    y: Math.round( y * screen.height ) + padding + screen.y,
    width: Math.round( width * screen.width ) - ( 2 * padding ),
    height: Math.round( height * screen.height ) - ( 2 * padding )
  });

  if (!dontFocusWindow) {
    window.focusWindow();
  }

  return window;
}

function toGrid(x, y, width, height) {
  windowToGrid(Window.focusedWindow(), x, y, width, height);
}

Window.prototype.toGrid = function(x, y, width, height) {
  windowToGrid(this, x, y, width, height);
};

// Convenience method, doing exactly what it says.  Returns the window
// instance.
Window.prototype.toFullScreen = function() {
  return this.toGrid( 0, 0, 1, 1 );
};


// Convenience method, pushing the window to the top half of the screen.
// Returns the window instance.
Window.prototype.toN = function() {
  return this.toGrid( 0, 0, 1, 0.5 );
};

// Convenience method, pushing the window to the right half of the screen.
// Returns the window instance.
Window.prototype.toE = function() {
  return this.toGrid( 0.5, 0, 0.5, 1 );
};

// Convenience method, pushing the window to the bottom half of the screen.
// Returns the window instance.
Window.prototype.toS = function() {
  return this.toGrid( 0, 0.5, 1, 0.5 );
};

// Convenience method, pushing the window to the left half of the screen.
// Returns the window instance.
Window.prototype.toW = function() {
  return this.toGrid( 0, 0, 0.5, 1 );
};


// Stores the window position and size, then makes the window full screen.
// Should the window be full screen already, its original position and size
// is restored.  Returns the window instance.
Window.prototype.toggleFullscreen = function() {
  if ( previousSizes[ this ] ) {
  this.setFrame( previousSizes[ this ] );
  delete previousSizes[ this ];
  }
  else {
  previousSizes[ this ] = this.frame();
  this.toFullScreen();
  }

  return this;
};

// Move the currently focussed window left by [`nudgePixel`] pixels.
Window.prototype.nudgeLeft = function( factor ) {
  var win = this,
  frame = win.frame(),
  pixels = nudgePixels * ( factor || 1 );

  if (frame.x >= pixels) {
  frame.x -= pixels;
  } else {
  frame.x = 0;
  }
  win.setFrame( frame );
};

// Move the currently focussed window right by [`nudgePixel`] pixels.
Window.prototype.nudgeRight = function( factor ) {
  var win = this,
  frame = win.frame(),
  maxLeft = win.screen().frameIncludingDockAndMenu().width - frame.width,
  pixels = nudgePixels * ( factor || 1 );

  if (frame.x < maxLeft - pixels) {
  frame.x += pixels;
  } else {
  frame.x = maxLeft;
  }
  win.setFrame( frame );
};

// Move the currently focussed window left by [`nudgePixel`] pixels.
Window.prototype.nudgeUp = function( factor ) {
  var win = this,
  frame = win.frame(),
  pixels = nudgePixels * ( factor || 1 );

  if (frame.y >= pixels) {
  frame.y -= pixels;
  } else {
  frame.y = 0;
  }
  win.setFrame( frame );
};

// Move the currently focussed window right by [`nudgePixel`] pixels.
Window.prototype.nudgeDown = function( factor ) {
  var win = this,
  frame = win.frame(),
  maxTop = win.screen().frameIncludingDockAndMenu().height - frame.height,
  pixels = nudgePixels * ( factor || 1 );

  if (frame.y < maxTop - pixels) {
  frame.y += pixels;
  } else {
  frame.y = maxTop;
  }
  win.setFrame( frame );
};

// #### Functions for growing / shrinking the focussed window.

Window.prototype.growWidth = function() {
  this.nudgeLeft(3);

  var win = this,
  frame = win.frame(),
  screenFrame = win.screen().frameIncludingDockAndMenu(),
  pixels = nudgePixels * 6;

  if (frame.width < screenFrame.width - pixels) {
  frame.width += pixels;
  } else {
  frame.width = screenFrame.width;
  }

  win.setFrame(frame);
};

Window.prototype.growHeight = function() {
  this.nudgeUp(3);

  var win = this,
  frame = win.frame(),
  screenFrame = win.screen().frameIncludingDockAndMenu(),
  pixels = nudgePixels * 6;

  if (frame.height < screenFrame.height - pixels) {
  frame.height += pixels;
  } else {
  frame.height = screenFrame.height;
  }

  win.setFrame(frame);
};

Window.prototype.shrinkWidth = function() {
  var win = this,
  frame = win.frame(),
  screenFrame = win.screen().frameIncludingDockAndMenu(),
  pixels = nudgePixels * 6;

  if (frame.width >= pixels * 2) {
  frame.width -= pixels;
  } else {
  frame.width = pixels;
  }

  win.setFrame(frame);

  this.nudgeRight(3);
};

Window.prototype.shrinkHeight = function() {
  var win = this,
  frame = win.frame(),
  screenFrame = win.screen().frameWithoutDockOrMenu(),
  pixels = nudgePixels * 6;

  if (frame.height >= pixels * 2) {
  frame.height -= pixels;
  } else {
  frame.height = pixels;
  }

  win.setFrame(frame);

  this.nudgeDown(3);
};

// ### Helper methods `App`
//
// Finds the window with a certain title.  Expects a string, returns a window
// instance or `undefined`.  If there are several windows with the same title,
// the first found instance is returned.
App.findByTitle = function( title ) {
  return _( this.runningApps() ).find( function( app ) {
  if ( app.title() === title ) {
    app.show();
    return true;
  }
  });
};


// Finds the window whose title matches a regex pattern.  Expects a string
// (the pattern), returns a window instance or `undefined`.  If there are
// several matching windows, the first found instance is returned.
App.prototype.findWindowMatchingTitle = function( title ) {
  var regexp = new RegExp( title );

  return _( this.visibleWindows() ).find( function( win ) {
  return regexp.test( win.title() );
  });
};


// Finds the window whose title doesn't match a regex pattern.  Expects a
// string (the pattern), returns a window instance or `undefined`.  If there
// are several matching windows, the first found instance is returned.
App.prototype.findWindowNotMatchingTitle = function( title ) {
  var regexp = new RegExp( title );

  return _( this.visibleWindows() ).find( function( win ) {
  return !regexp.test( win.title() );
  });
};


// Returns the first visible window of the app or `undefined`.
App.prototype.firstWindow = function() {
  return this.visibleWindows()[ 0 ];
};

// Start/select apps
App.allWithTitle = function( title ) {
  return _(this.runningApps()).filter( function( app ) {
    if (app.title() === title) {
      return true;
    }
  });
};

App.focusOrStart = function ( title ) {
  var apps = App.allWithTitle( title );
  if (_.isEmpty(apps)) {
    api.alert("启动" + title);
    api.launch(title);
    return;
  }

  var windows = _.chain(apps)
    .map(function(x) { return x.allWindows(); })
    .flatten()
    .value();

  activeWindows = _(windows).reject(function(win) { return win.isWindowMinimized();});
  if (_.isEmpty(activeWindows)) {
    return;
  }

  activeWindows.forEach(function(win) {
    win.focusWindow();
  });
};


