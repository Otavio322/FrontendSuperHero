const botao = document.getElementById("botaoAdicionar");
const heroesList = document.getElementById("Heroes");
const botaoListar = document.getElementById("botaoListar");

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

  await fetch("https://backendsuperhero.onrender.com/api/entries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hero)
  });

  document.getElementById("nomeHeroi").value = "";
  document.getElementById("poderHeroi").value = "";
  document.getElementById("racaHeroi").value = "";
  document.getElementById("tipoHeroi").value = "";
});

let listaVisivel = false;

botaoListar.addEventListener("click", () => {
  if (navigator.vibrate) {
    navigator.vibrate(1000);
  }

  if (listaVisivel) {
    heroesList.innerHTML = "none";
    listaVisivel = false;
    botaoListar.textContent = "Listar Heróis";
    } else {
    loadHeroes();
    heroesList.style.display = "block";
    listaVisivel = true;
    botaoListar.textContent = "Fechar Lista";
    }
  loadHeroes();
  
});

async function loadHeroes() {
  const res = await fetch("https://backendsuperhero.onrender.com/api/entries");
  const heroes = await res.json();

  heroesList.innerHTML = "";
  heroes.forEach(h => {
    const li = document.createElement("li");

    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = h.nome;

    const poderSpan = document.createElement("span");
    poderSpan.textContent = h.poder;

    const racaSpan = document.createElement("span");
    racaSpan.textContent = h.raca;

    const tipoSpan = document.createElement("span");
    tipoSpan.textContent = h.tipo;

    li.appendChild(nomeSpan);
    li.appendChild(document.createTextNode(" | "));
    li.appendChild(poderSpan);
    li.appendChild(document.createTextNode(" | "));
    li.appendChild(racaSpan);
    li.appendChild(document.createTextNode(" | "));
    li.appendChild(tipoSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`https://backendsuperhero.onrender.com/api/entries/${h._id}`, {
        method: "DELETE"
      });
      loadHeroes();
    };

    const editBtn = document.createElement("button");
    editBtn.textContent = "Editar";
    editBtn.onclick = async () => {
      const novoNome = prompt("Novo nome:", h.nome);
      const novoPoder = prompt("Novo poder:", h.poder);
      const novaRaca = prompt("Nova raça:", h.raca);
      const novoTipo = prompt("Novo tipo:", h.tipo);

      const updatedHero = {
        nome: novoNome,
        poder: novoPoder,
        raca: novaRaca,
        tipo: novoTipo
      };

      await fetch(`https://backendsuperhero.onrender.com/api/entries/${h._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHero)
      });
      loadHeroes();
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    heroesList.appendChild(li);
  });
}
