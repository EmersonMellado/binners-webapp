(function() {
    'use strict';

    angular
        .module('bProject')
        //.factory('UsersService', UsersService)
        //.factory('PickupService', PickupService)
        .factory('LoginService', ['$q', '$http', '$log', 'Api', LoginService])
        .factory('binnersInterceptor', ['$q', '$log', '$injector', binnersInterceptor]);

    function binnersInterceptor($q, $log, $injector) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                var AuthService = $injector.get('$auth');
                var token = AuthService.getToken();
                if (token) {
                    config.headers.Authorization = token;
                }
                return config;
            },
            response: function(response) {
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                $log.debug('Error', rejection);
            }
        };
    }

    /*function UsersService($http, $auth, $log, Api) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get(url()).then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(url() + '/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get(url() + '/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }

        function Create(user) {
            return $http.post(url(), user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
            return $http.put(url() + '/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete(url() + '/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions 
        function url() {
            return Api.BASE_API + '/users';
        }
    }*/

    function LoginService($q, $http, $log, Api) {
        var service = {};
        service.Auth = Auth;
        return service;

        function Auth(user) {
            var deferred = $q.defer();
            var url = Api.BASE_API + '/auth';
            $log.debug(user);
            $log.debug(url);
            //return $http.post(BASE_API + '/auth', user).then(handleSuccess, handleError('Error creating user'));
            $http.post(url, user)
                .success(deferred.resolve)
                .error(deferred.reject);

            return deferred.promise;
        }
    }
})();