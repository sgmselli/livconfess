import axios from 'axios'

export const get_endpoint = async (url, data = {}) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await axios.get(url, {
            headers: headers,
            body: data
        });
        
        return response.data

    } catch (error) {
        return error
    }
}

export const post_endpoint = async (url, data = {}) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await axios.post(url, {
            headers: headers,
            body: data
        });
        
        return response.data

    } catch (error) {
        return error
    }
}

export default get_endpoint;