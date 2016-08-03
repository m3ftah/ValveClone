// (c) 2013-2015 Don Coleman
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global mainPage, deviceList, refreshButton, statusDiv */
/* global detailPage, resultDiv, messageInput, sendButton, disconnectButton */
/* global cordova, bluetoothSerial  */
/* jshint browser: true , devel: true*/
'use strict';
var demoModule = angular.module('ui.bootstrap.demo', ['ui.bootstrap','ngAnimate','ngTouch']).controller('AccordionDemoCtrl', function ($scope,$log) {
  $scope.mytime = new Date();
  $scope.isCollapsed = true;
  $scope.isCollapsed2 = true;
  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = [
  {name : "نصف ساعة"},
  {name : "ساعة"},
  {name : "ساعتان"},
  {name : "3 ساعات"},
  {name : "4 ساعات"},
  {name : "5 ساعات"},
  {name : "6 ساعات"},
  ];
  $scope.pivots = [
  {name : "لا يوجد"},
  {name : "1"},
  {name : "2"},
  {name : "3"},
  {name : "4"}
  ];


  $scope.items = [
  {time: 1, pivot : 0, manuel : 0,activated : 1},
  {time: 3, pivot : 0, manuel : 0,activated : 1},
  {time: 4, pivot : 1, manuel : 0,activated : 1},
  {time: 4, pivot : 2, manuel : 1,activated : 0},
  ];

  $scope.myOpt= $scope.options[2];


  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.oneAtATime = true;

  $scope.groups = [
    {
      title: 'Dynamic Group Header - 1',
      content: 'Dynamic Group Body - 1'
    },
    {
      title: 'Dynamic Group Header - 2',
      content: 'Dynamic Group Body - 2'
    }
  ];


  $scope.addItem = function() {
    var newItemNo = $scope.items.length + 1;
    $scope.items.push('Item ' + newItemNo);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
})

