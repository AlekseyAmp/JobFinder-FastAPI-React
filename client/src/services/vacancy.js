import axios from '../utils/axios';


export async function createNewVacancy(name, description, place, salary, experience, tags, setError, setShowError, navigate) {
    try {
        const response = await axios.post('/vacancies/create', { name, description, place, salary, experience, tags });

        if (response.data) {
            navigate('/employers');
            window.location.reload(); 
            console.log(response.data);
        }
    } catch (error) {
        const errorMessage = error.response.data.detail;
        setError(errorMessage);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setError(null);
        }, 2500);
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


export async function getFilteredVacancies(place, salary, experience) {
    try {
        const response = await axios.get(`/vacancies/filter?place=${place}&salary=${salary}&experience=${experience}`);
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


export async function searchVacancies(query) {
    try {
      const response = await axios.get(`/vacancies/search?query=${query}`);
  
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