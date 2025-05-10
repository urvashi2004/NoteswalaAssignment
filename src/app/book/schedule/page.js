"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import styles from '../../../styles/BookSession.module.css';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Suspense } from 'react';
import BookingForm from './bookingForm';

const Calendar = dynamic(() => import('react-calendar'), { ssr: false });

export default function SchedulePage() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const getTimeSlots = () => {
    if (!selectedDay) return [];

    const dayOfWeek = new Date(selectedDay).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return ['Check Next Availability'];
    }
    return ['10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm'];
  };

  const getServiceDetails = () => {
    if (!selectedDay || !selectedTime) return null;

    return {
      service: 'TV COMMERCIAL',
      date: new Date(selectedDay).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      time: selectedTime,
      staff: 'Staff Member #1',
      duration: '1 hr',
      meeting: 'Creative Meeting',
    };
  };

  const serviceDetails = getServiceDetails();

  if (showBookingForm) {
    return <BookingForm serviceDetails={serviceDetails} />;
  }

  return (
    <div className={styles.container}>
      <Link href="/book" className={styles.backButton}>
        &lt; Back
      </Link>
      <h1 style={{ textAlign: 'left' }}>Schedule your service</h1>
      <p style={{ textAlign: 'left' }}>Check out our availability and book the date and time that works for you</p>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h2 style={{ textAlign: 'left' }}>Select a Date</h2>
          <Calendar
            onClickDay={(value) => handleDayClick(value)}
          />
        </div>
        <div className={styles.column}>
          <h2 style={{ textAlign: 'left' }}>Time Zone : GMT (+5:30)</h2>
          <p style={{ textAlign: 'left' }}>
            {selectedDay
              ? `Availability for ${new Date(selectedDay).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}`
              : 'Select a Date to View Availability'}
          </p>
          <div className={styles.timeBoxes}>
            {getTimeSlots().map((slot, index) => (
              <div
                key={index}
                className={styles.timeBox}
                onClick={() => handleTimeClick(slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.column}>
          <h2 style={{ textAlign: 'left' }}>Service Details</h2>
          {serviceDetails ? (
            <div>
              <p style={{ textAlign: 'left' }}>{serviceDetails.service}</p>
              <p style={{ textAlign: 'left' }}>{serviceDetails.date} at {serviceDetails.time}</p>
              <p style={{ textAlign: 'left' }}>{serviceDetails.staff}</p>
              <p style={{ textAlign: 'left' }}>{serviceDetails.duration}</p>
              <p style={{ textAlign: 'left' }}>{serviceDetails.meeting}</p>
            </div>
          ) : (
            <p style={{ textAlign: 'left' }}>Please select a date and time to see the details.</p>
          )}
          {serviceDetails && (
            <button
              className={styles.nextButton}
              onClick={() => setShowBookingForm(true)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
