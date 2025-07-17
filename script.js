// 1️⃣ Define los requisitos de cada ramo
const requisitos = {
  morfoII: ["morfofuncionI"],
  microbio: ["quimica", "bioquimica"],
  farmacologia: ["microbio"],
  fisiopatologia: ["morfofuncionII"],
  saludMental: ["bases2"],
  bioestadistica: ["bases1"],
  saludPublica: ["bioestadistica"],
  psiquiatria: ["saludMental"],
  cuidadoAdulto: ["farmacologia", "psiquiatria"],
  gestionHospital: ["cuidadoAdulto"],
  calidad: ["gestionHospital"],
  investigacionI: ["bioestadistica"],
  integrativa: ["investigacionI"],
  metodII: ["investigacionI"],
  // ... Agrega los demás requisitos ...
};

// 2️⃣ Al cargar, bloquea ramos que tienen requisitos
window.onload = function() {
  Object.keys(requisitos).forEach(ramoID => {
    document.getElementById(ramoID).classList.add("locked");
  });
};

// 3️⃣ Al hacer clic: aprobar y desbloquear
function toggleRamo(id) {
  const ramo = document.getElementById(id);
  if (ramo.classList.contains("locked")) return;

  ramo.classList.toggle("approved");

  // Revisa si algún ramo se desbloquea
  Object.entries(requisitos).forEach(([dest, reqs]) => {
    const destEl = document.getElementById(dest);
    const ready = reqs.every(r => document.getElementById(r).classList.contains("approved"));

    if (ready) {
      destEl.classList.remove("locked");
    } else {
      destEl.classList.add("locked");
    }
  });
}
