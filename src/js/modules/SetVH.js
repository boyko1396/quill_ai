export function SetVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

SetVH();

window.addEventListener('resize', SetVH);
window.addEventListener('orientationchange', SetVH);