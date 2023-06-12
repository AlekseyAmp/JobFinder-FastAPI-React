import React from 'react';
import styles from './FilterBar.module.scss';

function FilterBar({ is_vacancies = false, is_applicants = false, is_employers = false }) {
  return (
    <div className={styles.filterBar}>
      {is_vacancies &&
        <div className={styles.filterBarContent}>
          <div className={styles.filterBarBlock}>
            <h3 className={`dark-text`}>Уровень дохода</h3>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp1" />
              <label className={`small-text`} htmlFor="zp1">От 25.000</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp2" />
              <label className={`small-text`} htmlFor="zp2">От 50.000</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp3" />
              <label className={`small-text`} htmlFor="zp3">От 100.000</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp4" />
              <label className={`small-text`} htmlFor="zp4">От 150.000</label>
            </div>


          </div>

          <div className={styles.filterBarBlock}>
            <h3 className={`dark-text`}>Занятость</h3>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp1" />
              <label className={`small-text`} htmlFor="zp1">5 через 2</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp2" />
              <label className={`small-text`} htmlFor="zp2">2 через 2</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp3" />
              <label className={`small-text`} htmlFor="zp3">3 через 2</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp4" />
              <label className={`small-text`} htmlFor="zp4">7 через 0</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp5" />
              <label className={`small-text`} htmlFor="zp5">Гибкий график</label>
            </div>

          </div>

          <div className={styles.filterBarBlock}>
            <h3 className={`dark-text`}>Опыт работы</h3>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp1" />
              <label className={`small-text`} htmlFor="zp1">Не нужен</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp2" />
              <label className={`small-text`} htmlFor="zp2">0-1 год</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp3" />
              <label className={`small-text`} htmlFor="zp3">1-3 года</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp4" />
              <label className={`small-text`} htmlFor="zp4">3-6 года</label>
            </div>

            <div className={styles.filterBarBlockForm}>
              <input type="checkbox" name="zp5" />
              <label className={`small-text`} htmlFor="zp5">6+ лет</label>
            </div>

          </div>
        </div>
      }
      {is_applicants &&
                <div className={styles.filterBarContent}>
                <div className={styles.filterBarBlock}>
                  <h3 className={`dark-text`}>Зарплатные ожидания</h3>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp1" />
                    <label className={`small-text`} htmlFor="zp1">От 25.000</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp2" />
                    <label className={`small-text`} htmlFor="zp2">От 50.000</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp3" />
                    <label className={`small-text`} htmlFor="zp3">От 100.000</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp4" />
                    <label className={`small-text`} htmlFor="zp4">От 150.000</label>
                  </div>
      
      
                </div>
    
                <div className={styles.filterBarBlock}>
                  <h3 className={`dark-text`}>Опыт работы</h3>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp1" />
                    <label className={`small-text`} htmlFor="zp1">Не нужен</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp2" />
                    <label className={`small-text`} htmlFor="zp2">0-1 год</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp3" />
                    <label className={`small-text`} htmlFor="zp3">1-3 года</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp4" />
                    <label className={`small-text`} htmlFor="zp4">3-6 года</label>
                  </div>
      
                  <div className={styles.filterBarBlockForm}>
                    <input type="checkbox" name="zp5" />
                    <label className={`small-text`} htmlFor="zp5">6+ лет</label>
                  </div>
      
                </div>
              </div>
      }
      {is_employers && 
              <div className={styles.filterBarContent}>
              <div className={styles.filterBarBlock}>
    
                <div className={styles.filterBarBlockForm}>
                  <input type="checkbox" name="zp1" />
                  <label className={`dark-text`} htmlFor="zp1">Рекомендованный работодатель</label>
                </div>

                <div className={styles.filterBarBlockForm}>
                  <input type="checkbox" name="zp2" />
                  <label className={`dark-text`} htmlFor="zp2">Активно ищет сотрудников</label>
                </div>
      
              </div>
            </div>
      }
    </div>
  );
}

export default FilterBar;
