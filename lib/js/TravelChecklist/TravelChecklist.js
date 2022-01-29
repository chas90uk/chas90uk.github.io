//On Load//
$(() => {
    // localStorage.removeItem("clItems")
    console.log( "TravelChecklist ready!" );
    checklistItemList(_clItems);
});
////

//Shared var//
var _clItems = (() => {
    if (localStorage.getItem("clItems") != null) {
        return JSON.parse(localStorage.getItem("clItems"))
    }
    else {
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
    }
})(); 
////

//Checklist Item List//
function checklistItemList(data) {
    var eleChecklistItemList = $('#checklistItemList');
    for (i in data) {
        var itemID = i;
        var itemType = data[i].itemType;
        var itemValue = data[i].itemValue;
        var isChecked = data[i].isChecked;
        eleChecklistItemList.append('' +
            '<div id="list_' + itemID + '" class="w3-show w3-animate-opacity w3-left-align w3-padding-small">' +
            
            '<p><input type="checkbox" id="checkbox_' + i + '" onclick="checkboxChange(this.id)"' + ((isChecked) ? 'checked' : '') + '/> <strong>' + itemType + ': </strong>' + itemValue + '</p>' +
            '</div>' +
            ''
        );
    }
}
////

//Checkbox click//
function checkboxChange(id) {
    var i = id.replace('checkbox_','')
    eleCheckboxID = $('#' + id);
    _clItems[i].isChecked = eleCheckboxID.prop("checked")
}
////

//On Unload//
$(window).on('beforeunload', () => {
    localStorage.setItem("clItems", JSON.stringify(_clItems).replace(/\\/g, ''));
    // localStorage.removeItem("clItems")
  });
////