  import React, { useState, useEffect } from 'react'
  import { useNavigate } from 'react-router-dom';

  import jwt_decode from 'jwt-decode';
  import { access_token } from '../../constants/token';
  import { getUserInfo } from '../../services/user';
  import { createNewApplicant, getApplicant, getPaginatedApplicants } from '../../services/applicant';

  import styles from './Applicant.module.scss';

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
    const [userID, setUserID] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [mySummary, setMySummary] = useState({});
    const [showApplicantCreateForm, setShowApplicantCreateForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    
    useEffect(() => {
      if (isAuthorized) {
        getUserInfo()
          .then((data) => {
            setRole(data.role);
            setUserID(data.id);
            setIsLoading(false);
          })
          .catch((error) => console.log(error));
      }
    }, [isAuthorized]);

    useEffect(() => {
      if (role) {
        getPaginatedApplicants(1, false)
          .then((data) => {
            setApplicants(data);
          })
          .catch((error) => console.log(error));
      }
    }, [role]);

    useEffect(() => {
      if (role === 'applicant') {
        getApplicant(userID)
          .then((data) => {
            setMySummary(data);
          })
          .catch((error) => console.log(error));
      }
    }, [role]);


    const handleLoginClick = () => {
      navigate('/login');
    };

    const handleRegisterClick = () => {
      navigate('/register');
    };

    const renderContent = () => {
      if (role === 'user') {
        const handleBecomeApplicantClick = () => {
          setShowApplicantCreateForm(true);
        };

        const handleCreateApplicantSubmit = (e) => {
          e.preventDefault();
          createNewApplicant(e.target.speciality.value, e.target.experience.value, e.target.salary.value, e.target.resume_text.value);
          navigate('/vacancies')
        };

        const inputConfigs = [
          {
            title: 'Желаемая должность',
            type: 'text',
            name: 'speciality'
          },
          {
            title: 'Требуемый опыт (Например: 2 года, 10 месяцев)',
            type: 'text',
            name: 'experience'
          },
          {
            title: 'Зарплатные ожидания (Например: 25.000)',
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
          </div>
        );
      }
      else if (role === 'applicant') {

        const goToNextPage = (currentPage) => {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          getPaginatedApplicants(nextPage, false)
            .then((data) => {
              setApplicants(data);
            })
            .catch((error) => console.log(error));
        };

        const goToPreviousPage = (currentPage) => {
          const previousPage = currentPage - 1;
          setCurrentPage(previousPage);
          getPaginatedApplicants(previousPage, false)
            .then((data) => {
              setApplicants(data);
            })
            .catch((error) => console.log(error));
        };

        return (
          <div className={styles.applicantSection}>
            <div className={styles.applicationSummary}>
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
              <FilterBar />
              <div className={`content`}>
                <h3 className={`title`}>Все активные резюме на сервисе</h3>
                <div className={`cards`}>
                  <div className={`cards-content`}>
                    {applicants.map((applicant) => {
                      return (
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
                          role={role}
                          showButtons={false}
                        />
                      );
                    })}
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
          getPaginatedApplicants(nextPage)
            .then((data) => {
              setApplicants(data);
            })
            .catch((error) => console.log(error));
        };

        const goToPreviousPage = (currentPage) => {
          const previousPage = currentPage - 1;
          setCurrentPage(previousPage);
          getPaginatedApplicants(previousPage)
            .then((data) => {
              setApplicants(data);
            })
            .catch((error) => console.log(error));
        };

        return (
          <div className={`${styles.applicantSection} df`}>
            <FilterBar />
            <div className={`content`}>
              <h3 className={`title`}>Соискатели</h3>
              <div className={`cards`}>
                <div className={`cards-content`}>
                  {applicants.map((applicant) => {
                    return (
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
                        role={role}
                        showButtons={false}
                      />
                    );
                  })}
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