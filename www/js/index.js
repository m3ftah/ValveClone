// Lakhdar Meftah
'use strict';
var demoModule = angular.module('ui.bootstrap.demo', ['ui.bootstrap','ngAnimate','ngTouch']);

demoModule.factory('Fact', function(){
  return { Field: "Serial Console\n"};
});

demoModule.controller('AccordionDemoCtrl', function ($scope, $log, Fact) {
  $scope.fact = Fact;
  $scope.isCollapsed = true;
  $scope.test = false;
  $scope.pause = false;
  $scope.fact.active = 2;
  $scope.valveNum={};
  $scope.fact.showBar = false;


  $scope.options = [
  {name : "نصف ساعة",value:30},
  {name : "ساعة",value:60},
  {name : "ساعتان",value:120},
  {name : "3 ساعات",value:180},
  {name : "4 ساعات",value:240},
  {name : "5 ساعات",value:300},
  {name : "6 ساعات",value:360}
  ];
  $scope.engrais = [
  {name : "لا يوجد",value:0},
  {name : "ربع ساعة",value:15},
  {name : "نصف ساعة",value:30},
  {name : "45 دقيقة",value:45},
  {name : "ساعة",value:60},
  {name : "ساعة و نصف",value:90},
  {name : "ساعتان",value:120}
  ];
  $scope.valveTurns = [
  {name : "نصف دقيقة",value:30},
  {name : "45 ثانية",value:45},
  {name : "دقيقة",value:60},
  {name : "75 ثانية",value:75},
  {name : "دقيقة و نصف",value:90},
  {name : "105 ثانية",value:105},
  {name : "دقيقتان",value:120}
  ];
  $scope.valves = [
  {name : "2 فانة",index:2},
  {name : "3 فانات",index:3},
  {name : "4 فانات",index:4},
  {name : "5 فانات",index:5},
  {name : "6 فانات",index:6},
  {name : "7 فانات",index:7}
  ];    
  $scope.pivots = [
  {name : "لا يوجد"},
  {name : "1"},
  {name : "2"},
  {name : "3"},
  {name : "4"}
  ];

  $scope.items = [
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 1,valve : $scope.valveTurns[0]},
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 1,valve : $scope.valveTurns[0]},
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 1,valve : $scope.valveTurns[0]},
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 0,valve : $scope.valveTurns[0]},
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 0,valve : $scope.valveTurns[0]},
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 0,valve : $scope.valveTurns[0]},
  {time: $scope.options[0],engrais: $scope.engrais[0], pivot : $scope.pivots[0], manual : $scope.options[2],state: 0,activated : 0,valve : $scope.valveTurns[0]}
  ];

  $scope.sendPause = function(){
    $scope.pause = !$scope.pause;
    $scope.fact.sendData("p");
  }
  $scope.refresh = function(){
    $scope.fact.sendData("r");
  }
  $scope.sendValveNum = function(v){
    $scope.fact.sendData("x" + ($scope.valves.indexOf(v)+2));
  }
  $scope.sendPivot = function(v,t){
    $scope.fact.sendData("p" + (v+1) + "=" + ($scope.pivots.indexOf(t)));
  }
  $scope.sendEngrais = function(v,t){
    $scope.fact.sendData("g" + (v+1) + "=" + t.value);
  }
  $scope.sendValveTime = function(v,t){
    $scope.fact.sendData("t" + (v+1) + "=" + t.value);
  }
  $scope.sendManual = function(v,t){
    $scope.fact.sendData("m" + (v+1) + "=" + t.value);
  }
  $scope.sendValveTurn = function(v,t){
    $scope.fact.sendData("v" + (v+1) + "=" + t.value);
  }
  $scope.sendValveActive = function(v,t){
    $scope.fact.sendData("a" + (v+1) + "=" + t);
  }
  $scope.sendTest = function(){    
    $scope.test = !$scope.test;
    $scope.fact.sendData("e" + ($scope.test ? "1" : "0"));
  }
  $scope.send = function(){
    $scope.tokenize($scope.fact.data);
    $scope.fact.sendData($scope.fact.data);
    $scope.fact.data="";
  }
  $scope.fact.sent =function(data){
    $scope.fact.Field += "sent : " + data +"\n";
    preScroll.scrollTop = preScroll.scrollHeight;
  }
  $scope.fact.onData = function(data){
    $scope.fact.Field+= data;
    $scope.tokenize(data);
    $scope.$apply();
    preScroll.scrollTop = preScroll.scrollHeight;
    
  }
  $scope.tokenize = function(message){
    message.split(",").forEach(function(str){
      $scope.parse(str);
    });
    saveItems();
  }
  $scope.parse = function(message){
    if (message.indexOf('t')=== 0){
      $scope.items[parseInt(message[1])-1].time = $scope.options[indexWithAttr($scope.options,"value",parseInt(message.substring(3)))];
    }
    else if (message.indexOf('e')=== 0){
      $scope.test = parseInt(message[1]) == 1;          
      localStorage.setItem("test", JSON.stringify($scope.test));
    }
    else if (message.indexOf('g')=== 0){
      $scope.items[parseInt(message[1])-1].engrais = $scope.engrais[indexWithAttr($scope.engrais,"value",parseInt(message.substring(3)))];
    }  
    else if (message.indexOf('m')=== 0){
      $scope.items[parseInt(message[1])-1].manual = $scope.options[indexWithAttr($scope.options,"value",parseInt(message.substring(3)))];
    }  
    else if (message.indexOf('v')=== 0){
      $scope.items[parseInt(message[1])-1].valve = $scope.valveTurns[indexWithAttr2($scope.valveTurns,"value",parseInt(message.substring(3)))];
    }
    else if (message.indexOf('a')=== 0){
      $scope.items[parseInt(message[1])-1].activated = parseInt(message[3]);
    }    
    else if (message.indexOf('s') === 0){
      $scope.items[parseInt(message[1])-1].state = parseInt(message[3]);
    }
    else if (message.indexOf('p')=== 0){
      $scope.items[parseInt(message[1])-1].pivot = $scope.pivots[parseInt(message[3])];  
    }
    else if (message.indexOf('x')=== 0){
      $scope.valveNum = $scope.valves[parseInt(message[1])-2];
      localStorage.setItem("num", JSON.stringify($scope.valveNum));
    }

  }
  function indexWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    array.push({"name" : "دقيقة "+ value,"value" : value});
    return array.length-1;
  }
  function indexWithAttr2(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    array.push({"name" : "ثانية "+ value,"value" : value});
    return array.length-1;
  }
  function saveItems(){
    localStorage.setItem("first","no");
    localStorage.setItem("Items", JSON.stringify($scope.items));
  }
  function loadItems(){
    if (localStorage.getItem("first") =="no"){
      $scope.items = JSON.parse(localStorage.getItem("Items"));
      $scope.test = JSON.parse(localStorage.getItem("test"));
      $scope.valveNum = JSON.parse(localStorage.getItem("num"));
      for (var i= 0;i<$scope.items.length;i++) {
        $scope.items[i].time = $scope.options[indexWithAttr($scope.options,"value",$scope.items[i].time.value)];
        $scope.items[i].manual = $scope.options[indexWithAttr($scope.options,"value",$scope.items[i].manual.value)];
        $scope.items[i].engrais = $scope.engrais[indexWithAttr($scope.engrais,"value",$scope.items[i].engrais.value)];
        $scope.items[i].valve = $scope.valveTurns[indexWithAttr2($scope.valveTurns,"value",$scope.items[i].valve.value)];
      }
      
      $scope.$apply();
    }
    
  }
  angular.element(document).ready(function () {
        loadItems();
    });
})

