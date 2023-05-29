import React from 'react';

import styles from './DefaultForm.module.scss';
import '../../../assets/variables.scss';

import DefaultInput from '../../Inputs/DefaultInput/DefaultInput';
import GreenButton from '../../Buttons/GreenButton/GreenButton';

function DefaultForm({ inputConfigs, buttonTitle, onSubmit }) {
  return (
    <form className={styles.defaultForm} onSubmit={onSubmit}>
      {inputConfigs.map((inputConfig, index) => (
        <DefaultInput
          key={index}
          title={inputConfig.title}
          type={inputConfig.type}
          name={inputConfig.name}
        />
      ))}
      <GreenButton type='submit' title={buttonTitle}/>
    </form>
  );
};

export default DefaultForm;