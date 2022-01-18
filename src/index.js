import './sass/main.scss';
import Feach from './searchImage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import template from './template.hbs';
import Notiflix from 'notiflix';
import axios from 'axios';
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const feach = new Feach();
const btn = document.querySelector('.load-more');
let iterator = 40;
btn.addEventListener('click', clickButton);

function clickButton() {
  feach.increment();
  feach.searchImage().then(data => {
    iterator = 40 + iterator;

    if (iterator >= data.totalHits) {
      Notiflix.Report.warning(`We're sorry, but you've reached the end of search results.`);
      btn.classList.add('is-hidden');
    }

    const markup = template(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
  });
}

form.addEventListener('submit', formSubmit);

function formSubmit(e) {
  e.preventDefault();
  feach.resetPage();
  gallery.innerHTML = '';
  const inputEl = input.value.trim();
  feach.inputValue = inputEl;
  if (inputEl === '') {
    gallery.innerHTML = '';

    return;
  }

  feach.searchImage().then(data => {
    if (feach.pages >= 1) {
      btn.classList.remove('is-hidden');
    }

    if (data.hits.length === 0) {
      btn.classList.add('is-hidden');
      gallery.innerHTML = '';
      console.log();
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );

      return;
    }

    const markup = template(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    let lightbox = new SimpleLightbox('.gallery a');
  });
}
