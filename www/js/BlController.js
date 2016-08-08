demoModule.controller('BlController', function ($scope, Fact) {
  $scope.fact = Fact;
  $scope.status="إختر البلوتوث للإتصال";
  $scope.connected = false
  $scope.fact.device = {};
  $scope.fact.openSettings = function(){
    bluetoothSerial.showBluetoothSettings();
  }

    $scope.refresh = function() {
        $scope.app.refreshDeviceList();
    };
    $scope.connect = function(device){
        var onConnect = function() {
            bluetoothSerial.subscribe('\n', $scope.app.onData, $scope.app.onError);
            $scope.app.setStatus("متصل");
            $scope.connected = true;
            $scope.fact.active = 0;
            $scope.fact.showBar = false;
            $scope.fact.device = device;
            $scope.app.sendData("r");
            $scope.$apply();
        };
        var onError = function() {
            $scope.app.setStatus("غير متصل");
            $scope.connected = false;
            $scope.fact.showBar = false;
            $scope.$apply();
        };
        $scope.fact.showBar = true;
        bluetoothSerial.connect(device.id, onConnect, onError);
    }
    $scope.disconnect = function() {
        var onDisconnect = function() {
            $scope.app.setStatus("غير متصل");
            $scope.connected = false;            
            $scope.fact.showBar = false;            
            $scope.fact.device = {};
            $scope.$apply();
        };
        $scope.fact.showBar = true;
        bluetoothSerial.disconnect(onDisconnect, $scope.app.onError);
    },

  $scope.app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        cordova.plugins.BluetoothStatus.initPlugin();   
        cordova.plugins.BluetoothStatus.enableBT();
        window.addEventListener('BluetoothStatus.enabled', function() {
            $scope.app.refreshDeviceList();            
        });    
    },
    refreshDeviceList: function() {
        $scope.fact.showBar = true;
        bluetoothSerial.list($scope.app.onDeviceList, $scope.app.onError);
    },
    onDeviceList: function(devices) {
        $scope.fact.showBar = false;
        $scope.devices = [];
        devices.forEach(function(device) {
            console.log(device);
            if (device.class == 7936)
            $scope.devices.push(device);
        });
        if (devices.length === 0)
            $scope.app.setStatus("يرجى ربط بلوتوث.");
        else
            $scope.app.setStatus("وجد " + devices.length + " بلوتوث");
        $scope.$apply();
    },
    onData: function(data) { // data received from Arduino
        console.log("onData : "+data);
        $scope.fact.onData(data);
    },
    sendData: function(data) { // send data to Arduino
        var success = function() {
            console.log("success");
            $scope.fact.sent(data);
        };
        var failure = function() {
            alert("Failed writing data to Bluetooth peripheral");
        };
        console.log("sending : " + data);
        bluetoothSerial.write(data, success, failure);
    },
    setStatus: function(message) {
        console.log(message);
        $scope.status = message;
    },
    onError: function(reason) {
        $scope.fact.showBar = false;
        alert("ERROR: " + reason); // real apps should use notification.alert
    }

};
  $scope.app.initialize();

  $scope.fact.sendData = $scope.app.sendData;
});
