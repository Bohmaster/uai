/**
 * @name uaiApp
 * @desc Angular main application
 */
angular
  .module('uaiApp', [
    // declare dependencies
    'lbServices',

    'ui.router',
    'ui.bootstrap',
    'ui.tinymce',

    'uai.module.core',
  ])
  .config(function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  });
