import axios from './axios';
import { searchForm, galleryEl, loadMoreBut, inputEl } from './elements';

import { markupUserGallery } from './markup-gallery';
loadMoreBut.style.display = 'none';
let pageNumber = 1;
let totalPages;
searchForm.addEventListener('submit', onHandleQuery);
loadMoreBut.addEventListener('click', onLoadMore);
function onHandleQuery(evt) {
  evt.preventDefault();
  clearGallery();

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
      const resObj = response.data;
      totalPages = Math.ceil(resObj.totalHits / resObj.hits.length);
      if (pageNumber < totalPages) {
        loadMoreBut.style.display = 'block';
      }

      pageNumber += 1;
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
      if (pageNumber == totalPages) {
        loadMoreBut.style.display = 'none';
      }

      markupUserGallery(response);
      pageNumber += 1;
    })
    .catch(error => {
      console.log(error);
    });
}
