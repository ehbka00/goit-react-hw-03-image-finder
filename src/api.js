import axios from 'axios';

const apiKey = '40398255-003f5e3643d0e18d6c44c1878';

axios.defaults.baseURL = 'https://pixabay.com/';

export const getGalleryItems = (str, page) => {
  return axios.get('/api/', {
    params: {
      q: str,
      key: apiKey,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page: page,
    },
  });
};
