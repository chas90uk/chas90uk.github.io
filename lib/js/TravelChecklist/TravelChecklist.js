//Shared var//
var g_checklistItems
var g_checklistCategories
////

const loadPage = async () => {
    const defaultChecklistItems = await $.getJSON("../lib/json/TravelChecklist/TravelChecklist.json") // return server JSON
    const checklistItems = await setChecklistItems(defaultChecklistItems) //return checklist items
    const checklistCategories = await setChecklistCategories(checklistItems) //return distinct categories using checklist items
    const HTMLcategories = await setHTMLcategories(checklistCategories, 1) //set category html using checklist categories
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
    i_checklistItems.forEach(item => {
        //If not already in list then add entry with count = 1
        if (!outputList.some(e => e.category == item.itemCategory)) {
        // if (!outputList.includes(item.itemCategory)) {
            outputList.push({
                "categoryID": item.itemCategory.replace(/\s/g, '_'),
                "category": item.itemCategory,
                "count": 1,
                "countChecked" : item.isChecked
            })
        }
        // Else add 1 to category's count
        else{
            outputList.forEach(category => {
                if (category.category == item.itemCategory) {
                    category.count ++
                    category.countChecked = category.countChecked + (item.isChecked ? 1 : 0)
                }
            });

        }
    });
    g_checklistCategories = outputList
    return outputList
}

function setHTMLcategories(i_checklistCategories, isNewLoad) {
    var eleChecklistItemList = $('#checklistItemList');
    for (i in i_checklistCategories) {
        var htmlID = '#collapsible_' + i_checklistCategories[i].categoryID;
        var categoryID = i_checklistCategories[i].categoryID;
        var category = i_checklistCategories[i].category;
        var countChecked = i_checklistCategories[i].countChecked
        var count = i_checklistCategories[i].count

        //Create HTML on new load
        if (isNewLoad) {
            eleChecklistItemList.append('' +
            '<button type="button" id="collapsible_' + categoryID + '" class="collapsible"  onclick=collapsible(this.id)>' + category + ' (' + countChecked + '/' + count + ')</button>' +
                '<div id="category_' + categoryID + '" class="content"> </div>' +
            '</div>'
        );
        //Update HTML on existing load
        } else {
            $(htmlID).html(category + ' (' + countChecked + '/' + count + ')')
        }

        //Always check counts and colour accordingly
        if (countChecked == count) {
            $(htmlID).css("background-color","green")
        }
        else {
            $(htmlID).css("background-color","#777")
        }
    }
}

function setHTMLcategoriesItems(i_checklistCategories, i_checklistItems) {
    i_checklistCategories.forEach(category => {
        i_checklistItems.forEach(item => {
            if (category.category == item.itemCategory) {
                var categoryID = '#category_' + category.categoryID
                var eleCategory = $(categoryID)
                var itemID = item.itemID;
                var itemValue = item.itemValue;
                var isChecked = item.isChecked;
                eleCategory.append('' +
                        '<div id="list_' + itemID + '" class="w3-show w3-animate-opacity w3-left-align w3-padding-small">' +
                            '<p>' +
                                '<input type="checkbox" id="checkbox_' + itemID + '" ' + ((isChecked) ? 'checked' : '') + ' onclick="checkboxChange(this.id, this.checked, updatechecklistCategories)"/> ' +
                                '<label for="checkbox_' + itemID + '">' + itemValue + '</label>' +
                            '</p>' +
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
function checkboxChange(checkboxID, checkedStatus, callback) {
    var _itemID = checkboxID.replace('checkbox_','')
    g_checklistItems.forEach(e => {
        if (e.itemID == _itemID) {
            e.isChecked = checkedStatus
        }
    });
    callback();
}

function updatechecklistCategories() {
    setChecklistCategories(g_checklistItems)
    // console.log(JSON.stringify(g_checklistCategories))
    setHTMLcategories(g_checklistCategories, 0)

}

function collapsible(collapsibleID) {
    var collapsible = '#' + collapsibleID.replace("collapsible_", "category_")
    $(collapsible).toggle()
}

function resetChecklist() {
    localStorage.removeItem("ls_checklistItems")
    g_checklistCategories = null
    g_checklistItems = null
    $('#checklistItemList').html("")
    loadPage();
}
////

//On Unload//
$(window).on('beforeunload', () => {
    localStorage.setItem("ls_checklistItems", JSON.stringify(g_checklistItems).replace(/\\/g, ''));
    // localStorage.removeItem("ls_checklistItems") //Debug
  });
////