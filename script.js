const ramos = [
  { nombre: "Química", semestre: 1, requisitos: [] },
  { nombre: "Biología", semestre: 1, requisitos: [] },
  { nombre: "Bases Teóricas de la Enfermería I", semestre: 1, requisitos: [] },
  { nombre: "Primeros Auxilios", semestre: 1, requisitos: [] },
  { nombre: "Psicología Evolutiva", semestre: 1, requisitos: [] },
  { nombre: "Inglés I", semestre: 1, requisitos: [] },
  { nombre: "Bioquímica", semestre: 2, requisitos: ["Química"] },
  { nombre: "Morfofunción I", semestre: 2, requisitos: ["Biología"] },
  { nombre: "Bases Teóricas de la Enfermería II", semestre: 2, requisitos: ["Bases Teóricas de la Enfermería I"] },
  { nombre: "Comunicación y Educación en Salud", semestre: 2, requisitos: [] },
  { nombre: "Inglés II", semestre: 2, requisitos: ["Inglés I"] },
  { nombre: "CFG I", semestre: 2, requisitos: [] },
  { nombre: "Microbiología Integrada", semestre: 3, requisitos: ["Bioquímica", "Morfofunción I"] },
  { nombre: "Morfofunción II", semestre: 3, requisitos: ["Morfofunción I"] },
  { nombre: "Cuidados de Enfermería I", semestre: 3, requisitos: ["Bases Teóricas de la Enfermería II"] },
  { nombre: "Competencias genéricas para el desarrollo profesional", semestre: 3, requisitos: [] },
  { nombre: "Inglés III", semestre: 3, requisitos: ["Inglés II"] },
  { nombre: "Farmacología en Enfermería", semestre: 4, requisitos: ["Bioquímica", "Morfofunción II"] },
  { nombre: "Fisiopatología en Enfermería", semestre: 4, requisitos: ["Morfofunción II", "Microbiología Integrada"] },
  { nombre: "Cuidados de Enfermería II", semestre: 4, requisitos: ["Cuidados de Enfermería I"] },
  { nombre: "Enfermería en Salud Mental", semestre: 4, requisitos: ["Cuidados de Enfermería I", "Psicología Evolutiva"] },
  { nombre: "Bioestadística", semestre: 4, requisitos: [] },
  { nombre: "CFG II", semestre: 4, requisitos: [] },
  { nombre: "Gestión del Cuidado en el área hospitalaria", semestre: 5, requisitos: ["Cuidados de Enfermería II", "Farmacología en Enfermería", "Fisiopatología en Enfermería"] },
  { nombre: "Enfermería en Psiquiatría", semestre: 5, requisitos: ["Enfermería en Salud Mental", "Fisiopatología en Enfermería"] },
  { nombre: "Bioética y Legislación en Enfermería", semestre: 5, requisitos: [] },
  { nombre: "Salud Pública", semestre: 5, requisitos: ["Comunicación y Educación en Salud"] },
  { nombre: "CFG III", semestre: 5, requisitos: [] },
  { nombre: "Gestión del Cuidado en la Comunidad I", semestre: 6, requisitos: ["Salud Pública", "Gestión del Cuidado en el área hospitalaria"] },
  { nombre: "Enfermería del Adulto Mayor y Psicogeriatría", semestre: 6, requisitos: ["Fisiopatología en Enfermería", "Gestión del Cuidado en el área hospitalaria"] },
  { nombre: "Enfermería basada en Evidencia", semestre: 6, requisitos: ["Bioestadística"] },
  { nombre: "Gestión y Liderazgo en Enfermería", semestre: 6, requisitos: ["Bioética y Legislación en Enfermería"] },
  { nombre: "CFG IV", semestre: 6, requisitos: [] },
  { nombre: "Gestión del Cuidado en la Comunidad II", semestre: 7, requisitos: ["Gestión del Cuidado en la Comunidad I"] },
  { nombre: "Cuidado, Seguridad y Gestión de Proyectos en Enfermería", semestre: 7, requisitos: ["Gestión y Liderazgo en Enfermería"] },
  { nombre: "Metodología de la Investigación I", semestre: 7, requisitos: ["Enfermería basada en Evidencia"] },
  { nombre: "Optativo I", semestre: 7, requisitos: [] },
  { nombre: "Gestión del Cuidado Intra-hospitalario Infanto-juvenil", semestre: 8, requisitos: ["Gestión del Cuidado en el área hospitalaria", "Gestión del Cuidado en la Comunidad II"] },
  { nombre: "Cuidados de Enfermería a personas en Unidades Críticas y de Urgencias", semestre: 8, requisitos: ["Fisiopatología en Enfermería", "Gestión del Cuidado Intra-hospitalario Infanto-juvenil"] },
  { nombre: "Metodología de la Investigación II", semestre: 8, requisitos: ["Metodología de la Investigación I"] },
  { nombre: "Enfermería y Medicina Integrativa", semestre: 8, requisitos: [] },
  { nombre: "Optativo II", semestre: 8, requisitos: [] },
  { nombre: "Internado Comunitario", semestre: 9, requisitos: ["Gestión del Cuidado en la Comunidad II"] },
  { nombre: "Internado en Unidades Críticas y de Urgencias", semestre: 9, requisitos: ["Cuidados de Enfermería a personas en Unidades Críticas y de Urgencias"] },
  { nombre: "Internado Intrahospitalario", semestre: 10, requisitos: ["Internado Comunitario", "Internado en Unidades Críticas y de Urgencias"] }
];

const estado = {};

function crearTarjeta(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.innerText = ramo.nombre;
  div.dataset.nombre = ramo.nombre;
  
  div.onclick = () => {
    if (!div.classList.contains("bloqueado")) {
      estado[ramo.nombre] = !estado[ramo.nombre];
      actualizar();
    }
  };
  return div;
}

function actualizar() {
  document.getElementById("grid").innerHTML = "";
  for (let s = 1; s <= 10; s++) {
    const col = document.createElement("div");
    col.className = "semestre";
    const h2 = document.createElement("h2");
    h2.innerText = `Semestre ${s}`;
    col.appendChild(h2);

    ramos.filter(r => r.semestre === s).forEach(r => {
      const tarjeta = crearTarjeta(r);
      const aprobado = estado[r.nombre];
      const habilitado = r.requisitos.every(req => estado[req]);

      if (aprobado) tarjeta.classList.add("aprobado");
      else if (!habilitado) tarjeta.classList.add("bloqueado");

      col.appendChild(tarjeta);
    });

    document.getElementById("grid").appendChild(col);
  }
}

actualizar();
