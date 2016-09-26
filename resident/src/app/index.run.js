(function() {
  'use strict';

  angular
    .module('bProject')
    .run(runBlock);

  function runBlock($rootScope, $log) {
    /*
    var timeout;
    $window.addEventListener('resize', function() {
        clearTimeout(timeout);
        timeout = $timeout(function() {
            $rootScope.$broadcast('window.resize');
        }, 100);
    });
    */

    //$log.debug("rootScope", $rootScope);

    //$http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w';
  }

})();

