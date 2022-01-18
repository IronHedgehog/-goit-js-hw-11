import './sass/main.scss';
import Feach from './searchImage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import template from './template.hbs';
import Notiflix from 'notiflix';
const form = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const feach = new Feach();
const btn = document.querySelector('.load-more');
let iterator = 40;
btn.addEventListener('click', clickButton);

async function clickButton() {
  feach.increment();
  const clickOnButtonSearch = await feach.searchImage();
  const fetchImage = clickOnButtonSearch.hits;
  const markup = template(fetchImage);
  gallery.insertAdjacentHTML('beforeend', markup);
  iterator = 40 + iterator;
  if (iterator >= clickOnButtonSearch.totalHits) {
    Notiflix.Report.warning(`We're sorry, but you've reached the end of search results.`);
    btn.classList.add('is-hidden');
  }
}

form.addEventListener('submit', formSubmit);

async function formSubmit(e) {
  e.preventDefault();
  feach.resetPage();
  gallery.innerHTML = '';
  const inputEl = input.value.trim();
  feach.inputValue = inputEl;
  if (inputEl === '') {
    gallery.innerHTML = '';
    return;
  }

  const image = await feach.searchImage();
  const renderImages = await image.hits;

  if (feach.pages >= 1) {
    btn.classList.remove('is-hidden');
  }

  if (renderImages.length === 0) {
    btn.classList.add('is-hidden');
    gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }

  const markup = template(renderImages);
  gallery.insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery a');
}
