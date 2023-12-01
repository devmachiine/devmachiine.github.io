class TextBackground extends HTMLElement {
    constructor() {
        super();
        this.__characterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#=?"
    }

    generateRandomString() {
        let randomString = "";
        let windowCharCount = Math.floor(window.innerWidth * window.innerHeight / 60);
        for (let i = 0; i < windowCharCount; i++) {
            randomString += this.__characterPool.charAt(Math.floor(Math.random() * this.__characterPool.length));
        }
        return randomString;
    }

    initializeText() {
        // find div with id dynamic-bg
        let div = this.shadowRoot.getElementById("dynamic-bg");
        // set the innerHTML to the random string
        let randomString = this.generateRandomString();
        console.log('init string: ' + randomString.length)
        div.innerText = randomString;
    }

    updateText(){
        let div = this.shadowRoot.getElementById("dynamic-bg");
        let oldText = div.innerText
        let newText = "";
        let possible = this.__characterPool;
        for (let i = 0; i < oldText.length; i++) {
            if (Math.random() < 0.01) {
                newText += possible.charAt(Math.floor(Math.random() * possible.length));
            } else {
                newText += oldText.charAt(i);
            }
        }
        div.innerText = newText;
        console.log("changed text")
    }

    // Called when element is inserted in DOM
    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");

        linkElem.setAttribute("type", "text/css");
        linkElem.setAttribute("media", "screen");

        // linkElem.setAttribute("href", "style.css");
        linkElem.setAttribute("href", "/components/text-background/style.css");

        const dynamicBc = document.createElement("div");
        dynamicBc.setAttribute("id", "dynamic-bg");

        shadow.appendChild(linkElem);
        shadow.appendChild(dynamicBc);

        this.initializeText();

        // every 100ms, update the text
        setInterval(() => this.updateText(), 100);
    }

}

customElements.define('text-background', TextBackground);
