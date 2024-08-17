/**
 * !(i)
 * The code is included in the final file only when a function is called, for example: FLSFunctions.spollers();
 * Or when the entire file is imported, for example: import "files/script.js";
 * Unused code does not end up in the final file.

 * If we want to add a module, we should uncomment it.
 */

import { SetVH } from './modules/SetVH.js';
import BaseHelpers from './helpers/BaseHelpers.js';
import HeaderBtnToggle from './modules/HeaderBtnToggle.js';
import { ProfileDropdownToggle } from './modules/ProfileDropdownToggle.js';
import { SmoothScroll } from './modules/SmoothScroll.js';
import { TimerTypingEffect } from './modules/TimerTypingEffect.js';
import PopupManager from './modules/PopupManager.js';
import FaqCard from './modules/FaqCard.js';
import { initPriceCalculator } from './modules/InitPriceCalculator.js';

// set vh
SetVH();

// check webp/loaded page/device type
BaseHelpers.checkWebpSupport();
BaseHelpers.addTouchClass();
BaseHelpers.addLoadedClass();

document.addEventListener('DOMContentLoaded', function() {
  // header nav mobile toggle
  new HeaderBtnToggle();
  // nav active anchor
  const smoothScroll = new SmoothScroll('.js-anchor', '--scroll-offset', 650);
  // profile toggle
  ProfileDropdownToggle();
  // modal init
  new PopupManager();
  // faq card
  new FaqCard();
  // price calculator
  initPriceCalculator();
});