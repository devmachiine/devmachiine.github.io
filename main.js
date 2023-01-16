const gha = {
  gh_user: 'none',
  repo: 'none',
  repos: {},
  set user(name) {
    this.gh_user = name;
    fetch(`https://api.github.com/users/${name}/repos`).then(r => r.json()).then(r => {
      r.map(r => r.name).map(n => {
        this.repos[n] = n
        console.log(n)
      })
    })
  }
};

window.gha = gha;

// export { gha };

async function digestMessage(message) {
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}

async function generate() {
  let input = prompt("Enter first data part")
  if(input.length !== 4){
      alert(`input size is different than expected (${input.length} instead of 4)`)
  }
  let salt = prompt("Enter secret")
  let inputHash = await digestMessage(input)
  let saltHash = await digestMessage(salt)
  let hashhash = await digestMessage(inputHash + saltHash)
  inputHash = await digestMessage('prevent values hanging around')
  saltHash = await digestMessage('while the alert output is open')
  let displayHash = hashhash.match(/.{4}/g).join('-')
  alert(displayHash)
}

window.generate = generate;
