//Call API On Load//
$(function() {
    console.log( "TravelChecklist ready!" );
    console.log(JSON.stringify(_checklistItems));
    checklistItemList(_checklistItems);
});
////

//Shared var//
var _checklistItems = (() => {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../lib/json/TravelChecklist/TravelChecklist.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); 
////

//Checklist Item List//
function checklistItemList(data) {
    console.log(JSON.stringify(_checklistItems));
    var eleChecklistItemList = $('#checklistItemList');
    for (i in data) {
        var itemID = data[i].itemID;
        var itemType = data[i].itemType;
        var itemValue = data[i].itemValue;
        eleChecklistItemList.append('' +
            '<div id="list_' + itemID + '" class="w3-show w3-animate-opacity w3-left-align w3-padding-small">' +
            
            '<p><input type="checkbox"/> <strong>' + itemType + ': </strong>' + itemValue + '</p>' +
            '</div>' +
            ''
        );
    }
}
////