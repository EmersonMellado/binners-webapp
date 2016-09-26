(function() {
    'use strict';
    angular.module('bProject').controller('SignupController', SignupController);

    function SignupController($location, $auth, toastr, Api, $log) {
        var vm = this;
        vm.signup = function() {
            var opts = {
                url: Api.BASE_API + '/users',
                method: 'POST'
            }
            vm.newUser = {
                name: vm.user.name,
                email: vm.user.email,
                password: vm.user.password,
                phone: vm.user.phone,
                active: true
            }

            //$log.debug(vm.newUser);
            $auth.signup(vm.newUser, opts).then(function(response) {
                if (!response) {
                    toastr.info('The account could not be created this time. Please, try again later.');
                    $location.path('/signup');
                } else {
                    $auth.removeToken();
                    $location.path('/');
                    toastr.info('You have successfully created a new account!');
                }
            }).catch(function(error) {
                if (error.error) {
                    // Popup error - invalid redirect_uri, pressed cancel button, etc.
                    toastr.error(error.error);
                } else if (error.data) {
                    // HTTP response error from server
                    toastr.error(error.data.message, error.status);
                } else {
                    toastr.error(error);
                }
            });
        };
    }
})();