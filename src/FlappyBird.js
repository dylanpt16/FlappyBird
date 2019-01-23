import PageManager from './PageManager';
import $ from '../lib/jquery-3.3.1.slim.min.js';

document.addEventListener('DOMContentLoaded', () => {
  window.$ = $;
  const $el = $('#flappy');
  window.page = new PageManager($el);
});
