import axios from "axios";

import { ResponseHeroe } from "../models/ResponseHeroe";

export const fetchData = (pageLoading: number): Promise<ResponseHeroe> => {
  return axios
    .get(`https://rickandmortyapi.com/api/character/?page=${pageLoading}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.message);
      return []; // Возвращаем пустой массив в случае ошибки
    });
};
