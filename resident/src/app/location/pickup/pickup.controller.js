(function() {
  'use strict';
  angular.module('bProject')
    .controller('PickupController', PickupController);

  function PickupController($log, $auth, PickupService) {
    var vm = this;
    vm.formData = {};

    vm.dateConfig = {
      format: 'mm-dd-yyyy'
    };

    vm.user = $auth.getPayload();

    vm.timeConfig = {
      min: [7, 0],
      max: [18, 0]
    }
/*
    $log.debug($auth);
    $log.debug($auth.getPayload());*/

    // function to process the form
    vm.processForm = function() {
      var pickup = {
        "requester": $auth.getPayload().user,
        "address": {
          "street": vm.formData.address,
          "city": "Vancouver",
          "state": "CA",
          "zip": vm.formData.zip,
          "location": {
            "type": vm.formData.location,
            "coordinates": [
              0
            ]
          }
        },
        "time": vm.formData.date + ' ' + vm.formData.time,
        "instructions": vm.formData.instructions,
        "items": [{
          "type": vm.formData.type,
          "packageSize": vm.formData.packageSize,
          "quantity": vm.formData.size
        }]
      }

      $log.debug(pickup);

      PickupService.Create(pickup).then(function(data) {
        $log.debug(data);
      }, function(error) {
        $log.debug(error);
      });
    };

    vm.valuationDatePickerOpen = function($event) {
      if ($event) {
        $event.preventDefault();
        $event.stopPropagation(); // This is the magic
      }
      vm.valuationDatePickerIsOpen = true;
    };

    vm.valuationDate = new Date();
    vm.valuationDatePickerIsOpen = false;
  }

})();