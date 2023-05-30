import React from 'react';

import { confirmEmployer } from '../../../services/employer';

import '../../../assets/variables.scss';
import styles from './Employer.module.scss';
import GreenButton from '../../Buttons/GreenButton/GreenButton';

function Employer({ employer_id, company_name, company_description, created_at, isConfirmed }) {
  return (
    <div className={styles.employerCard}>
      <span className='dark-text'>Дата заявки: <p className={`small-text`}>{created_at}</p></span>
      <span className='dark-text'>Компания: <h3 className={`title`}>{company_name}</h3></span>
      <span className='dark-text'>Описание: <p className={`dark-text`}>{company_description}</p></span>

      {isConfirmed ? (
        "321"
      ) : (
        <GreenButton
          title={"Подтвердить"}
          onClick={() => confirmEmployer(employer_id)}
        />
      )}
    </div>
  )
}

export default Employer