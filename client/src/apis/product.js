import axios from '../axios';

export const getAllProducts = (params) => axios({
    url: '/product',
    method: 'GET',
    params
});