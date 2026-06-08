document.getElementById("formContato").addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let tipo = document.getElementById("tipo").value;
  let data = document.getElementById("data").value;

  let dataFormatada = new Date(data).toLocaleDateString("pt-BR");

  let mensagem = `Olá, meu nome é ${nome} e meu email é ${email}, meu evento é um ${tipo} e será no dia ${dataFormatada} e gostaria de um orçamento!`;
  let telefone = "5563984243599";

  let url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");



});
// FILTRO PORTFÓLIO

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {

  button.addEventListener('click', () => {

    // remove active
    filterButtons.forEach(btn => btn.classList.remove('active'));

    // adiciona active
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    portfolioItems.forEach(item => {

      if (filter === 'all') {

        item.style.display = 'block';

      } else {

        if (item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }

      }

    });

  });

});

const cards =
document.querySelectorAll('.coverflow-card');

let current = 0;

function updateCoverflow(){

    cards.forEach(card=>{
        card.className =
        'coverflow-card hidden';
    });

    cards[current].className =
    'coverflow-card active';

    cards[
      (current - 1 + cards.length)
      % cards.length
    ].className =
    'coverflow-card left';

    cards[
      (current + 1)
      % cards.length
    ].className =
    'coverflow-card right';
}

function nextCard(){

    current++;

    if(current >= cards.length)
        current = 0;

    updateCoverflow();
}

function prevCard(){

    current--;

    if(current < 0)
        current = cards.length - 1;

    updateCoverflow();
}

document
.querySelector('.next')
.addEventListener('click',nextCard);

document
.querySelector('.prev')
.addEventListener('click',prevCard);

setInterval(nextCard,5000);

updateCoverflow();

document.addEventListener('DOMContentLoaded',()=>{

    const banner =
    document.getElementById('cookie-banner');

    const button =
    document.getElementById('accept-cookies');

    if(localStorage.getItem('cookiesAccepted')){

        banner.style.display = 'none';
    }

    button.addEventListener('click',()=>{

        localStorage.setItem(
            'cookiesAccepted',
            'true'
        );

        banner.style.display='none';
    });

});