import axios from './axios';
import { searchForm, galleryEl, loadMoreBut } from './elements';
import { API_KEY } from './axios';
import { markupUserGallery } from './markup-gallery';

searchForm.addEventListener('submit', handleQuery);
loadMoreBut.addEventListener('click', loadMoreItems);
function handleQuery(evt) {
  evt.preventDefault();
  clearGallery();
  const inputEl = searchForm.elements.searchQuery;
  if (!inputEl.value) return;
  else {
    getUserSearch(inputEl.value);
  }
}
let searchParams;
function getUserSearch(data) {
  searchParams = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    webformatWidth: 340,
    per_page: 40,
  });
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
function loadMoreItems(evt) {
  evt.preventDefault();
}
