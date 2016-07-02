/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';


  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var polyapp = document.querySelector('#polyapp');
    
  polyapp.msgs = [];
  // Sets polyapp default base URL
  polyapp.baseUrl = '/';
  polyapp.raspUrl = "http://192.168.43.100:3000/";
  polyapp.controlUrl = polyapp.raspUrl +"pin";
    polyapp.statUrl = polyapp.raspUrl + "stat";
    polyapp.initTime = (new Date()).getTime()
    
    polyapp.chart = {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'temp'
        },
        subtitle: {
            text: 'temp'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        
        series: [{
                name: 'Temperature',
                // Define the data points. All series have a dummy year
                // of 1970/71 in order to be compared on the same x axis. Note
                // that in JavaScript, months start at 0 for January, 1 for February etc.
                data: [
                ]
            }]
    };

polyapp.clicked = function(){
  console.log('clicked');
  console.log(this.$.input1.value);
}
  if (window.location.port === '') {  // if production
    // Uncomment polyapp.baseURL below and
    // set polyapp.baseURL to '/your-pathname/' if running from folder in production
    // polyapp.baseUrl = '/polymer-starter-kit/';
  }

  polyapp.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!Polymer.dom(document).querySelector('platinum-sw-cache').disabled) {
      Polymer.dom(document).querySelector('#caching-complete').show();
    }
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  polyapp.addEventListener('dom-change', function() {
    console.log('Our polyapp is ready to rock!');

  });
  
  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    finishLazyLoading();
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the polyappName in the middle-container and the bottom title in the bottom-container.
  // The polyappName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  window.addEventListener('paper-header-transform', function(e) {
    var polyappName = Polymer.dom(document).querySelector('#mainToolbar .app-name');
    var middleContainer = Polymer.dom(document).querySelector('#mainToolbar .middle-container');
    var bottomContainer = Polymer.dom(document).querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    // polyappName max size when condensed. The smaller the number the smaller the condensed size.
    var maxMiddleScale = 0.50;
    var auxHeight = heightDiff - detail.y;
    var auxScale = heightDiff / (1 - maxMiddleScale);
    var scaleMiddle = Math.max(maxMiddleScale, auxHeight / auxScale + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer polyappName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', polyappName);
  });

  // Scroll page to top and expand header
  polyapp.scrollPageToTop = function() {
    polyapp.$.headerPanelMain.scrollToTop(true);
  };

  polyapp.closeDrawer = function() {
    polyapp.$.paperDrawerPanel.closeDrawer();
  };

function finishLazyLoading() {
var loadEl = document.getElementById('splash');
    loadEl.addEventListener('transitionend', loadEl.remove);

    document.body.classList.remove('loading');
  // 6. Fade splash screen, then remove.
  var onImportLoaded = function() {
    

    // App is visible and ready to load some data!
  };

}
})(document);
