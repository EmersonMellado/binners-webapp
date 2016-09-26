(function() {
  'use strict';
  angular.module('bProject')
    .service('PickupService', PickupService);

  function PickupService($http, $log, Api) {
    var service = {};
    service.GetAll = GetAll;
    service.Create = Create;
    return service;

    function GetAll() {
      return $http.get(urlList()).then(handleSuccess, handleError('Error getting all pickups'));
    }

    function Create(pickup) {
      return $http.post(url(), pickup).then(handleSuccess, handleError('Error creating a pickup'));
    }

    // private functions 
    function urlList() {
      return Api.BASE_API + '/pickups';
    }

    function url() {
      return Api.BASE_API + '/pickup';
    }    

    function handleSuccess(res) {
      return res.data;
    }

    function handleError(error) {
      return function() {
        return {
          success: false,
          message: error
        };
      };
    }
  }

})();