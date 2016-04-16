angular.module('PollModule')
.controller('PollController', function ($scope, $timeout, $mdSidenav, $log) {
	$scope.title = "Poll";
	$scope.showAdd = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
      targetEvent: ev,
    })
    .then(function(answer) {
      $scope.alert = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.alert = 'You cancelled the dialog.';
    });
  };
    //$scope.user.name = "Theo"
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
    	return $mdSidenav('right').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
     function debounce(func, wait, context) {
     	var timer;
     	return function debounced() {
     		var context = $scope,
     		args = Array.prototype.slice.call(arguments);
     		$timeout.cancel(timer);
     		timer = $timeout(function() {
     			timer = undefined;
     			func.apply(context, args);
     		}, wait || 10);
     	};
     }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
     function buildDelayedToggler(navID) {
     	return debounce(function() {
     		$mdSidenav(navID)
     		.toggle()
     		.then(function () {
     			$log.debug("toggle " + navID + " is done");
     		});
     	}, 200);
     }
     function buildToggler(navID) {
     	return function() {
     		$mdSidenav(navID)
     		.toggle()
     		.then(function () {
     			$log.debug("toggle " + navID + " is done");
     		});
     	}
     }
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
.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function () {
		$mdSidenav('left').close()
		.then(function () {
			$log.debug("close LEFT is done");
		});
	};
})
.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	$scope.close = function () {
		$mdSidenav('right').close()
		.then(function () {
			$log.debug("close RIGHT is done");
		});
	}})

.controller('CandidatesCtrl', function($scope) {
	$scope.candidates = [];
	$scope.desc_style = {'display': 'none'};
	$scope.createCandidate = function($event, from_button) {
		if ((from_button || $event.keyCode == 13) && $scope.candidate) {
			$scope.candidates.push({name: $scope.candidate, desc: $scope.can_desc});
			$scope.candidate = '';
		}
	};
	$scope.removeCandidate = function($index, item) {
		$scope.candidates.splice($index, 1);
	};
}

);
