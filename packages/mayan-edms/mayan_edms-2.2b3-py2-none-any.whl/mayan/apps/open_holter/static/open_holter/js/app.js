'use strict';

var dygraph = null;
//var templateSeriesList = Handlebars.compile($('#template-series-list').html());
//var templateSeriesWizard = Handlebars.compile($('#template-series-wizard').html());

/* Disable console log */
console.log = function() {}

var monthNames = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct',
    'nov', 'dic'
];

// Serialize a form's data into a JSON object
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function resizeGraph() {
    $('#dygraphs').height($('#dygraphs').parent().height());
}


function generateCSV(dygraph) {
    var date = null;
    var csv = '';

    $.each(dygraph.rawData_, function (index, value) {
        date = new Date(value[0]);
        csv += date.getFullYear() + '/' + (date.getMonth() + 1) + ', ';

        for (var i = 1; i < value.length; i++) {
            csv += value[i];
            if  (i + 1 < value.length) {
                csv += ', ';
            }
        }

        csv += '\n\r';
    });

    return csv;
}

// Trigger graph resize on windows resize to keep it all fullscreen
//$(window).resize(function() {
//    resizeGraph();
//});



function queryAPI(url, callBack) {
    console.log('[queryAPI] url:' + url);

    $.getJSON(url)
        .done(function(data, textStatus, request) {
            callBack(data);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        })
}


function updateChart(data) {
    var labels = ['Date', 'Voltaje'];

    var dygraphData = [];

    $.each(data['data'], function(index, value) {
        dygraphData.push([new Date(value['datetime']), value['value']]);
    });

    //var dygraphData = [
    //    [new Date('2016-12-05T21:18:32.002Z'), '10'],
    //    [new Date('2016-12-05T21:18:32.631Z'), '2'],
    //];

    dygraphData.sort(function(a, b) {
        if (a[0] > b[0]) return 1;
        if (a[0] < b[0]) return -1;
        return 0;
    });

    var options = {
        'file': dygraphData, 'labels': labels, showRangeSelector: true
    }

    // Insert series color as selected by the user
    //options[series.label] = {color: series.color}

    // Update data, options and trigger refresh
    dygraph.updateOptions(options);
}


// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');
//alert(csrftoken);
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

//$.ajaxSetup({
//    beforeSend: function(xhr, settings) {
//        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//            xhr.setRequestHeader("X-CSRFToken", csrftoken);
//        }
//    }
//});

//$.ajaxSetup({
//     beforeSend: function(xhr, settings) {
//         function getCookie(name) {
//             var cookieValue = null;
//             if (document.cookie && document.cookie != '') {
//                 var cookies = document.cookie.split(';');
//                 for (var i = 0; i < cookies.length; i++) {
//                     var cookie = jQuery.trim(cookies[i]);
//                     // Does this cookie string begin with the name we want?
//                     if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                         cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                         break;
//                     }
//                 }
//             }
//             return cookieValue;
//         }
//         if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
//             // Only send the token to relative URLs i.e. locally.
//             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
//         }
//     }
//});


function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}


$(document).ready(function() {
    // Trigger an initial resize to make it fullscreen
    //resizeGraph();

    dygraph = new Dygraph(
        document.getElementById('dygraphs'),
        // Sample data to allow the graph to display
        '\n',
        {
            axisTickSize: 1,
            drawPoints: true,
            gridLineColor: '#313534',
            //labelsDivStyles: { 'textAlign': 'right' },
            labelsKMB: true,
            highlightCircleSize: 6,
            rangeSelectorHeight: 60,
            showRangeSelector: false,
            strokeWidth: 3,
            xAxisHeight: 58,
            xlabel: 'Tiempo',
            //xRangePad: 50,
            ylabel: 'Voltaje',
            highlightSeriesOpts:{},
            //labelsSeparateLines: true,
            labelsSeparateLines: false,
            axes: {
              x: {
                  axisLabelFormatter: function(d, gran) {
                    //return d.getFullYear() + "/"
                    //    + monthNames[d.getMonth()];
                    return d.toLocaleString();
                  }
              },
            }

        }
    );

    //$('#btn-csv-download').click(function () {
    //    $(this).attr('download', 'Aviation Intelligence - ' + chartTitle + ' - ' + Date() + '.csv');
    //    $(this).attr('href', 'data:text/csv,' + encodeURIComponent(generateCSV(dygraph)));
    //});

    //Series.updateChart();
    var labels = ['Date', 'Voltaje'];

    dygraph.updateOptions({file: '\n', labels: labels, showRangeSelector: false});

    var url = '/api/open_holter/recordings/' + $('#dygraphs').data('recording-id') + '/';

    queryAPI(url, updateChart);

    $('#btn-graph-screenshot').click(function () {
        var imageGraphScreenshot = document.getElementById('img-graph-screenshot');

        Dygraph.Export.asPNG(dygraph, imageGraphScreenshot, {backgroundColor: 'white'});
        //queryAPI('/api/documents/documents', updateChart);

        //var csrftoken = getCookie('csrftoken');

        var formData = new FormData();

        // JavaScript file-like object
        //var content = '<a id="a"><b id="b">hey!</b></a>'; // the body of the new file...
        //var blob = new Blob([content], { type: "text/xml"});
        //var blob = new Blob([imageGraphScreenshot.src], { type: "image/octet-stream"});
        //alert(imageGraphScreenshot.src.slice(22));
        var blob = b64toBlob(imageGraphScreenshot.src.slice(22), 'image/png');
        formData.append("file", blob);
        formData.append("document_type", '1');

        //var request = new XMLHttpRequest();
        //request.open("POST", "/api/documents/documents/");
        //request.send(formData);

        //formData.append('file', imageGraphScreenshot.src);
        //formData.append('document_type', 1);
        //formData.append('csrfmiddlewaretoken', csrftoken);
        //alert(JSON.stringify(form_data));
        //alert(JSON.stringify(form_data['document_type']));

        $.ajax({
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            //headers: { 'Authorization': "Token " + localStorage.token },
            url: '/api/documents/documents/', // point to server-side PHP script
            dataType: 'json',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'post',
            success: function(response){
                alert(JSON.stringify(response)); // display response from the PHP script, if any
            },
            error: function(response){
                alert(JSON.stringify(response)); // display response from the PHP script, if any
            }
        });
        //.done(function(data, textStatus, request) {
        //    alert(JSON.stringify(data));
        //});
        //.fail(function(jqXHR, textStatus, errorThrown) {
        //    alert(JSON.stringify(errorThrown));
        //});

        //$(this).attr('download', 'Open Holter capture.png');  // user range as filename' + Date() + '.png');
        //$(this).attr('href', imageGraphScreenshot.src.replace('image/png','image/octet-stream'));
    });
});
