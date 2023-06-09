import React from 'react';

import styles from './VacancyCard.module.scss';

import { confirmVacancy, deleteVacancy, fromArchiveVacancy, inArchiveVacancy } from '../../../services/vacancy';

import RedButton from '../../Buttons/RedButton/RedButton';
import GreenButton from '../../Buttons/GreenButton/GreenButton';
import BlueButton from '../../Buttons/BlueButton/BlueButton';

function VacancyCard({ vacancy_id, name, created_at, description, place, salary, experience, tags, is_confirmed, is_archived, role, vacancies, setVacancies, showButtons = true }) {
  return (
    <div className={styles.vacancyCard}>
      <div className={styles.vacancyCardTitle}>
        <h3 className={`title`}>{name}</h3>
        <p className={`small-text`}>Дата размещения: {created_at.split('T')[0]}</p>
      </div>

        <div className={`line`}></div>
      <div className={styles.vacancyCardUnderTitle}>
        <p className={`dark-text`}>
          <span className={`bold-text`}>{salary}</span> <span className={`green-text`}>руб.</span>
        </p>
        
        <div className={`vertical-line`}></div>
        
        <p className={`dark-text`}>Требуемый опыт: <span className={`bold-text`}>{experience}</span> г.</p>
        
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
        <div className={styles.vacancyCardButtons}>
          <RedButton
            title={"Удалить"}
            onClick={() => deleteVacancy(vacancy_id, vacancies, setVacancies)}
          />
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
    </div>
  );
}

export default VacancyCard;
