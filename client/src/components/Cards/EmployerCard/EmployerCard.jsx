import React from 'react';
import { confirmEmployer, deleteEmployer } from '../../../services/employer';

import styles from './EmployerCard.module.scss';

import GreenButton from '../../Buttons/GreenButton/GreenButton';
import RedButton from '../../Buttons/RedButton/RedButton';

function EmployerCard({ employer_id, company_name, company_description, contact, website, created_at, is_confirmed, role, employers, setEmployers }) {
  return (
    <div className={styles.employerCard}>
      <div className={styles.employerCardDate}>
        <span className='small-text'>Номер: {employer_id}</span>
        <span className='small-text'>Дата размещения: {created_at.split('T')[0]}</span>
      </div>

      <div className={styles.employerCardMain}>
          <span className='dark-text' >Компания: <h3 className={`title`}>{company_name}</h3></span>
        <div className={styles.employerCardContact}>
          <span className='dark-text'>Контакт: <p className={`gray-text`}>{contact}</p></span>
          <span className='dark-text'>Веб-сайт компании: <a href={website} className={`link-text-blue`}>{website}</a></span>
        </div>
      </div>

      <span className='dark-text'>Описание: <p className={`gray-text`}>{company_description}</p></span>

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
