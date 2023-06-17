import axios from '../utils/axios';

export async function createNewApplicant(speciality, experience, salary, resume_text, setError, setShowError, navigate) {
    try {
        const response = await axios.post('/applicants/create', { speciality, experience, salary, resume_text });

        if (response.data) {
            navigate('/applicants')            
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


export async function getPaginatedApplicants(current_page, archived) {
    try {
        const response = await axios.get(`/applicants/?page=${current_page}&archived=${archived}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function getFilteredApplicants(salary, experience) {
    try {
        const response = await axios.get(`/applicants/filter?salary=${salary}&experience=${experience}`);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function searchApplicants(query) {
    try {
      const response = await axios.get(`/applicants/search?query=${query}`);
  
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error.response.data.detail);
    }
}  


export async function getApplicantByUserID(user_id) {
    try {
        const response = await axios.get(`/applicants/user/${user_id}`);

        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export async function deleteApplicant(applicant_id, applicants, setApplicants) {
    try {
        const response = await axios.delete(`/applicants/delete/${applicant_id}`);

        if (response.data) {
            setApplicants(applicants.filter(applicant => applicant.id !== applicant_id));
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function inArchiveApplicant(applicant_id, applicants, setApplicants) {
    try {
        const response = await axios.patch(`/applicants/in_archive/${applicant_id}`);

        if (response.data) {
            setApplicants(applicants.filter(applicant => applicant.id !== applicant_id));
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function fromArchiveApplicant(applicant_id, applicants, setApplicants) {
    try {
        const response = await axios.patch(`/applicants/from_archive/${applicant_id}`);

        if (response.data) {
            setApplicants(applicants.filter(applicant => applicant.id !== applicant_id));
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function inArchiveMySummary(applicant_id, mySummary, setMySummary) {
    try {
        const response = await axios.patch(`/applicants/in_archive/${applicant_id}`);

        if (response.data) {
            setMySummary({ ...mySummary, is_archived: true });
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export async function fromArchiveMySummary(applicant_id, mySummary, setMySummary) {
    try {
        const response = await axios.patch(`/applicants/from_archive/${applicant_id}`);

        if (response.data) {
            setMySummary({ ...mySummary, is_archived: false });
            console.log(response.data);
        }
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

