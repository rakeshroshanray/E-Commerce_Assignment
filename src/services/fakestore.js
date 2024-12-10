import axios from 'axios';

const API = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  const { data } = await axios.get(`${API}/products`);
  return data;
};


export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API}/products/${id}`);
  return data;
};


export const fetchCategories = async () => {
  const { data } = await axios.get(`${API}/products/categories`);
  return data;
};
