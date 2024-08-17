export function initPriceCalculator() {
  const form = document.querySelector('.aside-appeal__form');
  if (!form) return;

  const priceElement = form.querySelector('.js-aside-form-btn-price');
  if (!priceElement) return;

  function updatePrice() {
    let totalPrice = 0;
    const checkboxes = form.querySelectorAll('.u-checkbox__control');

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const price = parseFloat(checkbox.getAttribute('data-price')) || 0;
        totalPrice += price;
      }
    });

    priceElement.textContent = totalPrice;
  }

  updatePrice();

  form.addEventListener('change', event => {
    if (event.target.matches('.u-checkbox__control')) {
      updatePrice();
    }
  });
}