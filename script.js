const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const generateButton = document.getElementById("generate");

getUser("virejdasani");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(
    "https://gh-pinned-repos.egoist.sh/?username=" + username
  );
  const respData = await resp.json();
  addReposToCard(respData);
}

function createUserCard(user) {
  const cardHTML = `
      <div id="capture">
        <div class="card">
            <div>
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <strong><h2>${user.name}</h2></strong>
                <p>${user.bio}</p>

                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos"></div>
            </div>
        </div>
      </div>
    `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");

    repoEl.href = repo.link;
    repoEl.target = "_blank";
    repoEl.innerText = repo.repo;

    reposEl.appendChild(repoEl);
  });
}

function createImg(node) {
  domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document.getElementById("card").scrollIntoView();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});

generateButton.addEventListener("click", () => {
  createImg(document.getElementById("capture"));
  sleep(2000).then(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  sleep(500).then(() => {
    var mainDiv = document.createElement("div");
    mainDiv.id = "underImg";
    var github = document.createElement("a");
    github.id = "github";
    github.className = "github-star-button";

    github.innerHTML = `
    <a class="gh-button" href="https://github.com/virejdasani/GitHub-Twitter-Banner"><span class="gh-button__icon"></span>Star on GitHub</a>
    </br>
      `;
    mainDiv.appendChild(github);

    document.body.appendChild(mainDiv);
  });
});
