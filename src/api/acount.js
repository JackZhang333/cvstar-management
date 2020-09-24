import axios from 'axios'
// import env from '../envirenment'
export default {
    toLogin:async(data,cb)=>{
        let result = await axios.post('/api/staffLogin',data)
        cb(result.data);
    }
}