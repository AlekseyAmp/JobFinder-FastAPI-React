import React from 'react';

import styles from './FilterBar.module.scss';

import BlueButton from '../Buttons/BlueButton/BlueButton';

function FilterBar({ is_vacancies = false, is_applicants = false, onSubmit }) {
  return (
    <div className={styles.filterBar}>
      {is_vacancies &&
        <form className={styles.filterBarContent} onSubmit={onSubmit}>
          <div className={styles.filterBarBlock}>
            <h3 className={`bold-text`}>Город</h3>
            <select className={`${styles.citySelect} ${`blue-text`}`} name="place">
              <option className={`dark-text`} value="Москва">Москва</option>
              <option className={`dark-text`} value="Санкт-Петербург">Санкт-Петербург</option>
              <option className={`dark-text`} value="Новосибирск">Новосибирск</option>
              {/* Add other cities here */}
            </select>

          </div>

          <div className={`line`}></div>

          <div className={styles.filterBarBlock}>
            <h3 className={`bold-text`}>Уровень дохода</h3>
            <div className={styles.filterBarBlockForm}>

              <label>
                <input value="25-59" type="radio" name="salary" />
                <span className={`dark-text`}>От 25.000 до 59.000 руб.</span>
              </label>

              <label>
                <input value="60-109" type="radio" name="salary" />
                <span className={`dark-text`}>От 60.000 до 109.000 руб.</span>
              </label>

              <label>
                <input value="110-159" type="radio" name="salary" />
                <span className={`dark-text`}>От 110.000 до 159.000 руб.</span>
              </label>

              <label>
                <input value="160" type="radio" name="salary" />
                <span className={`dark-text`}>От 160.000+ руб.</span>
              </label>

            </div>
          </div>

          <div className={`line`}></div>

          <div className={styles.filterBarBlock}>
            <h3 className={`bold-text`}>Опыт</h3>
            <div className={styles.filterBarBlockForm}>
              <label>
                <input value="0" type="radio" name="experience" />
                <span className={`dark-text`}>Нет опыта</span>
              </label>

              <label>
                <input value="1-3" type="radio" name="experience" />
                <span className={`dark-text`}>От 1 до 3 лет</span>
              </label>

              <label>
                <input value="4-7" type="radio" name="experience" />
                <span className={`dark-text`}>От 4 до 7 лет</span>
              </label>

              <label>
                <input value="8" type="radio" name="experience" />
                <span className={`dark-text`}>От 8+ лет</span>
              </label>

            </div>
          </div>

          <div className={`line`}></div>
          <BlueButton title={"Применить"} />
        </form>
      }
      {is_applicants &&
        <form className={styles.filterBarContent} onSubmit={onSubmit}>

          <div className={styles.filterBarBlock}>
            <h3 className={`bold-text`}>Желаемый уровень дохода</h3>

            <div className={styles.filterBarBlockForm}>

              <label>
                <input value="25-59" type="radio" name="salary" />
                <span className={`dark-text`}>От 25.000 до 59.000 руб.</span>
              </label>

              <label>
                <input value="60-109" type="radio" name="salary" />
                <span className={`dark-text`}>От 60.000 до 109.000 руб.</span>
              </label>

              <label>
                <input value="110-159" type="radio" name="salary" />
                <span className={`dark-text`}>От 110.000 до 159.000 руб.</span>
              </label>

              <label>
                <input value="160" type="radio" name="salary" />
                <span className={`dark-text`}>От 160.000+ руб.</span>
              </label>

            </div>
          </div>

          <div className={`line`}></div>

          <div className={styles.filterBarBlock}>
            <h3 className={`bold-text`}>Опыт</h3>

            <div className={styles.filterBarBlockForm}>
              <label>
                <input value="0" type="radio" name="experience" />
                <span className={`dark-text`}>Нет опыта</span>
              </label>

              <label>
                <input value="1-3" type="radio" name="experience" />
                <span className={`dark-text`}>От 1 до 3 лет</span>
              </label>

              <label>
                <input value="4-7" type="radio" name="experience" />
                <span className={`dark-text`}>От 4 до 7 лет</span>
              </label>

              <label>
                <input value="8" type="radio" name="experience" />
                <span className={`dark-text`}>От 8+ лет</span>
              </label>

            </div>
          </div>

          <div className={`line`}></div>

          <BlueButton title={"Применить"} />
        </form>
      }
    </div>
  );
}

export default FilterBar;
