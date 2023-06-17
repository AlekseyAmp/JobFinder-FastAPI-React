import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { access_token } from '../../constants/token';
import { getUserInfo } from '../../services/user';
import { createNewApplicant, getApplicantByUserID, getPaginatedApplicants, getFilteredApplicants, searchApplicants } from '../../services/applicant';

import styles from './Applicant.module.scss';

import ErrorBox from '../../components/ErrorBox/ErrorBox';
import SearchForm from '../../components/Forms/SearchForm/SearchForm';
import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import GreenButton from '../../components/Buttons/GreenButton/GreenButton';
import TextareaForm from '../../components/Forms/TextareaForm/TextareaForm';
import FilterBar from '../../components/FilterBar/FilterBar';
import ApplicantCard from '../../components/Cards/ApplicantCard/ApplicantCard';

function Applicant() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthorized = access_token;
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [mySummary, setMySummary] = useState({});
  const [showApplicantCreateForm, setShowApplicantCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const inputConfigSearch = [
    { title: 'Поиск по соискателям', type: 'text', name: 'search', placeholder: 'Например: Электромонтажник' },
  ]

  useEffect(() => {
    if (isAuthorized) {
      getUserInfo()
        .then((data) => {
          setRole(data.role);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (role) {
      if (role === 'applicant') {
        const decoded_token = jwt_decode(access_token);
        const userID = decoded_token.sub;

        getApplicantByUserID(userID)
          .then((data) => {
            setMySummary(data);
          })
          .catch((error) => console.log(error));
      }
      const urlParams = new URLSearchParams(window.location.search);
      const currentPage = parseInt(urlParams.get('page')) || 1;
      const query = urlParams.get('query');
      const salary = urlParams.get('salary');
      const experience = urlParams.get('experience');

      if (!query && !salary && !experience) {
        getPaginatedApplicants(currentPage, false)
          .then((data) => {
            setApplicants(data);
          })
          .catch((error) => console.log(error));
      }

      if (query !== null) {
        searchApplicants(query)
          .then((results) => {
            setSearchResults(results);
          })
          .catch((error) => console.log(error));
      }

      if (salary && experience) {
        getFilteredApplicants(salary, experience)
          .then((filteredData) => {
            setFilteredApplicants(filteredData);
          })
          .catch((error) => console.log(error));
      }
    }
  }, [role]);

  const handleSearchClick = async (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    const results = await searchApplicants(query);
    setSearchResults(results);
    setApplicants([]);
    setFilteredApplicants([]);
    setCurrentPage(1);
    const searchParams = new URLSearchParams({ query });
    navigate(`/applicants/search?${searchParams.toString()}`);
  };

  const handleFilterClick = async (e) => {
    e.preventDefault();
    const salary = e.target.salary.value;
    const experience = e.target.experience.value;
    const filteredApplicants = await getFilteredApplicants(salary, experience);
    setFilteredApplicants(filteredApplicants);
    setApplicants([]);
    setSearchResults([]);
    setCurrentPage(1);
    const searchParams = new URLSearchParams({ salary, experience });
    navigate(`/applicants/filter?${searchParams.toString()}`);
  };


  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleBackClick = () => {
    navigate('/applicants')
    window.location.reload();
  };

  const renderContent = () => {
    if (role === 'user') {
      const handleBecomeApplicantClick = () => {
        setShowApplicantCreateForm(true);
      };

      const handleCreateApplicantSubmit = (e) => {
        e.preventDefault();
        createNewApplicant(e.target.speciality.value, e.target.experience.value, e.target.salary.value, e.target.resume_text.value, setError, setShowError, navigate);
      };

      const inputConfigs = [
        {
          title: 'Желаемая должность',
          type: 'text',
          name: 'speciality'
        },
        {
          title: 'Ваш опыт работы в годах (Например: 1)',
          type: 'text',
          name: 'experience'
        },
        {
          title: 'Зарплатные ожидания (Например: 25000)',
          type: 'text',
          name: 'salary'
        }
      ];
      const textareaConfigs = [
        {
          title: 'Напишите, чем занимались на прошлых местах работы',
          type: 'text',
          name: 'resume_text'
        }
      ];

      return (
        <div className={`section`}>
          {showApplicantCreateForm ? (
            <TextareaForm
              inputConfigs={inputConfigs}
              textareaConfigs={textareaConfigs}
              buttonTitle={'Отправить'}
              onSubmit={handleCreateApplicantSubmit}
            />
          ) : (
            <div className={`content`}>
              <p className={`dark-text center`}>Для того, чтобы просматривать эту страницу, нужно стать соискателем</p>
              <div className={`center`}>
                <BlueButton title={'Разместить резюме'} onClick={handleBecomeApplicantClick} />
              </div>
            </div>
          )}
          {showError && <ErrorBox error={error} />}
        </div>
      );
    }
    else if (role === 'applicant') {

      const goToNextPage = (currentPage) => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setSearchResults([]);
        setFilteredApplicants([]);
        getPaginatedApplicants(nextPage, false)
          .then((data) => {
            setApplicants(data);
          })
          .catch((error) => console.log(error));
        navigate(`/applicants?page=${nextPage}&archived=false`);
      };

      const goToPreviousPage = (currentPage) => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
        setSearchResults([]);
        setFilteredApplicants([]);
        getPaginatedApplicants(previousPage, false)
          .then((data) => {
            setApplicants(data);
          })
          .catch((error) => console.log(error));
        navigate(`/applicants?page=${previousPage}&archived=false`);
      };

      return (
        <div className={styles.applicantSection}>
          <div className={styles.applicantSummary}>
            <h3 className={`title`}>Моё резюме</h3>
            {mySummary.id && (
              <ApplicantCard
                key={mySummary.id}
                applicant_id={mySummary.id}
                created_at={mySummary.created_at}
                speciality={mySummary.speciality}
                experience={mySummary.experience}
                salary={mySummary.salary}
                phone_number={mySummary.phone_number}
                email={mySummary.email}
                resume_text={mySummary.resume_text}
                is_archived={mySummary.is_archived}
                role={role}
                mySummary={mySummary}
                setMySummary={setMySummary}
                showButtons={true}
              />
            )}
          </div>
          <div className={styles.applicantSectionContent}>
            <FilterBar
              is_applicants={true}
              onSubmit={handleFilterClick}
            />
            <div className={`content`}>
              <h3 className={`title`}>Все активные резюме на сервисе</h3>
              <SearchForm
                inputConfigs={inputConfigSearch}
                onSubmit={handleSearchClick}
              />
              <div className={`cards`}>
                <div className={`cards-content`}>
                  {applicants.length > 0 ? (
                    applicants.map((applicant) => (
                      <ApplicantCard
                        key={applicant.id}
                        applicant_id={applicant.id}
                        created_at={applicant.created_at}
                        speciality={applicant.speciality}
                        experience={applicant.experience}
                        salary={applicant.salary}
                        phone_number={applicant.phone_number}
                        email={applicant.email}
                        resume_text={applicant.resume_text}
                        is_archived={false}
                        role={role}
                        showButtons={false}
                      />
                    ))
                  ) : searchResults.length > 0 ? (
                    searchResults.map((applicant) => (
                      <ApplicantCard
                        key={applicant.id}
                        applicant_id={applicant.id}
                        created_at={applicant.created_at}
                        speciality={applicant.speciality}
                        experience={applicant.experience}
                        salary={applicant.salary}
                        phone_number={applicant.phone_number}
                        email={applicant.email}
                        resume_text={applicant.resume_text}
                        is_archived={false}
                        role={role}
                        showButtons={false}
                      />
                    ))
                  ) : filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant) => (
                      <ApplicantCard
                        key={applicant.id}
                        applicant_id={applicant.id}
                        created_at={applicant.created_at}
                        speciality={applicant.speciality}
                        experience={applicant.experience}
                        salary={applicant.salary}
                        phone_number={applicant.phone_number}
                        email={applicant.email}
                        resume_text={applicant.resume_text}
                        is_archived={false}
                        role={role}
                        showButtons={false}
                      />
                    ))
                  ) : (
                    <div className='searchNotFound'>
                      <p className={`red-text`}>Ничего не найдено</p>
                      <GreenButton
                        title={"Вернуться к соискателям"}
                        onClick={handleBackClick}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className={`pagination`}>
                <div className={`pagination-content`}>

                  <button
                    disabled={currentPage === 1}
                    onClick={() => goToPreviousPage(currentPage)}>
                    Предыдущая страница</button>

                  <span>Текущая страница: {currentPage}</span>

                  <button onClick={() => goToNextPage(currentPage)}>
                    Следующая страница</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      const goToNextPage = (currentPage) => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        setSearchResults([]);
        setFilteredApplicants([]);
        getPaginatedApplicants(nextPage, false)
          .then((data) => {
            setApplicants(data);
          })
          .catch((error) => console.log(error));
        navigate(`/applicants?page=${nextPage}&archived=false`);
      };

      const goToPreviousPage = (currentPage) => {
        const previousPage = currentPage - 1;
        setCurrentPage(previousPage);
        setSearchResults([]);
        setFilteredApplicants([]);
        getPaginatedApplicants(previousPage, false)
          .then((data) => {
            setApplicants(data);
          })
          .catch((error) => console.log(error));
        navigate(`/applicants?page=${previousPage}&archived=false`);
      };

      return (
        <div className={`${styles.applicantSection} df`}>
          <FilterBar
            is_applicants={true}
            onSubmit={handleFilterClick}
          />
          <div className={`content`}>
            <h3 className={`title`}>Соискатели</h3>
            <SearchForm
              inputConfigs={inputConfigSearch}
              onSubmit={handleSearchClick}
            />
            <div className={`cards`}>
              <div className={`cards-content`}>
                {applicants.length > 0 ? (
                  applicants.map((applicant) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant_id={applicant.id}
                      created_at={applicant.created_at}
                      speciality={applicant.speciality}
                      experience={applicant.experience}
                      salary={applicant.salary}
                      phone_number={applicant.phone_number}
                      email={applicant.email}
                      resume_text={applicant.resume_text}
                      is_archived={false}
                      role={role}
                      showButtons={false}
                    />
                  ))
                ) : searchResults.length > 0 ? (
                  searchResults.map((applicant) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant_id={applicant.id}
                      created_at={applicant.created_at}
                      speciality={applicant.speciality}
                      experience={applicant.experience}
                      salary={applicant.salary}
                      phone_number={applicant.phone_number}
                      email={applicant.email}
                      resume_text={applicant.resume_text}
                      is_archived={false}
                      role={role}
                      showButtons={false}
                    />
                  ))
                ) : filteredApplicants.length > 0 ? (
                  filteredApplicants.map((applicant) => (
                    <ApplicantCard
                      key={applicant.id}
                      applicant_id={applicant.id}
                      created_at={applicant.created_at}
                      speciality={applicant.speciality}
                      experience={applicant.experience}
                      salary={applicant.salary}
                      phone_number={applicant.phone_number}
                      email={applicant.email}
                      resume_text={applicant.resume_text}
                      is_archived={false}
                      role={role}
                      showButtons={false}
                    />
                  ))
                ) : (
                  <div className='searchNotFound'>
                    <p className={`red-text`}>Ничего не найдено</p>
                    <GreenButton
                      title={"Вернуться к соискателям"}
                      onClick={handleBackClick}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={`pagination`}>
              <div className={`pagination-content`}>

                <button
                  disabled={currentPage === 1}
                  onClick={() => goToPreviousPage(currentPage)}>
                  Предыдущая страница</button>

                <span>Текущая страница: {currentPage}</span>

                <button onClick={() => goToNextPage(currentPage)}>
                  Следующая страница</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className={styles.applicant}>
      {isAuthorized ? (
        isLoading ? (
          <div>Loading...</div>
        ) : (
          renderContent()
        )
      ) : (
        <div className={`content`}>
          <p className={`dark-text center`}>Войдите или зарегистрируйтесь</p>
          <div className={`buttons center`}>
            <GreenButton title={'Вход'} onClick={handleLoginClick} />
            <GreenButton title={'Регистрация'} onClick={handleRegisterClick} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Applicant;