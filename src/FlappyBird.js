import PageManager from './PageManager';

document.addEventListener('DOMContentLoaded', () => {
  const $el = $('#flappy');
  window.page = new PageManager($el);
});
