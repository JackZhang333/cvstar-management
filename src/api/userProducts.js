import axios from 'axios'
export default {
    getProducts:async(cb)=>{
        const {data}= await axios.get('/api/getAllProducts')
        
        cb(data)
    }
}