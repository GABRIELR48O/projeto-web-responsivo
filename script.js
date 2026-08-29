const btn = document.getElementById("btnSortear");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");

btn.addEventListener("click", () => {
  resultado.innerHTML = "";
  erro.textContent = "";

  const quantidade = Number(document.getElementById("quantidade").value);
  const min = Number(document.getElementById("min").value);
  const max = Number(document.getElementById("max").value);
  const semRepetir = document.getElementById("semRepetir").checked;

  if (!quantidade || !min || !max) {
    erro.textContent = "Preencha todos os campos!";
    return;
  }

  if (max <= min) {
    erro.textContent = "O valor máximo deve ser maior que o mínimo!";
    return;
  }

  const intervalo = max - min + 1;

  if (semRepetir && quantidade > intervalo) {
    erro.textContent = "Quantidade maior que o intervalo disponível!";
    return;
  }

  let numeros = [];

  for (let i = 0; i < quantidade; i++) {
    let numero;

    do {
      numero = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (semRepetir && numeros.includes(numero));

    numeros.push(numero);
  }

  numeros.forEach((num, index) => {
    setTimeout(() => {
      const div = document.createElement("div");
      div.classList.add("numero");
      div.textContent = num;
      resultado.appendChild(div);

      // Dispara os confetes no último número sorteado
      if (index === numeros.length - 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, index * 300);
  });
});