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
 botaoListar.addEventListener("click", () => {
  loadHeroes();
});


async function loadHeroes() {
  const res = await fetch("https://backendsuperhero.onrender.com/api/entries");
  const heroes = await res.json();

  heroesList.innerHTML = "";
  heroes.forEach(h => {
    const li = document.createElement("li");
    li.textContent = `${h.nome} - ${h.poder} - ${h.raca} - ${h.tipo}`;

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

loadHeroes();
