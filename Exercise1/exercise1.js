function myFunction(label, id) {
    var text = document.getElementById(id).value;
    document.getElementById(id + "out").innerHTML = label + " : " + text;
}