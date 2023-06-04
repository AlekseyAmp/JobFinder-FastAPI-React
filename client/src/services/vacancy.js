import axios from '../utils/axios';

export async function createNewVacancy(name, description, place, salary, tags) {
    try {
        const response = await axios.post('/vacancies', { name, description, place, salary, tags });

        if (response.data) {
            console.log(response.data);
            window.location.reload();
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function getVacanciesByEmployer(employer_id) {
    try {
        const response = await axios.get(`/vacancies/${employer_id}`);

        if (response.data) {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function deleteVacancy(vacancy_id) {
    try {
        const response = await axios.delete(`/vacancies/${vacancy_id}`);

        if (response.data) {
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}