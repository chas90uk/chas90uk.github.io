//On Load
$(function() {
    console.log( "ready!" );
    apiCall("https://pokeapi.co/api/v2/pokemon/?limit=20000", writeNameList);
    selectPKMN({value: 1});
});
//API Call
function apiCall(urlAPI, fn) {
    result = $.ajax({
        url: urlAPI
        ,headers: {
            "Accept": "application/json"
        }
    })
    .done(function(data) {
        // alert( "success" );
        if (console && console.log) {
        console.log( "Sample of data:", data );
        fn(data);
        }
    })
    .fail(function() {
        alert( "error" );
    })
}
//PKMN Name List
function writeNameList(data) {
                //Return Names of each results attribute
                var x = '';
                for (i in data.results) {
                    var urlID = (data.results[i].url).match(/\d*(?=\/$)/)
                    var nameUpper = ('#' + urlID + ': ' + data.results[i].name).replace(/"/g,'').toUpperCase();
                    // x += '<a href="' + data.results[i].url + '">#' + (parseInt(i) + 1).toString() + ': ' + nameUpper + '</a><br>';
                    x += '<option value="' + urlID + '">' + nameUpper + '</option>';
                }
                $('#APIResult').html('<div align="center"><select id="selectPKMN" onchange="selectPKMN(this)">' + x + '</select></div>');
}
//PKMN On Select
function selectPKMN(pkmn) {
    var urlID = pkmn.value;
    var urlAPI = 'https://pokeapi.co/api/v2/pokemon/' + urlID + '/'
    apiCall(urlAPI, function(data) {
        

        imgPKMNback_default = data.sprites.back_default;
        imgPKMNfront_default = data.sprites.front_default;
        imgPKMNback_shiny = data.sprites.back_shiny;
        imgPKMNfront_shiny = data.sprites.front_shiny;
        imgPKMNback_female = data.sprites.back_female;
        imgPKMNfront_female = data.sprites.front_female;
        imgPKMNback_shiny_female = data.sprites.back_shiny_female;
        imgPKMNfront_shiny_female = data.sprites.front_shiny_female;
        namePKMN = (data.name).toUpperCase();

        htmlSelectPKMNOutput = ''
        if(imgPKMNback_default || imgPKMNfront_default) {
            htmlSelectPKMNOutput += 'MALE<br>'
            if(imgPKMNback_default) {
                htmlSelectPKMNOutput += '<img src="' + imgPKMNback_default + '" alt="' + namePKMN + ' (back male)">'
            }
            htmlSelectPKMNOutput += '<img src="' + imgPKMNfront_default + '" alt="' + namePKMN + ' (front male)"><br>'
        }
        if(imgPKMNback_female && imgPKMNfront_female) {
            htmlSelectPKMNOutput += 'FEMALE<br>'
            htmlSelectPKMNOutput += '<img src="' + imgPKMNback_female + '" alt="' + namePKMN + ' (back female)">'
            htmlSelectPKMNOutput += '<img src="' + imgPKMNfront_female + '" alt="' + namePKMN + ' (front female)"><br>'
        }
        else {
            htmlSelectPKMNOutput = htmlSelectPKMNOutput.replace('MALE', 'MALE/FEMALE')
        }
        if(imgPKMNback_shiny || imgPKMNfront_shiny) {
            htmlSelectPKMNOutput += 'MALE (SHINY)<br>'
            if(imgPKMNback_shiny) {
                htmlSelectPKMNOutput += '<img src="' + imgPKMNback_shiny + '" alt="' + namePKMN + ' (back shiny)">'
            }
            htmlSelectPKMNOutput += '<img src="' + imgPKMNfront_shiny + '" alt="' + namePKMN + ' (front shiny)"><br>'
        }
        if(imgPKMNback_shiny_female && imgPKMNfront_shiny_female) {
            htmlSelectPKMNOutput += 'FEMALE (SHINY)<br>'
            htmlSelectPKMNOutput += '<img src="' + imgPKMNback_shiny_female + '" alt="' + namePKMN + ' (back female shiny)">'
            htmlSelectPKMNOutput += '<img src="' + imgPKMNfront_shiny_female + '" alt="' + namePKMN + ' (front female shiny)"><br>'
        }
        else {
            htmlSelectPKMNOutput = htmlSelectPKMNOutput.replace('MALE (SHINY)', 'MALE/FEMALE (SHINY)')

        }
        $('#SelectPKMNOutput').html(htmlSelectPKMNOutput);
    })
    
}
