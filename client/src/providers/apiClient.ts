import { apiURL } from '../config'
import axios from 'axios'

export const apiDevTree = axios.create({
    baseURL: apiURL,
    timeout: 6000,
    withCredentials: true
})
