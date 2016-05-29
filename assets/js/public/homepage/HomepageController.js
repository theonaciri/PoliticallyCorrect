angular.module('HomepageModule')
.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', '$http', '$mdSidenav', '$window', '$mdToast',
  function($scope, $mdBottomSheet, $mdDialog, $http, $mdSidenav, $window, $mdToast){

  // set-up loginForm loading state
  $scope.loginForm = {
    loading: false
  }

  $scope.submitLoginForm = function (){

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
      email: $scope.loginForm.email,
      password: $scope.loginForm.password
    })
    .then(function onSuccess (){
      // Refresh the page now that we've been logged in.
      window.location = '/';
    })
    .catch(function onError(sailsResponse) {

      // Handle known error type(s).
      // Invalid username / password combination.
      if (sailsResponse.status === 400 || 404) {
        // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
        $mdToast.show($mdToast.simple().textContent('Invalid email/password combination')
          .position('top left')
          .hideDelay(500000)
          .action("x"));
        console.log('Invalid email/password combination.');
        return;
      }

    console.log('An unexpected error occurred, please try again.');
    return;
  })
  .finally(function eitherWay(){
    $scope.loginForm.loading = false;
  });
};

            // Toolbar search toggle
            $scope.toggleSearch = function(element) {
              $scope.showSearch = !$scope.showSearch;
            };

            // Sidenav toggle
            $scope.toggleSidenav = function(menuId) {
              $mdSidenav(menuId).toggle();
            };

            $scope.gotoLink = function(link) {
              $location.url(link);
            };
            // Menu items
            $scope.menu = [
            {
              link : '/',
              title: 'HomePage',
              icon: 'action:ic_dashboard_24px'
            },
            {
              link : '/signup',
              title: 'Create a new account',
              icon : 'action:ic_dashboard_24px'
            },
            {
              link : '/poll/2',
              title: 'Example poll',
              icon: 'social:ic_group_24px'
            },
            {
              link : '/poll',
              title: 'Create a new poll',
              icon: 'communication:ic_message_24px'
            }
            ];
            $scope.admin = [
            {
              link : '',
              title: 'Trash',
              icon: 'action:ic_delete_24px'
            },
            {
              link : 'showListBottomSheet($event)',
              title: 'Settings',
              icon: 'action:ic_settings_24px'
            }
            ];

            $scope.polls = $window.polls;

            // Bottomsheet & Modal Dialogs
            $scope.alert = '';
            $scope.showListBottomSheet = function($event) {
              $scope.alert = '';
              $mdBottomSheet.show({
                template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
                controller: 'ListBottomSheetCtrl',
                targetEvent: $event
              }).then(function(clickedItem) {
                $scope.alert = clickedItem.name + ' clicked!';
              });
            };

            $scope.showAdd = function(ev) {
              $mdDialog.show({
                controller: DialogController,
                title: 'Creation of a new STV Poll',
                templateUrl: 'templates/poll.ejs',
                clickOutsideToClose: true,
                targetEvent: ev
              })
              .then(function(answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
              }, function() {
                $scope.alert = 'You cancelled the dialog.';
              });
            };
          }])

.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
  { name: 'Share', icon: 'social:ic_share_24px' },
  { name: 'Upload', icon: 'file:ic_cloud_upload_24px' },
  { name: 'Copy', icon: 'content:ic_content_copy_24px' },
  { name: 'Print this page', icon: 'action:ic_print_24px' }
  ];

  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})

.config(function($mdThemingProvider) {
  var customBlueMap =     $mdThemingProvider.extendPalette('light-blue', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'ffffff'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
  .primaryPalette('customBlue', {
    'default': '500',
    'hue-1': '50'
  })
  .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
  .primaryPalette('grey')
})

.config(function($mdIconProvider) {
  $mdIconProvider
        // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
        //
        .iconSet('action', 'svg/svg-sprite-action.svg', 24)
        .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
        .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
        .iconSet('communication', 'svg/svg-sprite-communication.svg', 24)
        .iconSet('content', 'svg/svg-sprite-content.svg', 24)
        .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
        .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
        .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
        .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
        .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
        .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
        .iconSet('navigation', 'svg/svg-sprite-navigation.svg', 24)
        .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
        .iconSet('social', 'svg/svg-sprite-social.svg', 24)
        .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

            // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
            .iconSet('avatars', 'svg/avatar-icons.svg', 24)
            .defaultIconSet('svg/svg-sprite-action.svg', 24);
          })

.controller('pollForm', ['$scope', '$http', '$mdToast', function($scope, $http, $mdToast){
        // TODO: populate
        // toast
        $scope.openToast = function($event) {
          $mdToast.show($mdToast.simple().textContent('Hello!'));
            // Could also do $mdToast.showSimple('Hello');
          };

        // Date Picker
        $scope.startDate = new Date();
        $scope.minDate = new Date(
          $scope.startDate.getFullYear(),
          $scope.startDate.getMonth(),
          $scope.startDate.getDate());
        $scope.maxDate = new Date(
          $scope.startDate.getFullYear(),
          $scope.startDate.getMonth() + 3,
          $scope.startDate.getDate());

        $scope.candidates = [];
        $scope.createCandidate = function($event, from_button) {
          $event.preventDefault();
          if ((from_button || $event.keyCode == 13) && $scope.candidate) {
            $scope.candidates.push({name: $scope.candidate, desc: $scope.can_desc, cancolor:$scope.cancolor});
            $scope.candidate = '';
            $scope.can_desc = '';
            $scope.cancolor = '';
            document.getElementById("candidate").focus();
          }
        };


        $scope.submitPollForm = function() {
          $scope.loading = true;
          $http.post('/poll', {
            'name' : encodeURI($scope.name),
            'desc' : encodeURI($scope.desc),
            'minDate' : encodeURI($scope.minDate),
            'maxDate' : encodeURI($scope.maxDate),
            'candidates' : $scope.candidates,
            'req_winners' : encodeURI($scope.req_winners)
          })
          .then(function onSuccess(sailsResponse){
            console.log(sailsResponse);
            window.location = '/poll/' + sailsResponse.data.id;
          })
          .catch(function onError(sailsResponse){
            console.log(sailsResponse);
            $mdToast.show($mdToast.simple().textContent('Poll creation was rejected.'));
          })
          .finally(function eitherWay(){
            $scope.loading = false;
          })
        }}])

.controller('DemoCtrl', DemoCtrl);
function DemoCtrl ($timeout, $q) {
  var self = this;
    // list of `state` value/display objects
    self.states        = loadAll();
    self.selectedItem  = null;
    self.searchText    = null;
    self.querySearch   = querySearch;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
     function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : [];
      return results;
    }
    /**
     * Build `states` list of key/value pairs
     */
     function loadAll() {
      var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
      Sandra Adams, Brian Holt, \
      Trevor Hansen';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }
    /**
     * Create filter function for a query string
     */
     function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
  };

  function DialogController($scope, $mdDialog) {
    // populate
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(form, candidates) {
        // Submit request to Sails.
        console.log('in answer, closing');
        $mdDialog.hide(answer);
      };
    };
