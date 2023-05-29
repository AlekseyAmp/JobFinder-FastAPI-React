import axios from '../utils/axios';

export async function createNewEmployer(company_name, company_description) {
    try {
        const response = await axios.post('/employers/create', { company_name, company_description });

        if (response.data) {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}
