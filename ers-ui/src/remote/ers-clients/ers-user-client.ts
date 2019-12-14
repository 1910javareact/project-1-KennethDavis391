import axios from 'axios'

export const ersUserClient = axios.create({
    baseURL: 'http://3.88.86.151:9001',
    headers: {
        'Content-Type':'application/json'
    },
    withCredentials:true
})