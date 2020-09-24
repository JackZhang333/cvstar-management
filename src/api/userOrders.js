import axios from 'axios'
export default {
    getUserOrders:async(cb)=>{
        const {data} = await axios.get('/api/getAllCheckOrders')
        cb(data)
    }
}