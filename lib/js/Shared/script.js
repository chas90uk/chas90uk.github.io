//Shared On Load//
    $(function() {
        console.log( "Shared ready!" );
        $('#myNavbar').html(
            '<a class="w3-bar-item w3-button w3-hover-black w3-hide-medium w3-hide-large w3-right" href="javascript:void(0);" onclick="toggleFunction()" title="Toggle Navigation Menu">' +
                '<i class="fa fa-bars"></i>' +
            '</a>' +
            '<a href="index.html#home" class="w3-bar-item w3-button">HOME</a>' +
            '<a href="index.html#about" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-user"></i> ABOUT</a>' +
            '<a href="index.html#portfolio" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-th"></i> PORTFOLIO</a>' +
            '<a href="index.html#contact" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-envelope"></i> CONTACT</a>' +
            '<a href="PokemonAPI.html" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-bug"></i> POKÉMON API TEST</a>' +
            '<a href="PoliceAPI.html" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-balance-scale"></i> POLICE API TEST</a>' +
            //'<a href="WeatherAPI.html" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-cloud"></i> WEATHER API TEST</a>' +
            //'<a href="Miscellaneous.html" class="w3-bar-item w3-button w3-hide-small"><i class="fa fa-question-circle"></i> MISCELLANEOUS</a>' +
            '<a href="#" class="w3-bar-item w3-button w3-hide-small w3-right w3-hover-red">' +
                '<i class="fa fa-search"></i>' +
            '</a>'
        );
        $('#navDemo').html(
            '<a href="index.html#about" class="w3-bar-item w3-button" onclick="toggleFunction()">ABOUT</a>' +
            '<a href="index.html#portfolio" class="w3-bar-item w3-button" onclick="toggleFunction()">PORTFOLIO</a>' +
            '<a href="index.html#contact" class="w3-bar-item w3-button" onclick="toggleFunction()">CONTACT</a>' +
            '<a href="PokemonAPI.html" class="w3-bar-item w3-button" onclick="toggleFunction()">POKÉMON API TEST</a>' +
            '<a href="PoliceAPI.html" class="w3-bar-item w3-button" onclick="toggleFunction()">POLICE API TEST</a>' +
            '<a href="WeatherAPI.html" class="w3-bar-item w3-button" onclick="toggleFunction()">WEATHER API TEST</a>' +
            '<a href="Miscellaneous.html" class="w3-bar-item w3-button" onclick="toggleFunction()">MISCELLANEOUS</a>' +
            '<a href="#" class="w3-bar-item w3-button">SEARCH</a>'
        );
        $('#sharedFooter').html(
            '<a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>' +
            '<div class="w3-xlarge w3-section">' +
                '<a href="https://github.com/chas90uk/CV_Resume/blob/master/CV_Charlie_Gunning.pdf" target="_blank"><i class="fa fa-github w3-hover-opacity w3-padding-small"></i></a>' +
                '<a href="https://uk.linkedin.com/in/charlie-gunning-1990" target="_blank"><i class="fa fa-linkedin w3-hover-opacity w3-padding-small"></i></a>' +
            '</div>' +
            '<p>' +
                'Initial design provided by <a href="https://www.w3schools.com/w3css/default.asp" title="W3.CSS" target="_blank" class="w3-hover-text-green">w3.css</a>' +
                '<br>' +
                'Amended by Charlie Gunning' +
            '</p>'
        );
        $('#apiCallCount').html('0');
    });

////

//API Call//
function apiCall(urlAPI, fn) {
    result = $.ajax({
        url: urlAPI
        ,headers: {
            "Accept": "application/json"
        }
    })
    .done(function(data) {
        // alert( "success" );
        fn(data);
    })
    .fail(function(jqXHR) {
        alert( "Error calling API: " + jqXHR.status + ' - ' + jqXHR.responseText );
    })
    .always(function(){
        apiCallCountIncrease();
    })
};
////

//API Call Count Increase//
    function apiCallCountIncrease() {
        $('#apiCallCount').html(
            parseInt($('#apiCallCount').html(), 10)
            + 1
        );
    }
////

//W3 Content//
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
////

