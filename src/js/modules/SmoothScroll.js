export class SmoothScroll {
  constructor(selector, offsetVar, duration) {
    this.links = document.querySelectorAll(selector);
    this.offsetVar = offsetVar;
    this.duration = duration;
    this.init();
    this.handlePageLoad();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (event) => {
        this.handleClick(event);
      });
    });
  }

  handleClick(event) {
    const targetId = event.currentTarget.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      let offsetTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue(this.offsetVar));

      offsetTop -= this.convertRemToPixels(2);

      this.scrollTo(target, offsetTop);
      this.removeClasses();
    }
  }

  scrollTo(target, offsetTop) {
    const start = window.pageYOffset;
    const end = target.offsetTop - offsetTop;
    const change = end - start;
    let currentTime = 0;
    const increment = 20;

    const animateScroll = () => {
      currentTime += increment;
      const val = this.easeInOutQuad(currentTime, start, change, this.duration);
      window.scrollTo(0, val);
      if (currentTime < this.duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  removeClasses() {
    document.body.classList.remove('is-menu-opened');
    
    const dropdown = document.querySelector('.header__dropdown');
    const toggles = document.querySelectorAll('.header__toggle');

    if (dropdown) {
      dropdown.classList.remove('is-show');
    }

    toggles.forEach(toggle => {
      toggle.classList.remove('is-active');
    });
  }

  handlePageLoad() {
    const hash = window.location.hash;

    if (hash) {
      const target = document.querySelector(hash);

      if (target) {
        let offsetTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue(this.offsetVar));

        offsetTop -= this.convertRemToPixels(2);

        window.setTimeout(() => {
          this.scrollTo(target, offsetTop);
        }, 0);
      }
    }
  }
}
