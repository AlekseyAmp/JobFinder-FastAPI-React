import React from 'react';

import '../../../assets/variables.scss';
import styles from './Vacancy.module.scss';

import { confirmVacancy, deleteVacancy, inArchiveVacancy } from '../../../services/vacancy';

import RedButton from '../../Buttons/RedButton/RedButton';
import GreenButton from '../../Buttons/GreenButton/GreenButton';
import BlueButton from '../../Buttons/BlueButton/BlueButton';

function Vacancy({ vacancy_id, name, created_at, description, place, salary, tags, role, is_confirmed, is_archived, vacancies, setVacancies }) {
  return (
    <div className={styles.vacancyCard}>
      <div className={styles.vacancyCardTitle}>
        <h3 className={`title`}>{name}</h3>
        <p className={`gray-text`}>от {created_at.split('T')[0]}</p>
      </div>
      <div className={styles.vacancyCardUnderTitle}>
        <p className={`gray-text`}>{salary} руб. - г. {place}</p>
      </div>
      <div className={styles.vacancyCardDescription}>
        <p className={`dark-text`}>{description}</p>
      </div>

      <ul className={styles.vacancyCardTags}>
        {tags.map((tag) => <li className={styles.vacancyCardTag}><p className={`dark-text`}>{tag}</p></li>)}
      </ul>

      {role === 'employer' ? (
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
          ) : <BlueButton
            title={"Убрать из архива"}
          />}
        </div>
      ) : (
        role === 'admin' && (
          <div className={styles.vacancyCardButtons}>
            <GreenButton
              title={"Подтвердить"}
              onClick={() => confirmVacancy(vacancy_id, vacancies, setVacancies)}
            />
            <RedButton
              title={"Удалить"}
              onClick={() => deleteVacancy(vacancy_id, vacancies, setVacancies)}
            />
            {is_archived === false ? (
              <BlueButton
                title={"В архив"}
                onClick={() => inArchiveVacancy(vacancy_id, vacancies, setVacancies)}
              />
            ) : <BlueButton
              title={"Убрать из архива"}
            />}
          </div>
        )
      )}
    </div>
  );
}

export default Vacancy;
