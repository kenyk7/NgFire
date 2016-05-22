(function() {
  'use strict';

  angular
    .module('angularFirebaseTemplate')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('base', {
        abstract: true,
        templateUrl: 'app/base/base.html', // use suffix '.html' instead of '.jade' as it accesses redered version
        controller: 'BaseController',
        controllerAs: 'vmBC',
        data: {
          // All routes that extend from this state will require user to be authenticated
          authenticate: true,
        },
        resolve: {
          // This forces the controller to wait until the authentication is resolved before loading
          currentAuth: currentAuth,
        },
      });

    /** @ngInject */
    function currentAuth(Auth, FIREBASE_ROOT) {
      var auth = Auth.get(FIREBASE_ROOT);

      return auth.$waitForAuth();
    }
  }
})();
