import React from 'react';

import styles from './SearchInput.module.scss';

function SearchInput({ title, type, name, placeholder, value }) {
    return (
        <div className={styles.searchInput}>
            <label htmlFor={name} className={`dark-text`}>{title}</label>

            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
            />

        </div>
    )
}

export default SearchInput;