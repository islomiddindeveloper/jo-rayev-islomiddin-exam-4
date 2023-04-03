const ul = document.querySelector("#categories");
const resultsList = document.querySelector("#results");
const searchInput = document.querySelector("#search-input");
const dark = document.querySelector(".uil");
const laid = document.querySelector(".switch");

//============start darkLaid================//

dark.addEventListener("click", (e) => {
  document.body.style.backgroundColor = "black";
  document.head.style.backgroundColor = "black";
});
laid.addEventListener("click", (e) => {
  document.body.style.backgroundColor = "white";
  document.head.style.backgroundColor = "white";
});

//============end darkLaid================//

//============start Global Search================//

function fetchData(search = "") {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${
      search || "flowers"
    }&orderBy=newest&key=`
  )
    .then((response) => response.json())
    .then((res) => renderData(res));
}

//============end Global Search================//

//============start UI================//

fetchData();

function renderData(data) {
  $("ul").textContent = "";

  if (!data?.items) {
    const li = createElement(
      "li",
      "text-center text-danger",
      "Ma'lumot topilmadi!"
    );
    $("ul").append(li);
  } else {
    data.items.forEach((element) => {
      const li = createElement(
        "li",
        "col-12 col-md-6 col-lg-4 mb-3 ",
        `
          <div class="card"  data-set-id=${element.id}>
            <div>
              <div class p-4">
                <img class="card-img-top" src='${element.volumeInfo.imageLinks?.smallThumbnail}' height = "201" width="201" alt="Card image cap">
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">${element.volumeInfo.title}</h5></p>
              <h5 class="card-title">${element.volumeInfo.title}</h5></p>
              <div class="d-flex justify-content-center gap-4 mb-3">
                <button class="btn btn-warning px-3" data-set-id=${element.id}>Bookmark</button>
                <button class="btn btn-light px-3"  data-mdb-toggle="modal"
                data-mdb-target="#exampleModal">More Info</button>
              </div>
              <button class="btn  btn-info w-100">Read</button>
            </div>
          </div> 
        `
      );
      $("ul").append(li);
    });
  }
}

//============END UI================//

searchInput.addEventListener("input", (e) => {
  fetchData(e.target.value);
});

const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "../login.html";
}

if (token) {
  $("#logout").addEventListener("click", () => {
    localStorage.removeItem("token");

    $("#logout").textContent = "login";
    window.location.href = "../login.html";
  });
}

//============start bookMark================//

let bookMark = [];

$(".More Info").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-light")) {
    let id = e.target.getAttribute("data-info");
    console.log(id);

    const select = element.filter((item) => item.id === id)[0];

    if (!bookMark.includes(select)) {
      bookMark.push(select);
    }
    console.log(bookMark);
  }
});

//============end bookMark================//

// =============start  backtop ===============//

includeHTML();

let backtop = document.getElementById("backtop");

function toggleBacktop() {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backtop.style.opacity = 1;
  } else {
    backtop.style.opacity = 0;
  }
}

window.addEventListener("scroll", function () {
  toggleBacktop();
});
