import axios from './axios';
import { searchForm } from './elements';
import { API_KEY } from './axios';
import { markupUserGallery } from './markup-gallery';
searchForm.addEventListener('submit', handleQuery);

function handleQuery(evt) {
  evt.preventDefault();
  const inputEl = searchForm.elements.searchQuery;
  if (!inputEl.value) return;
  else {
    getUserSearch(inputEl.value);
  }
}

function getUserSearch(data) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: data,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  axios
    .get(`?${searchParams}`)
    .then(res => {
      markupUserGallery(res);
    })
    .catch(error => console.log(error));
}
