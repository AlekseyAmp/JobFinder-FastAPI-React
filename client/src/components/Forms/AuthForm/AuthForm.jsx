import React from 'react';
import { Link } from 'react-router-dom';

import styles from './AuthForm.module.scss';

import DefaultInput from '../../Inputs/DefaultInput/DefaultInput';
import GreenButton from '../../Buttons/GreenButton/GreenButton';

function AuthForm({ inputConfigs, buttonTitle, authHelpText, authHelpLink, authHelpPage, onSubmit }) {
  return (
    <form className={styles.authForm} onSubmit={onSubmit}>
      <div className={styles.authHelp}>
        <p className={`dark-text`}>{authHelpText}</p>
        <Link to={authHelpLink} className={`link-text-blue`}>{authHelpPage}</Link>
      </div>
      {inputConfigs.map((inputConfig, index) => (
        <DefaultInput
          key={index}
          title={inputConfig.title}
          type={inputConfig.type}
          name={inputConfig.name}
        />
      ))}
      <GreenButton title={buttonTitle}/>
    </form>
  );
};

export default AuthForm;