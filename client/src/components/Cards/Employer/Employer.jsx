import React from 'react';

import { confirmEmployer, deleteEmployer } from '../../../services/employer';

import '../../../assets/variables.scss';
import styles from './Employer.module.scss';

import GreenButton from '../../Buttons/GreenButton/GreenButton';
import RedButton from '../../Buttons/RedButton/RedButton'

function Employer({ employer_id, company_name, company_description, created_at, is_confirmed, employers, setEmployers }) {
  return (
    <div className={styles.employerCard}>
      <span className='dark-text'>Номер: <p className={`small-text`}>{employer_id}</p></span>
      <span className='dark-text'>Дата заявки: <p className={`small-text`}>{created_at}</p></span>
      <span className='dark-text'>Компания: <h3 className={`title`}>{company_name}</h3></span>
      <span className='dark-text'>Описание: <p className={`dark-text`}>{company_description}</p></span>

      {is_confirmed ? (
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
      )}
    </div>
  )
}

export default Employer