import axios from '../utils/axios';

export async function createNewFeedback(applicant_id, vacancy_id, vacancies, setVacancies) {
    try {
        console.log(applicant_id, vacancy_id)
        const response = await axios.post('/feedbacks/create', { applicant_id, vacancy_id });
        
        if (response.data) {
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function getFeedbackByVacancy(vacancy_id) {
    try {
        const response = await axios.get(`/feedbacks/vacancy/${vacancy_id}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

