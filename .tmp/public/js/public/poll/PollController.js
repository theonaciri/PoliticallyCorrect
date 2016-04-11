angular.module('PollModule')
.controller('PollController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

 $scope.title1 = 'Button';
  $scope.title4 = 'Warn';
  $scope.isDisabled = true;
  $scope.googleUrl = 'http://google.com';
}]);