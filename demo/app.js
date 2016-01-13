var app = angular.module('app', ['ngAnimate', 'ngTouch', 'jucardi-multiselect-dropdown']);

app.controller('MainCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
  $scope.settings = {
    singleSelect: true,
    defaultText: 'Test',
    selectedMode: 'labels',
    width: 200,
    label: 'Type',
    labelBreakLine: true
  };

  function load() {
    $scope.filter1 = {
      selected: [ "Pending" ],
      data: [
    		{ value: "Pending",  label: "Pending" },
    		{ value: "Active",   label: "Active" },
    		{ value: "Sold",     label: "Sold" },
    		{ value: "SoldST",   label: "Sold ST" },
    		{ value: "SoldASST", label: "Sold ASST" },
    		{ value: "NotSold",  label: "Not Sold" },
      ]
    };
    
  }
  
  $scope.onChanged = function() {
    console.log('change');
    console.log($scope.filter1.selected);
  };
  
  load();
}]);