"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/BookSession.module.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Suspense } from 'react';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

export default function SchedulePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScheduleContent />
    </Suspense>
  );
}

function ScheduleContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  const getTimeSlots = () => {
    if (!selectedDay) return [];

    const dayOfWeek = new Date(selectedDay).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return ['Check Next Slot'];
    }
    return ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  };

  return (
    <div className={styles.container}>
      <Link href="/book" className={styles.backButton}>
        &lt; Back
      </Link>
      <h1>Schedule your service</h1>
      <p>Check out our availability and book the date and time that works for you</p>
      <div className={styles.columns}>
        <div className={styles.column}>
          <Calendar
            onClickDay={(value) => handleDayClick(value)}
          />
        </div>
        <div className={styles.column}>
          <h2>Choose a Time</h2>
          <div className={styles.timeBoxes}>
            {getTimeSlots().map((slot, index) => (
              <div
                key={index}
                className={`${styles.timeBox} ${selectedTime === slot ? styles.selected : ''}`}
                onClick={() => handleTimeSlotClick(slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <h2>Details</h2>
          <p>Service: {title}</p>
          <p>Date: {selectedDay ? new Date(selectedDay).toLocaleDateString() : 'Not selected'}</p>
          <p>Time: {selectedTime || 'Not selected'}</p>
          <div className={styles.staffDetails}>
            <p>Staff Member #1</p>
            <p>1 hour</p>
            <p>Creative Meeting</p>
          </div>
          <button
            className={styles.nextButton}
            onClick={() => {
              if (selectedDay && selectedTime) {
                const queryParams = new URLSearchParams({
                  date: selectedDay.toISOString(),
                  time: selectedTime,
                  service: title,
                }).toString();
                window.location.href = `/book/schedule/bookingForm?${queryParams}`;
              } else {
                alert('Please select a date and time before proceeding.');
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
