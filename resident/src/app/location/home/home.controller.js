(function() {
	'use strict';

	angular
		.module('bProject')
		.controller('MainController', MainController);

	/** @ngInject */
	function MainController(PickupService) {
		var vm = this;
		PickupService.GetAll().then(function(data) {
			vm.pickups = data;
			vm.loading = false;
		}, function(error) {
			$log.debug('error:' + error);
		});
	}
})();