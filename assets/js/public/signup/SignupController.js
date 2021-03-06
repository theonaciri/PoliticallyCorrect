angular.module('SignupModule')
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

    .controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdDialog', '$http', '$mdSidenav', '$location',
        function($scope, $mdBottomSheet, $mdDialog, $http, $mdSidenav, $location){
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
                    icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
                },
                {
                    link : '/signup',
                    title: 'Signup',
                    icon: 'social:ic_group_24px'
                },
                {
                    link : '/poll',
                    title: 'Create new poll',
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
                }
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
            $scope.submitPollForm = function() {
                $scope.loading = true;
                $http.post('/poll', {
                        'name' : $scope.name,
                        'desc' : $scope.desc,
                        'minDate' : $scope.minDate,
                        'maxDate' : $scope.maxDate,
                        'candidates' : $scope.candidates
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
            };

            $scope.title = "Poll";
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

    .config(function($mdIconProvider) {
        $mdIconProvider
        // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
        //
            .iconSet('action', '/svg/svg-sprite-action.svg', 24)
            .iconSet('alert', '/https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
            .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
            .iconSet('communication', '/svg/svg-sprite-communication.svg', 24)
            .iconSet('content', '/svg/svg-sprite-content.svg', 24)
            .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
            .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
            .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
            .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
            .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
            .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
            .iconSet('navigation', '/svg/svg-sprite-navigation.svg', 24)
            .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
            .iconSet('social', '/svg/svg-sprite-social.svg', 24)
            .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

            // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
            .iconSet('avatars', '/svg/avatar-icons.svg', 24)
            .defaultIconSet('/svg/svg-sprite-action.svg', 24);
    })

    .controller('SignupController', ['$scope', '$http', function($scope, $http){

        // set-up loading state
        $scope.signupForm = {
            loading: false
        }

        $scope.submitSignupForm = function(){

            // Set the loading state (i.e. show loading spinner)
            $scope.signupForm.loading = true;

            // Submit request to Sails.
            $http.post('/signup', {
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
                        /*toastr.error('That email address has already been taken, please try again.', 'Error');*/
                        return;
                    }

                })
                .finally(function eitherWay(){
                    $scope.signupForm.loading = false;
                })
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
                        //
                        /* toastr.error('Invalid email/password combination.', 'Error', {
                         closeButton: true
                         });*/
                        return;
                    }

                    /*				toastr.error('An unexpected error occurred, please try again.', 'Error', {
                     closeButton: true
                     });*/
                    return;

                })
                .finally(function eitherWay(){
                    $scope.loginForm.loading = false;
                })}}])

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
}