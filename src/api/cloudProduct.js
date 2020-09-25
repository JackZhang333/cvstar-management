import axios from 'axios'
export default {
    getAllCloudProducts:async(cb)=>{
        const {data} = await axios.get('/api/getAllCloudProducts')
        cb(data)
    }
}