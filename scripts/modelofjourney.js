// ===== DATA POPUP TIMELINE =====
// Ganti "link" dengan URL asli kamu (portofolio, GitHub, LinkedIn, dsb).
// Kosongkan link: "" kalau tahap itu tidak punya link tujuan (tombol link otomatis disembunyikan).
const popupData = {
  1: {
    title: "Built Apps, Learned How Users Think",
    desc: "Started as a lab assistant building Flutter and Android apps, learning how users interact with software from the ground up. Culminated in a geofencing application for my thesis — research that required precision in both logic and user behavior.",
    link: "" // contoh: "https://github.com/username/geofencing-thesis"
  },
  2: {
    title: "Managed Real Client Projects Solo",
    desc: "Took on freelance mobile projects independently, handling full delivery from requirement to release. Managing client expectations taught me where quality often breaks down first.",
    link: ""
  },
  3: {
    title: "Saw the Gaps, Decided to Fix Them",
    desc: "Working in development exposed the real cost of poor testing. I made a deliberate move to QA — not away from engineering, but deeper into it.",
    link: ""
  },
  4: {
    title: "Now: QA in High-Stakes B2B",
    desc: "1+ year as a QA Engineer in a B2B IT product environment, where thoroughness and risk assessment directly impact enterprise clients.",
    link: "" // contoh: "https://linkedin.com/in/username"
  }
};


// ===== FUNGSI POPUP =====
function openPopup(id) {
  const data = popupData[id];
  document.getElementById('popup-title').textContent = data.title;
  document.getElementById('popup-desc').textContent = data.desc;

//   const linkEl = document.getElementById('popup-link');
//   if (data.link) {
//     linkEl.href = data.link;
//     linkEl.style.display = 'inline-block';
//   } else {
//     linkEl.style.display = 'none';
//   }
  document.getElementById('popup-overlay').classList.add('active');
}

function closePopup() {
  document.getElementById('popup-overlay').classList.remove('active');
}