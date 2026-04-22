const botao = document.getElementById("botaoAdicionar");
const heroesList = document.getElementById("Heroes");

botao.addEventListener("click", async () => {
  if (navigator.vibrate) {
        navigator.vibrate(1000);
    }
    const hero = {
    
    nome: document.getElementById("nomeHeroi").value,
    poder: document.getElementById("poderHeroi").value,
    raca: document.getElementById("racaHeroi").value,
    tipo: document.getElementById("tipoHeroi").value
  };
  await fetch("http://localhost:3000/heroes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hero)
  });
  loadHeroes();
});

async function loadHeroes() {
  const res = await fetch("http://localhost:3000/heroes");
  const heroes = await res.json();

  heroesList.innerHTML = "";
  heroes.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.nome} - ${h.poder} - ${h.raca} - ${h.tipo}`;
    heroesList.appendChild(li);
  });
}

loadHeroes();