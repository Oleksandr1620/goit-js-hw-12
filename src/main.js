// main.js
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input[name="search-text"]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.btn'),
};

let page = 1;
let per_page = 15;
let currentQuery = '';
let loadedImages = 0;
let totalHits = 0;

refs.loadMoreBtn.classList.add('is-hidden');

refs.form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = refs.input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  refs.input.value = '';

  page = 1;
  loadedImages = 0;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    totalHits = data.totalHits;
    loadedImages = data.hits.length;

    createGallery(data.hits);

    if (loadedImages < totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    hideLoader();

    createGallery(data.hits);

    loadedImages += data.hits.length;

    // Плавна прокрутка після додавання нових карток
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    // Кінець колекції
    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      return;
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Unable to load more images.',
      position: 'topRight',
    });
  }
});
