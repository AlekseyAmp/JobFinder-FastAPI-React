import React from 'react';
import { confirmEmployer, deleteEmployer } from '../../../services/employer';

import styles from './EmployerCard.module.scss';

import GreenButton from '../../Buttons/GreenButton/GreenButton';
import RedButton from '../../Buttons/RedButton/RedButton';

function EmployerCard({ employer_id, company_name, company_description, contact, website, created_at, is_confirmed, role, employers, setEmployers }) {
  return (
    <div className={styles.employerCard}>
      <div className={styles.employerCardDate}>
        <span className='small-text'>Номер: <p className={`small-text`}>{employer_id}</p></span>
        <span className='small-text'>Дата публикации: <p className={`small-text`}>{created_at.split('T')[0]}</p></span>
      </div>

      <div className={styles.employerCardMain}>
          <span className='gray-text'>Компания: <h3 className={`title`}>{company_name}</h3></span>
        <div className={styles.employerCardContact}>
          <span className='gray-text'>Контакт: <p className={`dark-text`}>{contact}</p></span>
          <span className='gray-text'>Веб-сайт компании: <a href={website} className={`link-text-blue`}>{website}</a></span>
        </div>
      </div>

      <span className='gray-text'>Описание: <p className={`dark-text`}>{company_description}</p></span>

      {role === 'admin' ? (
        is_confirmed ? (
          <RedButton
            title={"Удалить работодателя"}
            onClick={() => deleteEmployer(employer_id, employers, setEmployers)}
          />
        ) : (
          <div className={styles.employerCardButtons}>
            <GreenButton
              title={"Подтвердить"}
              onClick={() => confirmEmployer(employer_id, employers, setEmployers)}
            />
            <RedButton
              title={"Отказать"}
              onClick={() => deleteEmployer(employer_id, employers, setEmployers)}
            />
          </div>
        )
      ) : null}
    </div>
  );
}

export default EmployerCard;
