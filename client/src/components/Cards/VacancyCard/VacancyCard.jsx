import React, { useState } from 'react';

import styles from './VacancyCard.module.scss';

import { confirmVacancy, deleteVacancy, fromArchiveVacancy, inArchiveVacancy } from '../../../services/vacancy';
import { createNewFeedback, getFeedbackByVacancy } from '../../../services/feedback';

import ApplicantCard from '../../../components/Cards/ApplicantCard/ApplicantCard';
import RedButton from '../../Buttons/RedButton/RedButton';
import GreenButton from '../../Buttons/GreenButton/GreenButton';
import BlueButton from '../../Buttons/BlueButton/BlueButton';

function VacancyCard({ vacancy_id, applicant_id, company_name, name, created_at, description, place, salary, experience, tags, is_confirmed, is_archived, is_feedback, role, vacancies, setVacancies, showButtons = true }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const handleFeedbacksOpen = () => {
    setShowFeedbacks(true);
    getFeedbackByVacancy(vacancy_id)
      .then((data) => {
        setFeedbacks(data);
      })
      .catch((error) => console.log(error));
  };

  const handleFeedbacksClose = () => {
    setShowFeedbacks(false);
  }

  return (
    <div className={styles.vacancyCard}>
      <div className={styles.vacancyCardCompany}>
        <h3 className={`title`}>От {company_name}</h3>
      </div>
      <div className={styles.vacancyCardTitle}>
        <h3 className={`title`}>{name}</h3>
        <div className={styles.vacancyCardDate}>
          <span className={`small-text`}>Дата размещения: {created_at.split('T')[0]}</span>
          <span className={`small-text`}>Номер: {vacancy_id}</span>
        </div>
      </div>

      <div className={`line`}></div>
      <div className={styles.vacancyCardUnderTitle}>
        <p className={`dark-text`}>
          <span className={`bold-text`}>{salary}</span> <span className={`green-text`}>руб.</span>
        </p>

        <div className={`vertical-line`}></div>

        <p className={`dark-text`}>Требуемый опыт: <span className={`bold-text`}>{experience}</span></p>

        <div className={`vertical-line`}></div>

        <p className={`dark-text`}>г. <span className={`bold-text`}>{place}</span></p>
      </div>

      <div className={styles.vacancyCardDescription}>
        <p className={`gray-text`}>Подробнее: <p className={`dark-text`}>{description}</p> </p>
      </div>

      <ul className={styles.vacancyCardTags}>
        {tags.map((tag) => <li className={styles.vacancyCardTag}><p className={`small-text`}>{tag}</p></li>)}
      </ul>

      {role === 'employer' && showButtons ? (
        <div className={`column`}>
          <div className={styles.vacancyCardButtons}>
            <RedButton
              title={"Удалить"}
              onClick={() => deleteVacancy(vacancy_id, vacancies, setVacancies)}
            />
            {is_archived === false ? (
              <div className={`buttons`}>
                <BlueButton
                  title={"В архив"}
                  onClick={() => inArchiveVacancy(vacancy_id, vacancies, setVacancies)}
                />
                <GreenButton
                  title={"Посмотреть отклики"}
                  onClick={() => handleFeedbacksOpen()}
                />
              </div>
            ) : (
              <BlueButton
                title={"Убрать из архива"}
                onClick={() => fromArchiveVacancy(vacancy_id, vacancies, setVacancies)}
              />
            )}

          </div>
          <div className={styles.vacancyCardFeedbacks}>
            {showFeedbacks && (
              <div className={styles.vacancyCardFeedback}>
                <RedButton
                  title={"Закрыть"}
                  onClick={() => handleFeedbacksClose()}
                />
                {feedbacks.map((feedback) => (
                  <ApplicantCard
                    key={feedback.applicant.id}
                    applicant_id={feedback.applicant.id}
                    created_at={feedback.applicant.created_at}
                    speciality={feedback.applicant.speciality}
                    experience={feedback.applicant.experience}
                    salary={feedback.applicant.salary}
                    phone_number={feedback.applicant.phone_number}
                    email={feedback.applicant.email}
                    resume_text={feedback.applicant.resume_text}
                    is_archived={feedback.applicant.is_archived}
                    role={role}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        role === 'admin' && (
          <div className={styles.vacancyCardButtons}>
            {is_confirmed === false ? (
              <GreenButton
                title={"Подтвердить"}
                onClick={() => confirmVacancy(vacancy_id, vacancies, setVacancies)}
              />
            ) : (
              <RedButton
                title={"Удалить"}
                onClick={() => deleteVacancy(vacancy_id, vacancies, setVacancies)}
              />
            )}
            {is_archived === false ? (
              <BlueButton
                title={"В архив"}
                onClick={() => inArchiveVacancy(vacancy_id, vacancies, setVacancies)}
              />
            ) : (
              <BlueButton
                title={"Убрать из архива"}
                onClick={() => fromArchiveVacancy(vacancy_id, vacancies, setVacancies)}
              />
            )}
          </div>
        )
      )}
      {role === 'applicant' && is_feedback ? (
        <div className={styles.vacancyCardButtons}>
          <span className={`blue-text`}>Вы откликнулись на эту вакансию</span>
        </div>
      ) : role === 'applicant' && (
        <div className={styles.vacancyCardButtons}>
          <GreenButton
            title={"Откликнуться на вакансию"}
            onClick={() => createNewFeedback(applicant_id, vacancy_id, vacancies, setVacancies)}
          />
        </div>
      )}

    </div>
  );
}

export default VacancyCard;
