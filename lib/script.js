window.onload=function(){
    document.getElementById("a1").addEventListener("click", toggle, false);
    document.getElementById("b1").addEventListener("click", toggle, false);
    document.getElementById("c1").addEventListener("click", toggle, false);
    document.getElementById("d1").addEventListener("click", toggle, false);
    document.getElementById("e1").addEventListener("click", toggle, false);
    document.getElementById("a2").addEventListener("click", toggle, false);
    document.getElementById("b2").addEventListener("click", toggle, false);
    document.getElementById("c2").addEventListener("click", toggle, false);
    document.getElementById("d2").addEventListener("click", toggle, false);
    document.getElementById("e2").addEventListener("click", toggle, false);
    document.getElementById("a3").addEventListener("click", toggle, false);
    document.getElementById("b3").addEventListener("click", toggle, false);
    document.getElementById("c3").addEventListener("click", toggle, false);
    document.getElementById("d3").addEventListener("click", toggle, false);
    document.getElementById("e3").addEventListener("click", toggle, false);
    document.getElementById("a4").addEventListener("click", toggle, false);
    document.getElementById("b4").addEventListener("click", toggle, false);
    document.getElementById("c4").addEventListener("click", toggle, false);
    document.getElementById("d4").addEventListener("click", toggle, false);
    document.getElementById("e4").addEventListener("click", toggle, false);
    document.getElementById("a5").addEventListener("click", toggle, false);
    document.getElementById("b5").addEventListener("click", toggle, false);
    document.getElementById("c5").addEventListener("click", toggle, false);
    document.getElementById("d5").addEventListener("click", toggle, false);
    document.getElementById("e5").addEventListener("click", toggle, false);
    document.getElementById("newgame").addEventListener("click", newgame, false);
};

function toggle() {
    var id = this.id;
    var col = id[0];
    var row = id[1];
    var top = col + (parseInt(row) - 1);
    var right = String.fromCharCode(col.charCodeAt(0) + 1) + row;
    var bottom = col + (parseInt(row) + 1);
    var left = String.fromCharCode(col.charCodeAt(0) - 1) + row;
    console.log("id: " + id);
    console.log("col: " + col);
    console.log("row: " + row);
    console.log("top: " + top);
    console.log("right: " + right);
    console.log("bottom: " + bottom);
    console.log("left: " + left);
    switchbool(document.getElementById(id));
    switchbool(document.getElementById(top));
    switchbool(document.getElementById(right));
    switchbool(document.getElementById(bottom));
    switchbool(document.getElementById(left));
    checkbool();
    
}

function switchbool(ele) {
    try {
        if (ele.className.match(/(?:^|\s)buttontrue(?!\S)/)){
            ele.className = "buttonfalse";
        }
        else {
            ele.className = "buttontrue";
        }
    }
    catch (e){}

}

function checkbool() {
    if (document.querySelectorAll('.buttontrue').length == 25) {
        document.getElementById("win").innerHTML = "WIN";
    }
}

function randomclass() {
    var val = Math.random();
    if (val < 0.50) {
        return "buttontrue";
    }
    else {
        return "buttonfalse";
    }
}

function newgame() {
    document.getElementById("win").innerHTML = "";
    while (document.querySelectorAll('.buttontrue').length < 15)
    {
        document.getElementById("a1").className = randomclass();
        document.getElementById("b1").className = randomclass();
        document.getElementById("c1").className = randomclass();
        document.getElementById("d1").className = randomclass();
        document.getElementById("e1").className = randomclass();
        document.getElementById("a2").className = randomclass();
        document.getElementById("b2").className = randomclass();
        document.getElementById("c2").className = randomclass();
        document.getElementById("d2").className = randomclass();
        document.getElementById("e2").className = randomclass();
        document.getElementById("a3").className = randomclass();
        document.getElementById("b3").className = randomclass();
        document.getElementById("c3").className = randomclass();
        document.getElementById("d3").className = randomclass();
        document.getElementById("e3").className = randomclass();
        document.getElementById("a4").className = randomclass();
        document.getElementById("b4").className = randomclass();
        document.getElementById("c4").className = randomclass();
        document.getElementById("d4").className = randomclass();
        document.getElementById("e4").className = randomclass();
        document.getElementById("a5").className = randomclass();
        document.getElementById("b5").className = randomclass();
        document.getElementById("c5").className = randomclass();
        document.getElementById("d5").className = randomclass();
        document.getElementById("e5").className = randomclass();
    }
}