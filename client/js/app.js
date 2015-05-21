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
    'uai.module.core',
  ]);
