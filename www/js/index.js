// Lakhdar Meftah
'use strict';
var demoModule = angular.module('ui.bootstrap.demo', ['ui.bootstrap','ngAnimate','ngTouch']);

demoModule.factory('Fact', function(){
  return { Field: "Serial Console\n"};
});

demoModule.controller('AccordionDemoCtrl', function ($scope, $log, Fact) {
  $scope.fact = Fact;
  $scope.isCollapsed = true;
  $scope.isCollapsed2 = true;
  $scope.isCollapsed3 = true;


  $scope.options = [
  {name : "نصف ساعة"},
  {name : "ساعة"},
  {name : "ساعتان"},
  {name : "3 ساعات"},
  {name : "4 ساعات"},
  {name : "5 ساعات"},
  {name : "6 ساعات"}
  ];
  $scope.valves = [
  {name : "2 فانة"},
  {name : "3 فانات"},
  {name : "4 فانات"},
  {name : "5 فانات"},
  {name : "6 فانات"},
  {name : "7 فانات"}
  ];  
  $scope.pivots = [
  {name : "لا يوجد"},
  {name : "1"},
  {name : "2"},
  {name : "3"},
  {name : "4"}
  ];
  $scope.valveNum = $scope.valves[5];

  $scope.items = [
  {time: 1, pivot : 0, manuel : 0,state: 0,activated : 1},
  {time: 3, pivot : 0, manuel : 0,state: 1,activated : 1},
  {time: 4, pivot : 1, manuel : 0,state: 0,activated : 1},
  {time: 4, pivot : 2, manuel : 1,state: 0,activated : 0},
  ];

  $scope.pause = function(){
    $scope.fact.sendData("p");
  }
  $scope.send = function(){
    $scope.fact.sendData($scope.fact.data);
    $scope.fact.data="";
  }
})

