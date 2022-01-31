//Shared var//
var g_checklistItems
var g_checklistCategories
////

const loadPage = async () => {
    const defaultChecklistItems = await $.getJSON("../lib/json/TravelChecklist/TravelChecklist.json") // return server JSON
    const checklistItems = await setChecklistItems(defaultChecklistItems) //return checklist items
    const checklistCategories = await setChecklistCategories(checklistItems) //return distinct categories using checklist items
    const HTMLcategories = await setHTMLcategories(checklistCategories) //set category html using checklist categories
    const HTMLcategoriesItems = await setHTMLcategoriesItems(checklistCategories, checklistItems) //set checklist html using checklist categories and checklist items
    return 0
}

function setChecklistItems(i_defaultChecklistItems) {
    if (localStorage.getItem("ls_checklistItems") != null) {
        g_checklistItems = JSON.parse(localStorage.getItem("ls_checklistItems"))
        return JSON.parse(localStorage.getItem("ls_checklistItems"))
    }
    else {
        g_checklistItems = i_defaultChecklistItems
        return i_defaultChecklistItems
    }
}

function setChecklistCategories(i_checklistItems) {
    var outputList = []
    i_checklistItems.forEach(e => {
        if (!outputList.includes(e.itemCategory)) {
            outputList.push(e.itemCategory)
        }
    });
    g_checklistCategories = outputList
    return outputList
}

function setHTMLcategories(i_checklistCategories) {
    console.log("(setHTMLcategory)categories: " + JSON.stringify(i_checklistCategories))
    var eleChecklistItemList = $('#checklistItemList');
    for (i in i_checklistCategories) {
        var itemCategory = i_checklistCategories[i];
        eleChecklistItemList.append('' +
            '<button type="button" id="collapsible_' + itemCategory + '" class="collapsible"  onclick=collapsible(this.id)>' + itemCategory + '</button>' +
                '<div id="category_' + itemCategory + '" class="content"> </div>' +
            '</div>'
        );
    }
}

function setHTMLcategoriesItems(i_checklistCategories, i_checklistItems) {
    i_checklistCategories.forEach(category => {
        i_checklistItems.forEach(item => {
            if (category == item.itemCategory) {
                var categoryID = '#category_' + category
                var eleCategory = $(categoryID)
                var itemID = item.itemID;
                var itemValue = item.itemValue;
                var isChecked = item.isChecked;
                eleCategory.append('' +
                        '<div id="list_' + itemID + '" class="w3-show w3-animate-opacity w3-left-align w3-padding-small">' +
                        
                        '<p><input type="checkbox" id="checkbox_' + itemID + '" onclick="checkboxChange(this.id,this.checked)"' + ((isChecked) ? 'checked' : '') + '/> ' + itemValue + '</p>' +
                        '</div>' +
                        ''
                    );
            }
        });
    });
}
  

//On Load//
$(() => {
    // localStorage.removeItem("ls_checklistItems") //Debug
    console.log( "TravelChecklist ready!" );
    loadPage()
});
////

//Event listeners//
function checkboxChange(checkboxID, checkedStatus) {
    var _itemID = checkboxID.replace('checkbox_','')
    g_checklistItems.forEach(e => {
        if (e.itemID == _itemID) {
            e.isChecked = checkedStatus
        }
    });
}

function collapsible(collapsibleID) {
    var collapsible = '#' + collapsibleID.replace("collapsible_", "category_")
    var eleCollapsible = $(collapsible).toggle()
}
////

//On Unload//
$(window).on('beforeunload', () => {
    localStorage.setItem("ls_checklistItems", JSON.stringify(g_checklistItems).replace(/\\/g, ''));
    // localStorage.removeItem("ls_checklistItems") //Debug
  });
////