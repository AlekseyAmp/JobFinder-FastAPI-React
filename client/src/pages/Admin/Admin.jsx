import React, { useState, useEffect } from 'react';

import { getAllEmployers } from '../../services/employer';
import { getUserInfo } from '../../services/user';

import styles from './Admin.module.scss';
import '../../assets/variables.scss';

import BlueButton from '../../components/Buttons/BlueButton/BlueButton';
import Employer from '../../components/Cards/Employer/Employer';

function Admin() {
  

  const [employers, setEmployers] = useState([]);
  useEffect(() => {
    getAllEmployers()
      .then((data) => {
        setEmployers(data)
      })
      .catch((error) => console.log(error));
  }, []);

  const [role, setRole] = useState(null);
  useEffect(() => {
    getUserInfo()
      .then((data) => setRole(data.role))
      .catch((error) => console.log(error));
  }, []);

  const [activeTab, setActiveTab] = useState('confirmedEmployers');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'confirmedEmployers':
        return (
          <div className={styles.confirmedEmployers}>
            {employers.map((employer) => {
              if (employer.isConfirmed) {
                return (
                  <Employer
                    key={employer.id}
                    created_at={employer.created_at}
                    company_name={employer.company_name}
                    company_description={employer.company_description}
                    isConfirmed={true}
                  />
                );
              }
            })}
          </div>
        );
      case 'unconfirmedEmployers':
        return (
          <div className={styles.unconfirmedEmployers}>
            {employers.map((employer) => {
              if (!employer.isConfirmed) {
                return (
                  <Employer
                    key={employer.id}
                    employer_id={employer.id}
                    company_name={employer.company_name}
                    company_description={employer.company_description}
                    created_at={employer.created_at}
                    isConfirmed={false}
                  />
                );
              }
            })}
          </div>
        );
      case 'vacancies':
        return <div>Content for vacancies</div>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.employer}>
      {role === 'admin' ? (
        <div className={styles.admin}>
          <div className={`title`}>Здравствуйте</div>
          <div className={styles.menu}>
            <button
              className={activeTab === 'confirmedEmployers' ? 'active' : ''}
              onClick={() => handleTabClick('confirmedEmployers')}
            >
              Подтвержденные работодатели
            </button>
            <button
              className={activeTab === 'unconfirmedEmployers' ? 'active' : ''}
              onClick={() => handleTabClick('unconfirmedEmployers')}
            >
              Неподтвержденные работодатели
            </button>
            <button
              className={activeTab === 'vacancies' ? 'active' : ''}
              onClick={() => handleTabClick('vacancies')}
            >
              Вакансии
            </button>
          </div>
          <div className={styles.adminContent}>{renderContent()}</div>
        </div>
      ) : ""}
    </div>
  );
}

export default Admin;
