import axios from 'axios'
export default {
    getAllCloudProducts:async(cb)=>{
        const {data} = await axios.get('/api/getAllCloudProducts')
        cb(data)
    },
    addCloudProduct:async(product,cb)=>{
        const {data} = await axios.post('/api/addCloudProduct',product)
        cb(data)
    }
}