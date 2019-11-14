// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function() { myFunction() };

function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

//API Call
function apiCall() {
    var abc = $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/?limit=20000"//"https://pokeapi.co/api/v2/pokemon/1/" // "https://quotes.rest/qod"//https://www.metaPokemon.com/api/location/search/?query=london
        ,headers: {
            "Accept": "application/json"
        }
        /* ,
        beforeSend: function( xhr ) {
        xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
        } */
    })
        .done(function( data ) {
            alert( "success" );
            if ( console && console.log ) {
            console.log( "Sample of data:", data );
            var x = '';
            for (i in data.results) {
                x += '#' + (parseInt(i) + 1).toString() + ': ' + data.results[i].name + '<br>';
            }
            $("#APIResult").html(x.replace(/"/g,'').toUpperCase()/* JSON.stringify(data) */);
            // $("#APIImage").html('<img src=' + JSON.stringify(data.sprites.front_default) + '  alt=' + JSON.stringify(data.name) + ' width="407" height="407"></img>'  );
        }
        })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "complete" );
    });
    
}