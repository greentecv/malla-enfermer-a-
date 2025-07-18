const ramos = [
  { id: "quimica", nombre: "Química", semestre: 1, prereq: [] },
  { id: "biologia", nombre: "Biología", semestre: 1, prereq: [] },
  { id: "bases1", nombre: "Bases Teóricas de la Enfermería I", semestre: 1, prereq: [] },
  { id: "auxilios", nombre: "Primeros Auxilios", semestre: 1, prereq: [] },
  { id: "psicologia", nombre: "Psicología Evolutiva", semestre: 1, prereq: [] },
  { id: "ingles1", nombre: "Inglés I", semestre: 1, prereq: [] },

  { id: "bioquimica", nombre: "Bioquímica", semestre: 2, prereq: ["quimica"] },
  { id: "morfo1", nombre: "Morfofunción I", semestre: 2, prereq: ["biologia"] },
  { id: "bases2", nombre: "Bases Teóricas de la Enfermería II", semestre: 2, prereq: ["bases1"] },
  { id: "comunicacion", nombre: "Comunicación y Educación en Salud", semestre: 2, prereq: [] },
  { id: "ingles2", nombre: "Inglés II", semestre: 2, prereq: ["ingles1"] },
  { id: "cfg1", nombre: "CFG I", semestre: 2, prereq: [] },

  { id: "microbio", nombre: "Microbiología Integrada", semestre: 3, prereq: ["bioquimica", "morfo1"] },
  { id: "morfo2", nombre: "Morfofunción II", semestre: 3, prereq: ["morfo1"] },
  { id: "cuidados1", nombre: "Cuidados de Enfermería I", semestre: 3, prereq: ["bases2"] },
  { id: "competencias", nombre: "Competencias genéricas para el desarrollo profesional", semestre: 3, prereq: [] },
  { id: "ingles3", nombre: "Inglés III", semestre: 3, prereq: ["ingles2"] },

  { id: "farmaco", nombre: "Farmacología en Enfermería", semestre: 4, prereq: ["bioquimica", "morfo2"] },
  { id: "fisio", nombre: "Fisiopatología en Enfermería", semestre: 4, prereq: ["morfo2", "microbio"] },
  { id: "cuidados2", nombre: "Cuidados de Enfermería II", semestre: 4, prereq: ["cuidados1"] },
  { id: "saludmental", nombre: "Enfermería en Salud Mental", semestre: 4, prereq: ["cuidados1", "psicologia"] },
  { id: "bioestadistica", nombre: "Bioestadística", semestre: 4, prereq: [] },
  { id: "cfg2", nombre: "CFG II", semestre: 4, prereq: [] },

  { id: "gestionhosp", nombre: "Gestión del Cuidado en el área hospitalaria", semestre: 5, prereq: ["cuidados2", "farmaco", "fisio"] },
  { id: "psiquiatria", nombre: "Enfermería en Psiquiatría", semestre: 5, prereq: ["saludmental", "fisio"] },
  { id: "bioetica", nombre: "Bioética y Legislación en Enfermería", semestre: 5, prereq: [] },
  { id: "saludpublica", nombre: "Salud Pública", semestre: 5, prereq: ["comunicacion"] },
  { id: "cfg3", nombre: "CFG III", semestre: 5, prereq: [] },

  { id: "gestioncom1", nombre: "Gestión del Cuidado en la Comunidad I", semestre: 6, prereq: ["saludpublica", "gestionhosp"] },
  { id: "adulto", nombre: "Enfermería del Adulto Mayor y Psicogeriatría", semestre: 6, prereq: ["fisio", "gestionhosp"] },
  { id: "evidencia", nombre: "Enfermería basada en Evidencia", semestre: 6, prereq: ["bioestadistica"] },
  { id: "liderazgo", nombre: "Gestión y Liderazgo en Enfermería", semestre: 6, prereq: ["bioetica"] },
  { id: "cfg4", nombre: "CFG IV", semestre: 6, prereq: [] },

  { id: "gestioncom2", nombre: "Gestión del Cuidado en la Comunidad II", semestre: 7, prereq: ["gestioncom1"] },
  { id: "seguridad", nombre: "Cuidado, Seguridad y Gestión de Proyectos en Enfermería", semestre: 7, prereq: ["liderazgo"] },
  { id: "investigacion1", nombre: "Metodología de la Investigación I", semestre: 7, prereq: ["evidencia"] },
  { id: "opt1", nombre: "Optativo I", semestre: 7, prereq: [] },

  { id: "gestioninf", nombre: "Gestión del Cuidado Intra-hospitalario Infanto-juvenil", semestre: 8, prereq: ["gestionhosp", "gestioncom2"] },
  { id: "cuidadoscriticos", nombre: "Cuidados de Enfermería a personas en Unidades Críticas y de Urgencias", semestre: 8, prereq: ["fisio", "gestioninf"] },
  { id: "investigacion2", nombre: "Metodología de la Investigación II", semestre: 8, prereq: ["investigacion1"] },
  { id: "medicinainteg", nombre: "Enfermería y Medicina Integrativa", semestre: 8, prereq: [] },
  { id: "opt2", nombre: "Optativo II", semestre: 8, prereq: [] },

  { id: "internado1", nombre: "Internado Comunitario", semestre: 9, prereq: ["gestioncom2"] },
  { id: "internado2", nombre: "Internado en Unidades Críticas y de Urgencias", semestre: 9, prereq: ["cuidadoscriticos"] },

  { id: "internado3", nombre: "Internado Intrahospitalario", semestre: 10, prereq: ["internado1", "internado2"] },
];

const aprobados = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (let semestre = 1; semestre <= 10; semestre++) {
    const bloque = document.createElement("div");
    bloque.className = "semestre";
    bloque.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    ramos
      .filter((r) => r.semestre === semestre)
      .forEach((r) => {
        const ramoEl = document.createElement("div");
        ramoEl.id = r.id;
        ramoEl.className = "ramo";
        ramoEl.innerText = r.nombre;

        const desbloqueado = r.prereq.every((id) => aprobados.has(id));
        if (!desbloqueado) ramoEl.classList.add("disabled");

        if (aprobados.has(r.id)) ramoEl.classList.add("aprobado");

        ramoEl.onclick = () => {
          if (ramoEl.classList.contains("disabled")) return;
          aprobados.add(r.id);
          crearMalla();
        };

        bloque.appendChild(ramoEl);
      });

    contenedor.appendChild(bloque);
  }
}

function aprobarTodo() {
  ramos.forEach((r) => aprobados.add(r.id));
  crearMalla();
}

crearMalla();
