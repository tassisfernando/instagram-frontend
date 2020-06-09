import axios from 'axios';

//cria uma referência para a API indicada na URL base
const api = axios.create({
    baseURL: 'http://localhost:3333/',
});

export default api;