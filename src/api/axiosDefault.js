/**
 * Axios Configuration
 * 
 * This module configures Axios for making API requests to the Task Flow backend.
 * It sets the base URL, default headers, and credentials handling.
 * Two separate Axios instances (`axiosReq` and `axiosRes`) are created for 
 * making authenticated requests and handling responses.
 * 
 * Configuration:
 * - Base URL points to the Task Flow DRF API.
 * - Default `Content-Type` is set to `multipart/form-data` for file uploads.
 * - `withCredentials` is enabled to include cookies in requests.
 * 
 * Exports:
 * - `axiosReq`: Used for making API requests.
 * - `axiosRes`: Used for handling API responses.
 */

import axios from "axios";

axios.defaults.baseURL ='https://task-flow-drf-api-6a658d5dbfee.herokuapp.com/'

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();