SomApi.account = "SOM56898b03137f4";   //your API Key here
SomApi.domainName = "mahendra.com.au";      //your domain or sub-domain here
SomApi.config.sustainTime = 4;
SomApi.onTestCompleted = onTestCompleted;
SomApi.onError = onError;
SomApi.onProgress = onProgress;

// var msgDiv = document.getElementById("msg");

SomApi.startTest();

function onProgress(progress) {
$("#progress").text(progress.type);
$("#pass").text(progress.pass);
$("#percentage").text(progress.percentDone + "%");
$("#current").text(progress.currentSpeed + " Mbps");
console.debug(progress);
}

function onTestCompleted(testResult) {

  $('.progressing').fadeOut('fast');
  $('.complete').fadeIn();

  var chartDownload = c3.generate({
      bindto: "#download",
      data: {
          columns: [
              ['data', testResult.download]
          ],
          type: 'gauge',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
         label: {
             format: function(value, ratio) {
                 return value;
             },
             show: true // to turn off the min/max labels.
         },
         min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
         max: 50, // 100 is default
         units: ' Mbps',
         width: 10 // for adjusting arc thickness
      },
      color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
          threshold: {
              unit: 'value', // percentage is default
              max: 50, // 100 is default
              values: [5, 15, 30, 50]
          }
      },
      size: {
          height: 60
      }
  });

  var chartUpload = c3.generate({
      bindto: "#upload",
      data: {
          columns: [
              ['data', testResult.upload]
          ],
          type: 'gauge',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      gauge: {
         label: {
             format: function(value, ratio) {
                 return value;
             },
             show: true // to turn off the min/max labels.
         },
         min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
         max: 5, // 100 is default
         units: ' Mbps',
         width: 10 // for adjusting arc thickness
      },
      color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
          threshold: {
              unit: 'value', // percentage is default
              max: 5, // 100 is default
              values: [0, 1, 2, 5]
          }
      },
      size: {
          height: 60
      }
  });

  $("#latency").text(testResult.latency+" ms");
  $("#testServer").text(testResult.testServer);

  var copyDataResult = "Download: "   +testResult.download +"Mbps; "+"Upload: "     +testResult.upload   +"Mbps; "+"Latency: "    +testResult.latency  +"ms; "+"Jitter: "     +testResult.jitter   +"ms; "+"Test Server: "+testResult.testServer +"; "+"IP: "         +testResult.ip_address +"; "+"Hostname: "   +testResult.hostname +";";

  // copy clipboard HTML5 API

  $('#copy').on( 'click', function( event ) {
    copytext(copyDataResult);
    console.log('copy data result: ', copyDataResult);
  });

  function detectIE() {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // IE 12 => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }
  function copytext(text) {
    if (detectIE()) {
        window.clipboardData.setData('Text', text);
    }
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    window.clipboardData.setData('Text', copytext);
    textField.remove();
  }

  function copytext(text) {
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    $(textField).remove();
  }

}

function onError(error) {
    $('.checkInternetConnection').text("Error "+ error.code + ": "+error.message).show();
}

