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