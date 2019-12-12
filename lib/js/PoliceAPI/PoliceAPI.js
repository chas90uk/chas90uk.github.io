//Call API On Load//
$(function() {
    console.log( "PoliceAPI ready!" );
    apiCall('https://data.police.uk/api/forces', polForceList);
});
////

//Shared var//
    var _forceID = '';
    var _neighbourhoodID = '';
////


//Police Force List//
    function polForceList(data) {
        var elePolForceList = $('#polForceList');
        for (i in data) {
            _forceID = data[i].id;
            var forceName = data[i].name;
            elePolForceList.append('' +
                '<button id="btn_' + _forceID + '" onclick="clickForce(this.id)" class="w3-button w3-block w3-black w3-left-align ">' + forceName + '</button>' +
                '<div id="list_' + _forceID + '" class="w3-hide w3-animate-opacity w3-left-align w3-padding-small">' +
                '</div>' +
                ''
            );
        }
    }
////


    function clickForce(id) {
        //id passed through button id
        _forceID = id.replace('btn_','')
        var listID = 'list_' + _forceID
        var x = document.getElementById(listID);
        if (x.className.indexOf("w3-show") == -1) {
            apiCall('https://data.police.uk/api/' + _forceID + '/neighbourhoods', polNeighbourhoodList);
        }
        accordionDrop(listID);
    }



//Neighbourhood List//
function polNeighbourhoodList(data) {
    var listID = '#list_' + _forceID
    var elePolNeighbourhoodList = $(listID);
    console.log(elePolNeighbourhoodList)
    for (i in data) {
        var _neighbourhoodID = data[i].id;
        var neighbourhoodName = data[i].name;
        elePolNeighbourhoodList.append('<a>' + _neighbourhoodID + ': ' + neighbourhoodName + '</a><br>');
    }
}
////




//Accordion//
    function accordionDrop(id) {
        var x = document.getElementById(id);
        if (x.className.indexOf("w3-show") == -1) {
          x.className += " w3-show";
        } else { 
          x.className = x.className.replace(" w3-show", "");
        }
      }
////
