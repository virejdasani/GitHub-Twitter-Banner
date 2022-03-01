const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const downloadButton = document.getElementById("download");

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

downloadButton.addEventListener("click", () => {
  createImg(document.getElementById("capture"));
});
