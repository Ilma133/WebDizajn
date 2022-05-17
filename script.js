let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");

  if (window.scrollY > 60) {
    document.querySelector("#scroll-top").classList.add("active");
  } else {
    document.querySelector("#scroll-top").classList.remove("active");
  }
};

let jela = [];
fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    jela = data;
    renderMeals(data);
  });

const renderMeals = (jela) => {
  const jelo = document.getElementsByClassName("box-container")[0];

  let resultHtml = "";

  jela.forEach((hrana) => {
    resultHtml += `
            <div class="box">
            <div>
            <img class="image" src="${hrana.imageUrl}" alt="">
            <div class="content">
                <h3>${hrana.name}</h3>
                <p>${hrana.id} <br>
                Cijena: ${hrana.price}KM</p>
            </div>
            </div>
            <div>
            <button type="button" class="btn " onclick="obrisiJelo(${hrana.id})">Izbriši</button>
            <button type="button" class="btn updateDugme" onclick="updateFunkcija(${hrana.id})">Update</button>
            </div>
            </div>`;
  });
  jelo.innerHTML = resultHtml;
};

const obrisiJelo = (id) => {
  console.log("DELETE");
  fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food/${id}`, {
    method: "DELETE",
  }).then((res) => {
    console.log(res);
  });
};

const updateJelo = (objekat) => {
  console.log("UPDATE");
  fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`, {
    method: "PUT",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(objekat),
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      alert("[ERROR]");
    }
  });
};

const dodajJelo = (objekat) => {
  console.log(objekat);
  console.log("DODAJ");
  fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(objekat),
  }).then((response) => {
    console.log(response);
  });
};
let formaDugme = document.querySelector(".dugme");
let formaOverlay = document.querySelector(".overlayForme");
let modalOverlay = document.querySelector(".modalForme");
let idJelo = document.querySelector("#id-jelo");
let idNaziv = document.querySelector("#id-naziv");
let idCijena = document.querySelector("#id-cijena");
let idURL = document.querySelector("#id-url");
let updateDugme = document.querySelector(".updateDugme");
let updateNe = document.querySelector(".updateNe");
let dodaj = 0;
let id = 0;
//Ako dodaj ostane 0, znaci da je se otvorila forma DODAJ, ako postane 1 znaci da se otvorila forma UPDATE!
const updateFunkcija = (hranaId) => {
  dodaj = 1;
  id = hranaId;
  updateNe.classList.add("hidden");
  formaOverlay.classList.toggle("hidden");
  modalOverlay.classList.toggle("hidden");
};

formaDugme.addEventListener("click", () => {
  dodaj = 0;
  updateNe.classList.remove("hidden");
  formaOverlay.classList.toggle("hidden");
  modalOverlay.classList.toggle("hidden");
});
formaOverlay.addEventListener("click", () => {
  formaOverlay.classList.toggle("hidden");
  modalOverlay.classList.toggle("hidden");
});
let forma = document.querySelector(".forma");
forma.addEventListener("submit", (e) => {
  e.preventDefault();
  if (dodaj === 0) {
    dodajJelo({
      id: Number(idJelo.value),
      name: String(idNaziv.value),
      price: Number(idCijena.value),
      imageUrl: String(idURL.value),
    });
    dodaj = 0;
    idJelo.value = "";
    idNaziv.value = "";
    idCijena.value = "";
    idURL.value = "";
  } else {
    updateJelo({
      id: Number(id),
      name: String(idNaziv.value),
      price: Number(idCijena.value),
      imageUrl: String(idURL.value),
    });
    dodaj = 0;
    idJelo.value = "";
    idNaziv.value = "";
    idCijena.value = "";
    idURL.value = "";
  }
  formaOverlay.classList.toggle("hidden");
  modalOverlay.classList.toggle("hidden");
});
  