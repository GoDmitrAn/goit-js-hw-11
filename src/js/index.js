import axios from './axios';
import { searchForm, galleryEl, loadMoreBut } from './elements';
import { API_KEY } from './axios';
import { markupUserGallery } from './markup-gallery';

searchForm.addEventListener('submit', onHandleQuery);
loadMoreBut.addEventListener('click', onLoadMore);
function onHandleQuery(evt) {
  evt.preventDefault();
  clearGallery();
  const inputEl = searchForm.elements.searchQuery;
  if (!inputEl.value) return;
  else {
    getUserSearch(inputEl.value);
  }
}
let userSearchParams;
function getUserSearch(data) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    webformatWidth: 340,
    per_page: 40,
  });
  userSearchParams = searchParams;
  axios
    .get(`?${searchParams}`)
    .then(response => {
      markupUserGallery(response);
    })
    .catch(error => {
      console.log(error);
    });
}
function clearGallery() {
  galleryEl.innerHTML = '';
}
function onLoadMore() {
  axios
    .get(`?${userSearchParams}`)
    .then(response => {
      markupUserGallery(response);
    })
    .catch(error => {
      console.log(error);
    });
}
