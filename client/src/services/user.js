import axios from '../utils/axios';

export async function getUserRole() {
    try {
        const response = await axios.get(`/users/me`);

        if (response.data) {
            return {
                role: response.data.role 
            };
        }
    } catch (error) {
        throw new Error(error.response.data.detail);
    }
}

export async function getUserNameSurname() {
    try {
        const response = await axios.get(`/users/me`);

        if (response.data) {
            return {
                name: response.data.name, 
                surname: response.data.surname
            };
        }
    } catch (error) {
        throw new Error(error.response.data.detail);
    }
}
