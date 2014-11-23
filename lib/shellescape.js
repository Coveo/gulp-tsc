'use strict';

var path = require('path');

module.exports = shellescape;

var isWin = /^win/.test(process.platform);

function shellescape(arg) {
  if (Array.isArray(arg)) {
    return arg.map(shellescape).join(" ");
  } else {
    if (isWin) {
      return escapeWindowsPath(arg);
    } else {
      return escapeUnixPath(arg);
    }
  }
}

function escapeUnixPath(arg) {
  var regex = /["'` \\$]/g;
  if (regex.test(arg)) {
    return '"' + arg.replace(regex, '\\$1') + '"';
  } else {
    return arg;
  }
}

function escapeWindowsPath(arg) {
  var regex = /["' ]/g;
  if (regex.test(arg)) {
    return '"' + arg + '"';
  } else {
    return arg;
  }
}
