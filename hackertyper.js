var codePane;
var isTyping = false;
var charPerStroke = 3;
var position;
var text;

function init() {
    codePane = document.getElementById("code-pane");
    document.getElementById("conf").style.display = "none";
    document.getElementById("code-form").style.display = "";
    charPerStroke = parseInt(document.getElementById("keystroke-chars").getAttribute("value"));

    var file = document.getElementById("file").getAttribute("name");
    loadFile(file);
}

function loadFile(file) {
    var req = new XMLHttpRequest();

    req.open("GET", file, false);
    req.send(null);

    text = req.responseText;

    ready();
}

function ready() {
    isTyping = true;
    position = 0;
    codePane.textContent = "";
}

function keyHandler(e) {
    if (!isTyping) {
        return true;
    }

    position += charPerStroke;
    position %= text.length;

    codePane.textContent = text.substr(0, position);
    window.scrollTo(0, document.body.scrollHeight);

    return false;
}

window.onload = init;
window.onkeydown = keyHandler;
