import axios from '../utils/axios';

export async function createNewApplicant(speciality, experience, salary, resume_text) {
    try {
        const response = await axios.post('/applicants/create', { speciality, experience, salary, resume_text });

        if (response.data) {
            console.log(response.data);
            window.location.reload();
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}