import axios from '../utils/axios';

export async function createNewEmployer(company_name, company_description) {
    try {
        const response = await axios.post('/employers', { company_name, company_description });

        if (response.data) {
            console.log(response.data);
            window.location.reload();
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

export async function confirmEmployer(employer_id, employers, setEmployers) {
    try {
        const response = await axios.patch(`/employers/${employer_id}`);

        if (response.data) {
            setEmployers(employers.filter(employer => employer.id !== employer_id));
            const updatedEmployers = employers.map((employer) => {
                if (employer.id === employer_id) {
                    return { ...employer, is_confirmed: true };
                }
                return employer;
            });
            setEmployers(updatedEmployers);
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export async function deleteEmployer(employer_id, employers, setEmployers) {
    try {
      const response = await axios.delete(`/employers/${employer_id}`);
      if (response.data) {
        setEmployers(employers.filter(employer => employer.id !== employer_id));
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
  }
  

