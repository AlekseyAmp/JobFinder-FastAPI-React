import React from 'react';

import styles from './DefaultInput.module.scss';

function DefaultInput({ title, type, name, value }) {
    return (
        <div className={styles.defaultInput}>
            <label htmlFor={name} className={`dark-text`}>{title}</label>

            <input
                type={type}
                name={name}
                value={value}
            />

        </div>
    )
}

export default DefaultInput;