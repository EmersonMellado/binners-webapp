(function() {
  'use strict';
  angular.module('bProject')
    .controller('PickupListController', PickupListController);

  function PickupListController($log, PickupService) {
    var vm = this;
    PickupService.GetAll().then(function(data) {
      $log.debug(data);
      vm.pickups = data;
      vm.loading = false;
    }, function(error) {
      $log.debug('error:' + error);
    });
  }

})();