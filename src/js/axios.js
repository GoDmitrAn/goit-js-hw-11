import axios from 'axios';

// const API_KEY = '29803459-7bbf23c9535da6931824006b9';
const instance = axios.create({
  baseURL: `https://pixabay.com/api`,
  params: {
    key: '29803459-7bbf23c9535da6931824006b9',
    // q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  },
});
export default instance;
// export { API_KEY };
