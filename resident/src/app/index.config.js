(function() {
  'use strict';

  angular
    .module('bProject')
    .config(['$logProvider', 'toastrConfig', '$httpProvider', config]);

  /** @ngInject */
  function config($logProvider, toastrConfig, $httpProvider) {

    // Http interceptor
    $httpProvider.interceptors.push('binnersInterceptor');

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }
})();
