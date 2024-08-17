export function ProfileDropdownToggle() {
  const profileToggle = document.querySelector('.js-header-profile-toggle');
  const profileDropdown = document.querySelector('.header__profile-dropdown');
  const headerProfile = document.querySelector('.header__profile');

  if (!profileToggle || !profileDropdown || !headerProfile) return;

  function toggleDropdown() {
    profileToggle.classList.toggle('is-show');
  }

  function closeDropdown() {
    if (profileToggle.classList.contains('is-show')) {
      profileToggle.classList.remove('is-show');
    }
  }

  profileToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleDropdown();
  });

  document.addEventListener('click', (event) => {
    if (!headerProfile.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  });
}