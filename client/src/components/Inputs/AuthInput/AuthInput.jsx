import React from 'react';

import styles from './AuthInput.module.scss';

function AuthInput({ title, type, name, value }) {
    return (
        <div className={styles.authInput}>
            <label htmlFor={name} className={`dark-text`}>{title}</label>

            <input
                type={type}
                name={name}
                value={value}
            />

        </div>
    )
}

export default AuthInput;