document.getElementById("formContato").addEventListener("submit", function(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;

  let mensagem = `Olá, meu nome é ${nome} e meu email é ${email}  e gostaria de um orçamento!`;
  let telefone = "5563992895005";

  let url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
});