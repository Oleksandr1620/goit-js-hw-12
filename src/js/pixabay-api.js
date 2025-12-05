import axios from 'axios';

const API_KEY = '53389893-16eb2ee6e433eb21b924fd0ec';
const BASE_URL = 'https://pixabay.com/api/';

export const PER_PAGE = 15;

export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: PER_PAGE,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
