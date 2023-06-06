import axios from '../utils/axios';

export async function createNewEmployer(company_name, company_description, contact, website) {
    try {
        const response = await axios.post('/employers/create', { company_name, company_description, contact, website });

        if (response.data) {
            console.log(response.data);
            window.location.reload();
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
  

