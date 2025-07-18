const ramos = [
  // SEMESTRE I
  { id: "quimica", nombre: "Química", semestre: 1 },
  { id: "biologia", nombre: "Biología", semestre: 1 },
  { id: "bases1", nombre: "Bases Teóricas de la Enfermería I", semestre: 1 },
  { id: "auxilios", nombre: "Primeros Auxilios", semestre: 1 },
  { id: "psico", nombre: "Psicología Evolutiva", semestre: 1 },
  { id: "ingles1", nombre: "Inglés I", semestre: 1 },

  // SEMESTRE II
  { id: "bioquimica", nombre: "Bioquímica", semestre: 2, prereqs: ["quimica"] },
  { id: "morfo1", nombre: "Morfofunción I", semestre: 2, prereqs: ["biologia"] },
  { id: "bases2", nombre: "Bases Teóricas de la Enfermería II", semestre: 2, prereqs: ["bases1"] },
  { id: "comunicacion", nombre: "Comunicación y Educación en Salud", semestre: 2 },
  { id: "ingles2", nombre: "Inglés II", semestre: 2, prereqs: ["ingles1"] },
  { id: "cfg1", nombre: "CFG I", semestre: 2 },

  // SEMESTRE III
  { id: "micro", nombre: "Microbiología Integrada", semestre: 3, prereqs: ["bioquimica", "morfo1"] },
  { id: "morfo2", nombre: "Morfofunción II", semestre: 3, prereqs: ["morfo1"] },
  { id: "cuidados1", nombre: "Cuidados de Enfermería I", semestre: 3, prereqs: ["bases2"] },
  { id: "genericas", nombre: "Competencias Genéricas", semestre: 3 },
  { id: "ingles3", nombre: "Inglés III", semestre: 3, prereqs: ["ingles2"] },

  // SEMESTRE IV
  { id: "farmaco", nombre: "Farmacología en Enfermería", semestre: 4, prereqs: ["bioquimica", "morfo2"] },
  { id: "fisio", nombre: "Fisiopatología en Enfermería", semestre: 4, prereqs: ["morfo2", "micro"] },
  { id: "cuidados2", nombre: "Cuidados de Enfermería II", semestre: 4, prereqs: ["cuidados1"] },
  { id: "mental", nombre: "Enfermería en Salud Mental", semestre: 4, prereqs: ["cuidados1", "psico"] },
  { id: "bioestadistica", nombre: "Bioestadística", semestre: 4 },
  { id: "cfg2", nombre: "CFG II", semestre: 4 },

  // SEMESTRE V
  { id: "gestionhosp", nombre: "Gestión Cuidado Hospitalaria", semestre: 5, prereqs: ["cuidados2", "farmaco", "fisio"] },
  { id: "psiquiatria", nombre: "Enfermería en Psiquiatría", semestre: 5, prereqs: ["mental", "fisio"] },
  { id: "bioetica", nombre: "Bioética y Legislación", semestre: 5 },
  { id: "saludpublica", nombre: "Salud Pública", semestre: 5, prereqs: ["comunicacion"] },
  { id: "cfg3", nombre: "CFG III", semestre: 5 },

  // SEMESTRE VI
  { id: "gestioncomu1", nombre: "Gestión del Cuidado en la Comunidad I", semestre: 6, prereqs: ["saludpublica", "gestionhosp"] },
  { id: "adultomayor", nombre: "Enfermería Adulto Mayor", semestre: 6, prereqs: ["fisio", "gestionhosp"] },
  { id: "evidencia", nombre: "Enfermería Basada en Evidencia", semestre: 6, prereqs: ["bioestadistica"] },
  { id: "liderazgo", nombre: "Gestión y Liderazgo", semestre: 6, prereqs: ["bioetica"] },
  { id: "cfg4", nombre: "CFG IV", semestre: 6 },

  // SEMESTRE VII
  { id: "gestioncomu2", nombre: "Gestión Cuidado Comunidad II", semestre: 7, prereqs: ["gestioncomu1"] },
  { id: "proyectos", nombre: "Seguridad y Proyectos", semestre: 7, prereqs: ["liderazgo"] },
  { id: "investigacion1", nombre: "Metodología Investigación I", semestre: 7, prereqs: ["evidencia"] },
  { id: "opt1", nombre: "Optativo I", semestre: 7 },

  // SEMESTRE VIII
  { id: "gestioninfanto", nombre: "Gestión Cuidado Infanto-Juvenil", semestre: 8, prereqs: ["gestionhosp", "gestioncomu2"] },
  { id: "urgencias", nombre: "Unidades Críticas y Urgencias", semestre: 8, prereqs: ["fisio", "gestioninfanto"] },
  { id: "investigacion2", nombre: "Metodología Investigación II", semestre: 8, prereqs: ["investigacion1"] },
  { id: "integrativa", nombre: "Medicina Integrativa", semestre: 8 },
  { id: "opt2", nombre: "Optativo II", semestre: 8 },

  // SEMESTRE IX
  { id: "internado1", nombre: "Internado Comunitario", semestre: 9, prereqs: ["gestioncomu2"] },
  { id: "internado2", nombre: "Internado Unidades Críticas", semestre: 9, prereqs: ["urgencias"] },

  // SEMESTRE X
  { id: "internado3", nombre: "Internado Intrahospitalario", semestre: 10, prereqs: ["internado1", "internado2"] },
];

const estado = {};

function puedeHabilitar(ramo) {
  if (!ramo.prereqs) return true;
  return ramo.prereqs.every(id => estado[id]);
}

function actualizar() {
  document.getElementById("malla").innerHTML = "";
  for (let s = 1; s <= 10; s++) {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h2>Semestre ${s}</h2>`;
    ramos.filter(r => r.semestre === s).forEach(ramo => {
      const btn = document.createElement("div");
      btn.className = "ramo";
      btn.innerText = ramo.nombre;
      if (estado[ramo.id]) btn.classList.add("aprobado");
      else if (puedeHabilitar(ramo)) btn.classList.add("habilitado");
      else btn.classList.add("inactivo");

      btn.onclick = () => {
        if (!puedeHabilitar(ramo)) return;
        estado[ramo.id] = !estado[ramo.id];
        actualizar();
      };

      semDiv.appendChild(btn);
    });
    document.getElementById("malla").appendChild(semDiv);
  }
}

actualizar();
