import axios from './axios';
import { searchForm, galleryEl, loadMoreBut, inputEl } from './elements';

import { markupUserGallery } from './markup-gallery';
let pageNumber = 1;
let totalPages;
searchForm.addEventListener('submit', onHandleQuery);
loadMoreBut.addEventListener('click', onLoadMore);
function onHandleQuery(evt) {
  evt.preventDefault();
  clearGallery();
  //   const inputEl = searchForm.elements.searchQuery;
  if (!inputEl.value) return;
  else {
    getUserSearch(inputEl.value);
  }
}

function getUserSearch(data) {
  axios
    .get('', {
      params: {
        q: data,
      },
    })
    .then(response => {
      markupUserGallery(response);
      console.log(response);
      pageNumber = 2;
      // response.data
    })
    .catch(error => {
      console.log(error);
    });
}
function clearGallery() {
  galleryEl.innerHTML = '';
  pageNumber = 1;
}
function onLoadMore() {
  axios
    .get('', {
      params: {
        q: inputEl.value,
        page: pageNumber,
      },
    })
    .then(response => {
      console.log(response);

      markupUserGallery(response);
      pageNumber += 1;
    })
    .catch(error => {
      console.log(error);
    });
}
