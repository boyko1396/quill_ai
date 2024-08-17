class HeaderBtnToggle {
  constructor() {
    this.burgerButton = document.querySelector('.js-header-toggle');
    this.body = document.body;
    this.headerNav = document.querySelector('.header__dropdown');
    this.overlay = document.querySelector('.js-header-toggle-close');
    
    if (this.burgerButton) {
      this.burgerButton.addEventListener('click', () => this.toggleMenu());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMenu());
    }
  }
  
  toggleMenu() {
    this.burgerButton.classList.toggle('is-active');
    this.body.classList.toggle('is-menu-opened');
    this.headerNav.classList.toggle('is-show');
    this.overlay.classList.toggle('is-visible');
  }

  closeMenu() {
    if (this.burgerButton) {
      this.burgerButton.classList.remove('is-active');
    }
    this.body.classList.remove('is-menu-opened');
    this.headerNav.classList.remove('is-show');
    this.overlay.classList.remove('is-visible');
  }
}

export default HeaderBtnToggle;