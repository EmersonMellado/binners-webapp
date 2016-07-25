(function() {
  'use strict';
  angular.module('bProject')
    .controller('PickupController', PickupController);

  function PickupController($auth) {
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

    // function to process the form
    vm.processForm = function() {
      var pickup = {
        "requester": "",
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
        "time": vm.formData.date + vm.formData.time,
        "instructions": vm.formData.instructions,
        "items": [{
          "type": vm.formData.type,
          "packageSize": vm.formData.size,
          "quantity": vm.formData.size
        }]
      }
      console.log("vm.formData", vm.formData);
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
