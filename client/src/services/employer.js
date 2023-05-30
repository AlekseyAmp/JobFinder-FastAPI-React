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

export async function getAllEmployers() {
    try {
        const response = await axios.get('/employers');

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export async function confirmEmployer(employer_id) {
    try {
        const response = await axios.patch(`/employers/${employer_id}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}
