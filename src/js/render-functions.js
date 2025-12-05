// js/render-functions.js
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn');

// Ініціалізуємо SimpleLightbox для делегування (він працює з .gallery a)
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="info">
          <p><b>Likes</b> ${likes}</p>
          <p><b>Views</b> ${views}</p>
          <p><b>Comments</b> ${comments}</p>
          <p><b>Downloads</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  // Додаємо всі нові елементи в DOM однією операцією
  galleryContainer.insertAdjacentHTML('beforeend', markup);

  // Оновлюємо simplelightbox (щоб він бачив нові посилання)
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader?.classList.add('is-active');
}

export function hideLoader() {
  loader?.classList.remove('is-active');
}

export function showLoadMoreButton() {
  loadMoreBtn?.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn?.classList.add('is-hidden');
}
