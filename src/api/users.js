import axios from 'axios'

export default {
    getUsers:async(cb)=>{
        const {data} = await axios.get('/api/getUsers') 
        cb(data)
    },
    modifyUserStatus:async(infos,cb)=>{
        const {data} = await axios.post('/api/modifyUserStatus',infos)
        cb(data)
    }
}