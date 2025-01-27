import axios from "axios";

axios.defaults.baseURL ='https://task-flow-drf-api-6a658d5dbfee.herokuapp.com/'

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();