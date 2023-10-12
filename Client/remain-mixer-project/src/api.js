import axios from 'axios';

export const getTankAll = (pagination,tankType) => {
    const {page,perPage} = pagination
    const url = `http://localhost:4444/api/tankall?page=${page}&perPage=${perPage}&type=${tankType}`
    const res = axios.get(url)
    return res
}
export const getTankAll2 = () => {
    const url = `http://localhost:4444/api/tankall2`
    const res = axios.get(url)
    return res
}
export const getTankType = () => {
    const url = `http://localhost:4444/api/tanktype`
    const res = axios.get(url)
    return res
}