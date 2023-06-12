import React from 'react';

import styles from './SearchForm.module.scss';

import SearchInput from '../../Inputs/SearchInput/SearchInput';
import BlueButton from '../../Buttons/BlueButton/BlueButton';

function SearchForm({ inputConfigs, onSubmit }) {
  return (
    <form className={styles.searchForm} onSubmit={onSubmit}>
        {inputConfigs.map((inputConfig, index) => (
        <SearchInput
          key={index}
          title={inputConfig.title}
          type={inputConfig.type}
          name={inputConfig.name}
          placeholder={inputConfig.placeholder}
        />
      ))}
      <BlueButton title={"Найти"}/>
    </form>
  );
};

export default SearchForm;