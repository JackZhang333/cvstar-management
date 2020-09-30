import axios from 'axios'
export default {
    getAllCloudProducts:async(offSet,limit,cb)=>{
        const {data} = await axios.post('/api/getAllCloudProducts/',{offSet,limit})
        cb(data)
    },
    addCloudProduct:async(product,cb)=>{
        const {data} = await axios.post('/api/addCloudProduct',product)
        cb(data)
    },
    editCloudProduct:async(product,cb)=>{
        const {data} = await axios.post('/api/editCloudProduct',product)
        cb(data)
    },
    removeCloudProduct:async(id,cb)=>{
        const {data} = await axios.post('/api/removeCloudProduct',id)
        cb(data)
    }
}