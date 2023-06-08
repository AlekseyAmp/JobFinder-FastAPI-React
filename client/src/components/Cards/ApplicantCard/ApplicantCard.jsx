import React from 'react';

import styles from './ApplicantCard.module.scss';

import GreenButton from '../../Buttons/GreenButton/GreenButton';
import RedButton from '../../Buttons/RedButton/RedButton';

function ApplicantCard({ applicant_id, created_at, speciality, experience, salary, resume_text, role, applicants, setApplicants }) {
    return (
        <div className={styles.applicantCard}>
            <div className={styles.applicantCardDate}>
                <span className='small-text'>Номер: {applicant_id}</span>
                <span className='small-text'>Дата размещения резюме: {created_at.split('T')[0]}</span>
            </div>

            <div className={styles.applicantCardMain}>
                <div className={styles.applicantCardTitle}>
                    <h3 className={`title`}>{speciality}</h3>
                    <span className='dark-text'>Опыт работы: <span className={`title`}>{experience}</span></span>
                </div>
                <p className={`blue-text`}>{salary}</p>
            </div>

            <div className={styles.applicantCardDescription}>
                <span className='dark-text'>Обо мне: <p className={`gray-text`}>{resume_text}</p></span>
            </div>

        </div>
    );
}

export default ApplicantCard;
