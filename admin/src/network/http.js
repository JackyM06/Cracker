import Axios from 'axios'

const http = Axios.create({
    baseURL:process.env.VUE_APP_API_URL || '/admin/api/v1',
})

export default http