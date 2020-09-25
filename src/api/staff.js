import axios from 'axios'
export default {
    getAllStaff:async(cb)=>{
        const {data} =await axios.get('/api/getAllStaff')
        cb(data)
    }
}