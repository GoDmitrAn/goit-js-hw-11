import axios from './axios';
import { searchForm, galleryEl, loadMoreBut, inputEl } from './elements';
import { markupUserGallery } from './markup-gallery';
import Notiflix from 'notiflix';
Notiflix.Notify.init({
  width: '380px',
  position: 'left-top',
  distance: '10px',
  timeout: 2500,
});

loadMoreBut.style.display = 'none';
let pageNumber = 1;
let totalPages;
searchForm.addEventListener('submit', onHandleQuery);
loadMoreBut.addEventListener('click', onLoadMore);
function onHandleQuery(evt) {
  evt.preventDefault();
  clearGallery();
  loadMoreBut.style.display = 'none';

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
    const resObj = response.data;

    if (Number(resObj.total) == 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    markupUserGallery(response);
    totalPages = Math.ceil(resObj.totalHits / resObj.hits.length);
    Notiflix.Notify.success(`Hooray! We found ${resObj.totalHits} images.`);
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

    markupUserGallery(response);
    if (pageNumber == totalPages) {
      loadMoreBut.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    pageNumber += 1;
  } catch (error) {
    console.error(error);
  }
}
