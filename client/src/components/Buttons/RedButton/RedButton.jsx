import React from 'react';

import styles from './RedButton.module.scss';

function RedButton({title, onClick}) {
  return (
    <div onClick={onClick} className={styles.redButton}>
      <button>
        {title}
      </button>
    </div>
  )
}

export default RedButton;