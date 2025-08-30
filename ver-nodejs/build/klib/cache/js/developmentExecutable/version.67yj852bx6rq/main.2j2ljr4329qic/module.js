(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', './kotlin-kotlin-stdlib.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('./kotlin-kotlin-stdlib.js'));
  else {
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'pskov:ver-nodejs'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'pskov:ver-nodejs'.");
    }
    globalThis['pskov:ver-nodejs'] = factory(typeof globalThis['pskov:ver-nodejs'] === 'undefined' ? {} : globalThis['pskov:ver-nodejs'], globalThis['kotlin-kotlin-stdlib']);
  }
}(function (_, kotlin_kotlin) {
  'use strict';
  //region block: imports
  var println = kotlin_kotlin.$_$.a;
  //endregion
  //region block: pre-declaration
  //endregion
  function tmpHWFun() {
    println('Hello, PSKOV2 of KMP');
  }
  //region block: exports
  function $jsExportAll$(_) {
    var $org = _.org || (_.org = {});
    var $org$opengamestudio = $org.opengamestudio || ($org.opengamestudio = {});
    $org$opengamestudio.tmpHWFun = tmpHWFun;
  }
  $jsExportAll$(_);
  //endregion
  return _;
}));
