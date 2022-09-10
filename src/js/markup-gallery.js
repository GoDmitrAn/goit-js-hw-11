import Notiflix from 'notiflix';
import { galleryEl } from './elements';

Notiflix.Notify.init({
  width: '380px',
  position: 'left-top',
  distance: '10px',
  timeout: 1500,
});
export function markupUserGallery(responce) {
  data = responce.data;
  if (data.total == 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  itemsResponceArray = data.hits;
  console.log(data.total);
  console.log(itemsResponceArray.length);

  const fullTemplate = itemsResponceArray
    .map(item => {
      return createGalleryItem({ ...item });
    })
    .join('');
  //   console.log(fullTemplate);
  renderGallery(fullTemplate);
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
  const template = `<div class="photo-card">
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
    </div>`;
  return template;
}
function renderGallery(markup) {
  galleryEl.insertAdjacentHTML('beforeend', markup);
}
