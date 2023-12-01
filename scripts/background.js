// generate a random string long enough to fill the entire screen, based on the current display size and pixel size
function generateRandomString() {
    let randomString = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let length = Math.floor(window.innerWidth * window.innerHeight / 60);
    for (let i = 0; i < length; i++) {
        randomString += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log("generated random string of length " + length)
    return randomString;
}
    
function initializeText(){
    // find div with id dynamic-bg
    let div = document.getElementById("dynamic-bg");
    // set the innerHTML to the random string
    div.innerText = generateRandomString();
}

// change % of the characters
function updateText(){
    let div = document.getElementById("dynamic-bg");
    let text = div.innerHTML;
    let text2 = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    possible += "$#=?"
    for (let i = 0; i < text.length; i++) {
        if (Math.random() < 0.01) {
            text2 += possible.charAt(Math.floor(Math.random() * possible.length));
        } else {
            text2 += text.charAt(i);
        }
    }
    div.innerText = text2;
    console.log("changed background")
}