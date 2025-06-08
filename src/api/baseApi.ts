import axios from 'axios';
import { API_ROUTES } from '../constants/routes';


export const baseApiAxios = axios.create({
  baseURL: API_ROUTES.BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
