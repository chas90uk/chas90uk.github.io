//Call API On Load//
    $(function() {
        // console.log( 'https://tile.openweathermap.org/map/clouds_new/' + zoomLatLonToTileString(3,51.516000,0.583000) + '.png?appid=3c88b94ad04934ec6ebf227fe73af200' );
        // apiCall("http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=1527811200&opacity=0.9&fill_bound=true&appid={api_key}", function(data) {
            //3c88b94ad04934ec6ebf227fe73af200  OpenWeather Key
            //kA6fGaARJ9Iwnnr4pxl4GMPHyuhJgXNc TomTom key
            // https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={api_key}
            // https://tile.openweathermap.org/map/clouds_new/0/0/0.png?appid=3c88b94ad04934ec6ebf227fe73af200
            $('#APIResult').html('<img style="position: absolute;   top: 50px; left: 100px;" src="https://api.tomtom.com/map/1/tile/basic/main/' + zoomLatLonToTileString(12,51.516000,0.583000) + 
            '.png?&key=kA6fGaARJ9Iwnnr4pxl4GMPHyuhJgXNc"></img>' + 
            '<img style="position: absolute;   top: 50px; left: 100px;" src="https://tile.openweathermap.org/map/precipitation_new/' + zoomLatLonToTileString(12,51.516000,0.583000) + 
            '..png?appid=3c88b94ad04934ec6ebf227fe73af200"></img>')  
            // $('#owm_canvas').attr('src', 'http://sat.owm.io/sql/' + zoomLatLonToTileString(7,51.516000,0.583000) + '?appid=3c88b94ad04934ec6ebf227fe73af200&overzoom=true&op=rgb&from=cloudless&select=b4,b3,b2')
    });
////

function zoomLatLonToTileString(zoom,lat,lon) {
    return zoom + 
        '/' + 
        (Math.floor((lon+180)/360*Math.pow(2,zoom))) + 
        '/' + 
        (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom)));
}




//Pokémon Name List//
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
////

//Selected Pokémon//
    function selectPKMN(pkmn) {
        var urlID = pkmn.value;
        var urlAPI = 'https://pokeapi.co/api/v2/pokemon/' + urlID + '/';
        apiCall(urlAPI, function(data) {
            //Name
            namePKMN = (data.name).toUpperCase();
            
            //Images
            imgPKMNback_default = data.sprites.back_default;
            imgPKMNfront_default = data.sprites.front_default;
            imgPKMNback_shiny = data.sprites.back_shiny;
            imgPKMNfront_shiny = data.sprites.front_shiny;
            imgPKMNback_female = data.sprites.back_female;
            imgPKMNfront_female = data.sprites.front_female;
            imgPKMNback_shiny_female = data.sprites.back_shiny_female;
            imgPKMNfront_shiny_female = data.sprites.front_shiny_female;

            //Data
            var dataPKMNTypes = [];
            var dataPKMNTypesSub = [];
            //Types
            for (i in data.types) {
                dataPKMNTypesSub.push([data.types[i].slot, data.types[i].type.name])
            }
            dataPKMNTypesSub = dataPKMNTypesSub.sort();
            for (i in dataPKMNTypesSub) {
                dataPKMNTypes.push(dataPKMNTypesSub[i][1])
            }
            //Stats
            var dataPKMNStats_HP = '';
            var dataPKMNStats_ATK = '';
            var dataPKMNStats_DEF = '';
            var dataPKMNStats_SpATK = '';
            var dataPKMNStats_SpDEF = '';
            var dataPKMNStats_SPD = '';
            for (i in data.stats) {
                switch(data.stats[i].stat.name) {
                    case 'hp':
                        dataPKMNStats_HP = data.stats[i].base_stat
                    break;
                    case 'attack':
                        dataPKMNStats_ATK = data.stats[i].base_stat
                    break;
                    case 'defense':
                        dataPKMNStats_DEF = data.stats[i].base_stat
                    break;
                    case 'special-attack':
                        dataPKMNStats_SpATK = data.stats[i].base_stat
                    break;
                    case 'special-defense':
                        dataPKMNStats_SpDEF = data.stats[i].base_stat
                    break;
                    case 'speed':
                        dataPKMNStats_SPD = data.stats[i].base_stat
                    break;
                }
            }
            var dataPKMNHeight = data.height
            var dataPKMNWeight = data.weight

            //Set Images
            htmlSelectPKMNImage = 
                '<table style="width:100%; height:440px;">' + 
                    '<tr style="height: 10px;"><th colspan="2">MALE</th></tr>' +
                    '<tr style="height: 100px;">' + 
                        '<td><img src="' + imgPKMNback_default + '" alt="' + namePKMN + ' (back male)"></td>' +
                        '<td><img src="' + imgPKMNfront_default + '" alt="' + namePKMN + ' (front male)"></td>' +
                    '</tr>' +
                    '<tr style="height: 10px;"><th colspan="2">FEMALE</th></tr>' +
                    '<tr style="height: 100px;">' + 
                        '<td><img src="' + imgPKMNback_female  + '" alt="' + namePKMN + ' (back female)"></td>' +
                        '<td><img src="' + imgPKMNfront_female + '" alt="' + namePKMN + ' (front female)"></td>' +
                    '</tr>' +
                    '<tr style="height: 10px;"><th colspan="2">MALE (SHINY)</th></tr>' +
                    '<tr style="height: 100px;">' + 
                        '<td><img src="' + imgPKMNback_shiny + '" alt="' + namePKMN + ' (back shiny)"></td>' +
                        '<td><img src="' + imgPKMNfront_shiny + '" alt="' + namePKMN + ' (front shiny)"></td>' +
                    '</tr>' +
                    '<tr style="height: 10px;"><th colspan="2">FEMALE (SHINY)</th></tr>' +
                    '<tr style="height: 100px;">' + 
                        '<td><img src="' + imgPKMNback_shiny_female + '" alt="' + namePKMN + ' (back female shiny)"></td>' +
                        '<td><img src="' + imgPKMNfront_shiny_female + '" alt="' + namePKMN + ' (front female shiny)"></td>' +
                    '</tr>' +
                '</table>';
            htmlSelectPKMNImage = 
                htmlSelectPKMNImage.replace(/<img src="null"[^<]*/g,'');
            if(!(imgPKMNback_female && imgPKMNfront_female)) {
                htmlSelectPKMNImage = 
                    htmlSelectPKMNImage.replace('FEMALE (SHINY)','').replace('FEMALE','').replace(/MALE/g,'MALE/FEMALE');
            }
            $('#SelectPKMNImage').html(htmlSelectPKMNImage);

            //Set Data
            $('#PKMNType').html(dataPKMNTypes.join('/').toUpperCase());
            $('#PKMNStats_HP').html(dataPKMNStats_HP);
            $('#PKMNStats_ATK').html(dataPKMNStats_ATK);
            $('#PKMNStats_DEF').html(dataPKMNStats_DEF);
            $('#PKMNStats_SpATK').html(dataPKMNStats_SpATK);
            $('#PKMNStats_SpDEF').html(dataPKMNStats_SpDEF);
            $('#PKMNStats_SPD').html(dataPKMNStats_SPD);
            $('#PKMNHeight').html(dataPKMNHeight);
            $('#PKMNWeight').html(dataPKMNWeight);
        });
    }
////