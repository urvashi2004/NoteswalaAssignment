import React from 'react';
import styles from '../styles/CustomCalendar.module.css';

const CustomCalendar = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <h2>May 2025</h2>
      </div>
      <div className={styles.daysOfWeek}>
        {daysOfWeek.map((day) => (
          <div key={day} className={styles.day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.dates}>
        {dates.map((date) => (
          <div key={date} className={styles.date}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
