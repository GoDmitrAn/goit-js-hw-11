import axios, { userUrl } from './axios';
// import { API_KEY } from './axios';
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

async function getUserSearch(data) {
  try {
    const response = await axios.get('/?', {
      params: {
        q: data,
      },
    });
    markupUserGallery(response);
    const resObj = response.data;
    totalPages = Math.ceil(resObj.totalHits / resObj.hits.length);
    if (pageNumber < totalPages) {
      loadMoreBut.style.display = 'block';
    }
    pageNumber += 1;
  } catch (error) {
    console.error(error);
  }
}
function clearGallery() {
  galleryEl.innerHTML = '';
  pageNumber = 1;
}
async function onLoadMore() {
  try {
    const response = await axios.get('/?', {
      params: {
        q: inputEl.value,
        page: pageNumber,
      },
    });
    if (pageNumber == totalPages) {
      loadMoreBut.style.display = 'none';
    }
    markupUserGallery(response);
    pageNumber += 1;
  } catch (error) {
    console.error(error);
  }
}
