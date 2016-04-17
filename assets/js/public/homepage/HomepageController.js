angular.module('HomepageModule').controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', '$templateCache', '$http',
  function($scope, $mdBottomSheet, $mdSidenav, $mdDialog, $templateCache, $http){

  // Toolbar search toggle
  $scope.toggleSearch = function(element) {
    $scope.showSearch = !$scope.showSearch;
  };
  
  // Sidenav toggle
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
  
  // Menu items
  $scope.menu = [
  {
    link : '',
    title: 'Dashboard',
      icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
    },
    {
      link : '',
      title: 'Friends',
      icon: 'social:ic_group_24px'
    },
    {
      link : '',
      title: 'Messages',
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

  // Mock activity
  $scope.activity = [
  {
    what: 'Brunch this weekend?',
    who: 'Ali Conners',
    avatar: 'svg-1',
    when: '3:08PM',
    notes: " I'll be in your neighborhood doing errands"
  },
  {
    what: 'Summer BBQ',
    who: 'to Alex, Scott, Jennifer',
    avatar: 'svg-2',
    when: '3:08PM',
    notes: "Wish I could come out but I'm out of town this weekend"
  },
  {
    what: 'Oui Oui',
    who: 'Sandra Adams',
    avatar: 'svg-3',
    when: '3:08PM',
    notes: "Do you have Paris recommendations? Have you ever been?"
  },
  {
    what: 'Birthday Gift',
    who: 'Trevor Hansen',
    avatar: 'svg-4',
    when: '3:08PM',
    notes: "Have any ideas of what we should get Heidi for her birthday?"
  },
  {
    what: 'Recipe to try',
    who: 'Brian Holt',
    avatar: 'svg-5',
    when: '3:08PM',
    notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
  },
  ];
  
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
    $http.get('poll.html', {cache:$templateCache});
    $mdDialog.show({
      controller: DialogController,
      title: 'Creation of a new STV Poll',
      template: $templateCache.get('poll.html'),
      clickOutsideToClose: true,
      targetEvent: ev,
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
  { name: 'Print this page', icon: 'action:ic_print_24px' },
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
      .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
      .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
      .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
      .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
      .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
      .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
      .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
      .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
      .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
      .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
      .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
      .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
      .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
      .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

      // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
      .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
      .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
    })

.controller('DatePicker', function($scope) {
  $scope.startDate = new Date();
  $scope.minDate = new Date(
    $scope.startDate.getFullYear(),
    $scope.startDate.getMonth(),
    $scope.startDate.getDate());
  $scope.maxDate = new Date(
    $scope.startDate.getFullYear(),
    $scope.startDate.getMonth() + 3,
    $scope.startDate.getDate());
})

.controller('CandidatesCtrl', function($scope) {
  // Set the loading state (i.e. show loading spinner)
  $scope.poll_form = {
    loading: false
  }

  $scope.poll_form.candidates = [];
  $scope.poll_form.desc_style = {'display': 'none'};
  $scope.createCandidate = function($event, from_button) {
    $event.preventDefault();
    if ((from_button || $event.keyCode == 13) && $scope.poll_form.candidate) {
      $scope.poll_form.candidates.push({name: $scope.poll_form.candidate, desc: $scope.poll_form.can_desc, cancolor:$scope.poll_form.cancolor});
      $scope.poll_form.candidate = '';
      $scope.poll_form.candesc = '';
      $scope.poll_form.cancolor = '';
      console.log("hap");
    }
    console.log("heey ");
  };
  $scope.removeCandidate = function($index, item) {
    $scope.poll_form.candidates.splice($index, 1);
  };
})

.controller('pollForm', ['$scope', function($scope){
  $scope.submitPollForm = function() {
    // Submit request to Sails.
    console.log('sending');
    return ;
    $http.post('/poll', {
      name: $scope.signupForm.name,
      title: $scope.signupForm.title,
      email: $scope.signupForm.email,
      password: $scope.signupForm.password
    })
    .then(function onSuccess(sailsResponse){
      window.location = '/';
    })
    .catch(function onError(sailsResponse){

    // Handle known error type(s).
    // If using sails-disk adpater -- Handle Duplicate Key
    var emailAddressAlreadyInUse = sailsResponse.status == 409;

    if (emailAddressAlreadyInUse) {
      toastr.error('That email address has already been taken, please try again.', 'Error');
      return;
    }
  })
  .finally(function eitherWay(){
    $scope.signupForm.loading = false;
  })
}
}])

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
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };






  // // set-up loginForm loading state
  // $scope.loginForm = {
    //   loading: false
    // }

    // $scope.submitLoginForm = function (){

      //   // Set the loading state (i.e. show loading spinner)
      //   $scope.loginForm.loading = true;

      //   // Submit request to Sails.
      //   $http.put('/login', {
        //     email: $scope.loginForm.email,
        //     password: $scope.loginForm.password
        //   })
      //   .then(function onSuccess (){
        //     // Refresh the page now that we've been logged in.
        //     window.location = '/';
        //   })
      //   .catch(function onError(sailsResponse) {

        //     // Handle known error type(s).
        //     // Invalid username / password combination.
        //     if (sailsResponse.status === 400 || 404) {
          //       // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
          //       //
          //       toastr.error('Invalid email/password combination.', 'Error', {
            //         closeButton: true
            //       });
          //       return;
          //     }

          //       toastr.error('An unexpected error occurred, please try again.', 'Error', {
            //         closeButton: true
            //       });
          //       return;

          //   })
      //   .finally(function eitherWay(){
        //     $scope.loginForm.loading = false;
        //   });
      // };
