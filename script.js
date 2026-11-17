// Menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const ouvert = nav.classList.toggle('ouvert');
  burger.setAttribute('aria-expanded', ouvert);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('ouvert');
  burger.setAttribute('aria-expanded', 'false');
}));

// Ombre de l'en-tête au défilement
const entete = document.querySelector('.entete');
const majEntete = () => entete.classList.toggle('defile', window.scrollY > 10);
window.addEventListener('scroll', majEntete, { passive: true });
majEntete();

// Apparition douce des blocs
const aAnimer = document.querySelectorAll('.tete-section, .carte, .produit, .etape, .secteur, .valeur');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  aAnimer.forEach(el => el.classList.add('cache'));
  const obs = new IntersectionObserver(entrees => {
    entrees.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  aAnimer.forEach(el => obs.observe(el));
}

// Formulaire de contact : ouvre la messagerie avec le message prérempli
document.getElementById('formulaire').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const sujet = `[Site] ${f.get('sujet')} — ${f.get('nom')}`;
  const corps = `Nom : ${f.get('nom')}\nE-mail : ${f.get('email')}\nEntreprise : ${f.get('entreprise') || '-'}\n\n${f.get('message')}`;
  window.location.href = `mailto:yeesaltech@gmail.com?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
});

document.getElementById('annee').textContent = new Date().getFullYear();
