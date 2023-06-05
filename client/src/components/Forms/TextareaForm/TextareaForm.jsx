import React from 'react';

import styles from './TextareaForm.module.scss';
import '../../../assets/variables.scss';

import DefaultInput from '../../Inputs/DefaultInput/DefaultInput';
import Textarea from '../../Inputs/Textarea/Textarea';
import GreenButton from '../../Buttons/GreenButton/GreenButton';

function TextareaForm({ textareaConfigs, inputConfigs, buttonTitle, onSubmit }) {
    return (
        <div className={styles.textarea}>
            <form className={styles.textareaForm} onSubmit={onSubmit}>
                {inputConfigs.map((inputConfig, index) => (
                    <DefaultInput
                        key={index}
                        title={inputConfig.title}
                        type={inputConfig.type}
                        name={inputConfig.name}
                    />
                ))}
                {textareaConfigs.map((textareaConfig, index) => (
                    <Textarea
                        key={index}
                        title={textareaConfig.title}
                        type={textareaConfig.type}
                        name={textareaConfig.name}
                    />
                ))}
                <GreenButton type='submit' title={buttonTitle} />
            </form>
        </div>
    );
};

export default TextareaForm;