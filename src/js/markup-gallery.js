import Notiflix from 'notiflix';
import { galleryEl } from './elements';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

Notiflix.Notify.init({
  width: '380px',
  position: 'left-top',
  distance: '10px',
  timeout: 2500,
});

export function markupUserGallery(response) {
  const serverData = response.data;
  if (Number(serverData.total) == 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.success(`Hooray! We found ${serverData.totalHits} images.`);
    const fullTemplate = serverData.hits
      .map(item => {
        return createGalleryItem({ ...item });
      })
      .join('');

    renderGallery(fullTemplate);
    lightbox.refresh();
  }
}
function createGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  const template = `<a href=${largeImageURL} class="gallery__item"><div class="photo-card">
    <img src=${webformatURL} alt=${tags} loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
    </div></a>`;
  return template;
}
function renderGallery(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
