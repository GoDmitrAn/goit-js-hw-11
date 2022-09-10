import { galleryEl } from './elements';
export function markupUserGallery(responce) {
  data = responce.data;
  itemsResponceArray = data.hits;
  //   console.log(data);
  console.log(itemsResponceArray);

  const fullTemplate = itemsResponceArray
    .map(item => {
      return createGalleryItem({ ...item });
    })
    .join('');
  console.log(fullTemplate);
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
