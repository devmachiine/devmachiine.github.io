
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

export { gha };
