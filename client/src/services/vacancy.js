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


export async function getPaginatedVacancies(current_page, confirmed, archived) {
    try {
        const response = await axios.get(`/vacancies/?page=${current_page}&confirmed=${confirmed}&archived=${archived}`);

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
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
            console.log(response.data);
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
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function inArchiveVacancy(vacancy_id, vacancies, setVacancies) {
    try {
      const response = await axios.patch(`/vacancies/in_archive/${vacancy_id}`);
  
      if (response.data) {
        setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
  }
  

export async function fromArchiveVacancy(vacancy_id, vacancies, setVacancies) {
    try {
        const response = await axios.patch(`/vacancies/from_archive/${vacancy_id}`);

        if (response.data) {
            setVacancies(vacancies.filter(vacancy => vacancy.id !== vacancy_id));
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}