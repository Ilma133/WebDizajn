let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

window.onscroll = () =>{

  menu.classList.remove('fa-times');
  navbar.classList.remove('active');

  if(window.scrollY > 60){
    document.querySelector('#scroll-top').classList.add('active');
  }else{
    document.querySelector('#scroll-top').classList.remove('active');
  }

}

let jela = [];
fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`)
  .then(response=>{
    return response.json();
  
  })
  .then(data=>{
    jela=data;
    renderMeals(data);
  })

  const renderMeals=(jela)=>{
    const jelo=document.getElementsByClassName('box-container')[0];

    let resultHtml='';

    jela.forEach(hrana=>{
      resultHtml+=`
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
            <button type="button" class="btn btn-danger" onclick="obrisiJelo(${hrana.id})">Izbriši</button>
            <button type="button" class="btn btn-danger" onclick="editJelo(${hrana.id})">Update</button>
            </div>
            </div>`;
          });
    jelo.innerHTML=resultHtml;
  }

  const obrisiJelo = (id) => {
    fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(res);
    })
}

const editJelo = (hranaId) => {
  const hrana = jela.find(hrana => hrana.id === hranaId);
  const jeloFormId = document.getElementById('obrok-id')
  const jeloFormNaziv = document.getElementById('obrok-naziv')
  const jeloFormCijena = document.getElementById('obrok-cijena')
  const jeloFormURL = document.getElementById('obrok-url')

  jeloFormId.value = hrana.id;
  jeloFormNaziv.value = hrana.name;
  jeloFormCijena.value = hrana.price;
  jeloFormURL.value = hrana.imageUrl;
}

const updateJelo = () => {
  const jeloFormId = document.getElementById('obrok-id').value;
  const jeloFormNaziv = document.getElementById('obrok-naziv').value;
  const jeloFormCijena = document.getElementById('obrok-cijena').value;
  const jeloFormURL = document.getElementById('obrok-url').value;

  fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`, {
      method: 'PUT',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify ({
          id: jeloFormId,
          name: jeloFormNaziv,
          price: jeloFormCijena,
          imageUrl: jeloFormURL
      })
  })
  .then(response => {
      if(!response.ok)
      {
          alert('[ERROR]');
      }
  })

}

const dodajJelo = () => {
  const jelo1FormId = document.getElementById('obrok1-id').value;
  const jelo1FormNaziv = document.getElementById('obrok1-naziv').value;
  const jelo1FormCijena = document.getElementById('obrok1-cijena').value;
  const jelo1FormURL = document.getElementById('obrok1-url').value;

  fetch(`https://ptf-web-dizajn-2022.azurewebsites.net/api/Food`, {
      method:'POST',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id: jelo1FormId,
        name: jelo1FormNaziv,
        price: jelo1FormCijena,
        imageUrl: jelo1FormURL
      })
  })
  .then(response => {
      console.log(response);
  })

}