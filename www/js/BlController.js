demoModule.controller('BlController', function ($scope, Fact) {
  $scope.fact = Fact;

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

  $scope.items = ['Item 1', 'Item 2', 'Item 3'];

  $scope.refresh = function() {
    $scope.fact.Field+=" me";
    console.log($scope.serial);
  };

  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };
  $scope.app = {
    initialize: function() {
      console.log("initialize")
        this.bindEvents();
        this.showMainPage();
    },
    bindEvents: function() {

        var TOUCH_START = 'touchstart';
        if (window.navigator.msPointerEnabled) { // windows phone
            TOUCH_START = 'MSPointerDown';
        }
        document.addEventListener('deviceready', this.onDeviceReady, false);
        refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
        sendButton.addEventListener(TOUCH_START, this.sendData, false);
        disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
        deviceList.addEventListener('touchstart', this.connect, false);
    },
    onDeviceReady: function() {
        cordova.plugins.BluetoothStatus.initPlugin();   
        cordova.plugins.BluetoothStatus.enableBT();
        window.addEventListener('BluetoothStatus.enabled', function() {
            $scope.app.refreshDeviceList();
        });    
    },
    refreshDeviceList: function() {
        bluetoothSerial.list($scope.app.onDeviceList, $scope.app.onError);
    },
    onDeviceList: function(devices) {
        var option;

        // remove existing devices
        deviceList.innerHTML = "";
        $scope.app.setStatus("");

        devices.forEach(function(device) {

            var listItem = document.createElement('li'),
                html = '<b>' + device.name + '</b><br/>' + device.id;

            listItem.innerHTML = html;

            if (cordova.platformId === 'windowsphone') {
              // This is a temporary hack until I get the list tap working
              var button = document.createElement('button');
              button.innerHTML = "Connect";
              button.addEventListener('click', $scope.app.connect, false);
              button.dataset = {};
              button.dataset.deviceId = device.id;
              listItem.appendChild(button);
            } else {
              listItem.dataset.deviceId = device.id;
            }
            deviceList.appendChild(listItem);
        });

        if (devices.length === 0) {

            option = document.createElement('option');
            option.innerHTML = "No Bluetooth Devices";
            deviceList.appendChild(option);

            if (cordova.platformId === "ios") { // BLE
                $scope.app.setStatus("No Bluetooth Peripherals Discovered.");
            } else { // Android or Windows Phone
                $scope.app.setStatus("Please Pair a Bluetooth Device.");
            }

        } else {
            $scope.app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
        }

    },
    connect: function(e) {
        var onConnect = function() {
                // subscribe for incoming data
                bluetoothSerial.subscribe('\n', $scope.app.onData, $scope.app.onError);

                resultDiv.innerHTML = "";
                $scope.app.setStatus("Connected");
                $scope.app.showDetailPage();
            };

        var deviceId = e.target.dataset.deviceId;
        if (!deviceId) { // try the parent
            deviceId = e.target.parentNode.dataset.deviceId;
        }

        bluetoothSerial.connect(deviceId, onConnect, $scope.app.onError);
    },
    onData: function(data) { // data received from Arduino
        console.log("onData : "+data);
        $scope.fact.Field+= data;
        $scope.$apply();
        /*resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
        resultDiv.scrollTop = resultDiv.scrollHeight;*/
    },
    sendData: function(data) { // send data to Arduino

        var success = function() {
            console.log("success");
            $scope.fact.Field += "sent : " + data +"\n";
            preScroll.scrollTop = preScroll.scrollHeight;
            /*resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
            resultDiv.scrollTop = resultDiv.scrollHeight;*/
        };

        var failure = function() {
            alert("Failed writing data to Bluetooth peripheral");
        };
        console.log("sending : " + data);
        //var data = messageInput.value;
        bluetoothSerial.write(data, success, failure);
    },
    disconnect: function(event) {
        bluetoothSerial.disconnect($scope.app.showMainPage, $scope.app.onError);
    },
    showMainPage: function() {
        mainPage.style.display = "";
        detailPage.style.display = "none";
    },
    showDetailPage: function() {
        mainPage.style.display = "none";
        detailPage.style.display = "";
    },
    setStatus: function(message) {
        console.log(message);

        window.clearTimeout($scope.app.statusTimeout);
        statusDiv.innerHTML = message;
        statusDiv.className = 'fadein';

        // automatically clear the status with a timer
        $scope.app.statusTimeout = setTimeout(function () {
            statusDiv.className = 'fadeout';
        }, 5000);
    },
    onError: function(reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    }

};
  $scope.app.initialize();

  $scope.fact.sendData = $scope.app.sendData;
});
