import React from 'react';

import styles from './Textarea.module.scss';

function Textarea({ title, type, name, value }) {
    return (
        <div className={styles.textarea}>
            <label htmlFor={name} className={`dark-text`}>{title}</label>

            <textarea
                type={type}
                name={name}
            />

        </div>
    )
}

export default Textarea;