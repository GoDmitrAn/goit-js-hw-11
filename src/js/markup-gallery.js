import { galleryEl } from './elements';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/common.css';
let lightbox = new SimpleLightbox('.gallery a', {
  /* options */
});

export function markupUserGallery(response) {
  const serverData = response.data;
  const fullTemplate = serverData.hits
    .map(item => {
      return createGalleryItem({ ...item });
    })
    .join('');

  renderGallery(fullTemplate);
  lightbox.refresh();
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
export { Notiflix };
