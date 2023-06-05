import axios from '../utils/axios';

export async function createNewVacancy(name, description, place, salary, tags) {
    try {
        const response = await axios.post('/vacancies/create', { name, description, place, salary, tags });

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
        const response = await axios.get(`/vacancies/employer/${employer_id}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function getAllVacancies() {
    try {
        const response = await axios.get(`/vacancies`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function deleteVacancy(vacancy_id, vacancies, setVacancies) {
    try {
        const response = await axios.delete(`/vacancies/delete/${vacancy_id}`);

        if (response.data) {
            console.log(response.data);
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function confirmVacancy(vacancy_id, vacancies, setVacancies) {
    try {
        const response = await axios.patch(`/vacancies/confirm/${vacancy_id}`);

        if (response.data) {
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
            const updatedVacancies = vacancies.map((vacancy) => {
                if (vacancy.id === vacancy_id) {
                    return { ...vacancy, is_confirmed: true };
                }
                return vacancy;
            });
            setVacancies(updatedVacancies);
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function inArchiveVacancy(vacancy_id, vacancies, setVacancies) {
    try {
        const response = await axios.patch(`/vacancies/archive/${vacancy_id}`);

        if (response.data) {
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
            const updatedVacancies = vacancies.map((vacancy) => {
                if (vacancy.id === vacancy_id) {
                    return { ...vacancy, is_archived: true };
                }
                return vacancy;
            });
            setVacancies(updatedVacancies);
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}