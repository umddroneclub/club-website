export function mobileMenu() {
 document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-icon');
    const navLinks = document.getElementsByClassName('mobile-nav');

    if (!hamburger || !navLinks) return;

    hamburger?.addEventListener('click', () => {
      for (const navLink of navLinks){
        navLink?.classList.toggle('open');
      }
      hamburger?.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
  });
}