import React from 'react';

import styles from './ApplicantCard.module.scss';

import { deleteApplicant, fromArchiveApplicant, fromArchiveMySummary, inArchiveApplicant, inArchiveMySummary } from '../../../services/applicant';

import GreenButton from '../../Buttons/GreenButton/GreenButton';
import BlueButton from '../../Buttons/BlueButton/BlueButton';
import RedButton from '../../Buttons/RedButton/RedButton';

function ApplicantCard({ applicant_id, created_at, speciality, experience, salary, resume_text, is_archived, role, applicants, setApplicants, mySummary, setMySummary, showButtons = true }) {
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
                <p className="green-text">{salary}</p>
            </div>

            <div className={styles.applicantCardDescription}>
                <span className='dark-text'>Обо мне: <p className={`gray-text`}>{resume_text}</p></span>
            </div>

            {role === 'applicant' && showButtons ? (
                <div className={`buttons`}>
                    {is_archived === false ? (
                        <BlueButton
                            title={"В архив"}
                            onClick={() => inArchiveMySummary(applicant_id, mySummary, setMySummary)}
                        />
                    ) : (
                        <BlueButton
                            title={"Убрать из архива"}
                            onClick={() => fromArchiveMySummary(applicant_id, mySummary, setMySummary)}
                        />
                    )}
                </div>
            ) : (
                null
            )}
            {role === 'admin' && (
                <div className={`buttons`}>
                    <RedButton
                        title={"Удалить"}
                        onClick={() => deleteApplicant(applicant_id, applicants, setApplicants)}
                    />
                    {is_archived === false ? (
                        <BlueButton
                            title={"В архив"}
                            onClick={() => inArchiveApplicant(applicant_id, applicants, setApplicants)}
                        />
                    ) : (
                        <BlueButton
                            title={"Убрать из архива"}
                            onClick={() => fromArchiveApplicant(applicant_id, applicants, setApplicants)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default ApplicantCard;
