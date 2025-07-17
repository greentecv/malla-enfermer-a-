const ramos = [
  { id: "ENF3000", nombre: "Química", requisitos: [], semestre: 1 },
  { id: "ENF3001", nombre: "Biología", requisitos: [], semestre: 1 },
  { id: "ENF3002", nombre: "Bases Teóricas I", requisitos: [], semestre: 1 },
  { id: "ENF3003", nombre: "Primeros Auxilios", requisitos: [], semestre: 1 },
  { id: "ENF3004", nombre: "Psicología Evolutiva", requisitos: [], semestre: 1 },
  { id: "INGLES1", nombre: "Inglés I", requisitos: [], semestre: 1 },

  { id: "ENF3005", nombre: "Bioquímica", requisitos: ["ENF3000"], semestre: 2 },
  { id: "ENF3006", nombre: "Morfofunción I", requisitos: ["ENF3001"], semestre: 2 },
  { id: "ENF3007", nombre: "Bases Teóricas II", requisitos: ["ENF3002"], semestre: 2 },
  { id: "ENF3008", nombre: "Comunicación y Educación", requisitos: [], semestre: 2 },
  { id: "INGLES2", nombre: "Inglés II", requisitos: ["INGLES1"], semestre: 2 },
  { id: "CFG1", nombre: "CFG I", requisitos: [], semestre: 2 },

  // Agrega aquí todos los ramos hasta el semestre X
  // Usa la misma lógica, por ejemplo:
  { id: "ENF3009", nombre: "Microbiología", requisitos: ["ENF3005", "ENF3006"], semestre: 3 },
  { id: "ENF3010", nombre: "Morfofunción II", requisitos: ["ENF3006"], semestre: 3 },
  { id: "ENF3011", nombre: "Cuidados de Enfermería I", requisitos: ["ENF3007"], semestre: 3 },
  { id: "INGLES3", nombre: "Inglés III", requisitos: ["INGLES2"], semestre: 3 },

  // Continúa con los demás ramos...

];

const aprobados = new Set();

function desbloquearRamos() {
  ramos.forEach(r => {
    const div = document.getElementById(r.id);
    if (!div) return;

    const cumplido = r.requisitos.every(req => aprobados.has(req));
    if (cumplido) {
      div.classList.remove("bloqueado");
    } else {
      div.classList.add("bloqueado");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Crea los ramos dinámicamente para los semestres III a X
  const contenedor = document.querySelector(".contenedor");
  for (let s = 3; s <= 10; s++) {
    const sem = document.createElement("div");
    sem.className = `semestre s${s}`;
    sem.innerHTML = `<h2>Semestre ${s}</h2>`;
    contenedor.appendChild(sem);
  }

  ramos.forEach(r => {
    const div = document.createElement("div");
    div.className = "ramo bloqueado";
    div.id = r.id;
    div.innerText = r.nombre;
    div.addEventListener("click", () => {
      if (!div.classList.contains("bloqueado")) {
        div.classList.toggle("aprobado");
        if (div.classList.contains("aprobado")) {
          aprobados.add(r.id);
        } else {
          aprobados.delete(r.id);
        }
        desbloquearRamos();
      }
    });

    const semestreDiv = document.querySelector(`.s${r.semestre}`);
    semestreDiv.appendChild(div);
  });

  desbloquearRamos();
});
