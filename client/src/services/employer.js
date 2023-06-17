import axios from '../utils/axios';

export async function createNewEmployer(company_name, company_description, contact, website, setError, setShowError) {
    try {
        const response = await axios.post('/employers/create', { company_name, company_description, contact, website });

        if (response.data) {
            console.log(response.data);
            window.location.reload();
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

export async function getEmployerByUserID(user_id) {
    try {
        const response = await axios.get(`/employers/user/${user_id}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function getPaginatedEmployers(current_page, confirmed) {
    try {
        const response = await axios.get(`/employers/?page=${current_page}&confirmed=${confirmed}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function searchEmployers(query) {
    try {
      const response = await axios.get(`/employers/search?query=${query}`);
  
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
}  


export async function confirmEmployer(employer_id, employers, setEmployers) {
    try {
        const response = await axios.patch(`/employers/confirm/${employer_id}`);

        if (response.data) {
            setEmployers(employers.filter(employer => employer.id !== employer_id));
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function deleteEmployer(employer_id, employers, setEmployers) {
    try {
      const response = await axios.delete(`/employers/delete/${employer_id}`);
      if (response.data) {
        setEmployers(employers.filter(employer => employer.id !== employer_id));
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
}
  

