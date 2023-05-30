import React, { useState, useEffect } from 'react';

import { getAllEmployers } from '../../services/employer';
import { getUserInfo } from '../../services/user';

import styles from './Admin.module.scss';
import '../../assets/variables.scss';

import Employer from '../../components/Cards/Employer/Employer';
import { access_token } from '../../constants/token';

function Admin() {
  const isAuthorize = access_token
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null)
  const [employers, setEmployers] = useState([]);
  const [activeTab, setActiveTab] = useState('unconfirmedEmployers');

  useEffect(() => {
    if (isAuthorize) {
      getUserInfo()
        .then((data) => {
          setRole(data.role);
          setName(data.name);
        })

        .catch((error) => console.log(error));
    }
  }, [isAuthorize]);

  useEffect(() => {
    if (role === 'admin') {
      getAllEmployers()
        .then((data) => {
          setEmployers(data);
        })
        .catch((error) => console.log(error));
    }
  }, [role]);
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'confirmedEmployers':
        return (
          <div className={styles.confirmedEmployers}>
            {employers.map((employer) => {
              if (employer.is_confirmed) {
                return (
                  <Employer
                    key={employer.id}
                    employer_id={employer.id}
                    created_at={employer.created_at}
                    company_name={employer.company_name}
                    company_description={employer.company_description}
                    is_confirmed={true}
                    employers={employers}
                    setEmployers={setEmployers}
                  />
                );
              }
              return null;
            })}
          </div>
        );
      case 'unconfirmedEmployers':
        return (
          <div className={styles.unconfirmedEmployers}>
            {employers.map((employer) => {
              if (!employer.is_confirmed) {
                return (
                  <Employer
                    key={employer.id}
                    employer_id={employer.id}
                    company_name={employer.company_name}
                    company_description={employer.company_description}
                    created_at={employer.created_at}
                    is_confirmed={false}
                    employers={employers}
                    setEmployers={setEmployers}
                  />
                );
              }
              return null;
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.admin}>
      {role === 'admin' ? (
        <div className={styles.adminContent}>
          <div className={`title`}>Добро пожаловать, {name}!</div>

          <div className={styles.adminEmployersMenu}>

            <button
              className={activeTab === 'confirmedEmployers' ? 'active' : ''}
              onClick={() => handleTabClick('confirmedEmployers')}>
              Подтвержденные работодатели</button>

            <button
              className={activeTab === 'unconfirmedEmployers' ? 'active' : ''}
              onClick={() => handleTabClick('unconfirmedEmployers')}>
              Неподтвержденные работодатели</button>

            <button
              className={activeTab === 'confirmedVacancies' ? 'active' : ''}
              onClick={() => handleTabClick('confirmedVacancies')}>
              Подтвержденные вакансии</button>

            <button
              className={activeTab === 'unconfirmedVacancies' ? 'active' : ''}
              onClick={() => handleTabClick('unconfirmedVacancies')}>
              Неподтвержденные вакансии</button>

          </div>

          <div className={styles.adminCards}>{renderContent()}</div>
        </div>
      ) : "Нет прав доступа"
      }
    </div>
  );
}

export default Admin;