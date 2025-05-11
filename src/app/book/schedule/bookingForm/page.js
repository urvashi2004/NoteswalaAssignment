"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from '../../../../styles/BookSession.module.css';
import { FaExclamationCircle } from 'react-icons/fa';
import { saveBookingDetails } from '../../../../firebaseConfig';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function BookingFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFormContent />
    </Suspense>
  );
}

function BookingFormContent() {
  const searchParams = useSearchParams();

  const serviceDetails = {
    service: searchParams.get('service'),
    date: searchParams.get('date'),
    time: searchParams.get('time'),
    staff: searchParams.get('staff') || 'Not specified',
    duration: searchParams.get('duration') || 'Not specified',
    meeting: searchParams.get('meeting') || 'Not specified',
  };

  return <BookingForm serviceDetails={serviceDetails} />;
}

function BookingForm({ serviceDetails }) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    ['firstName', 'lastName', 'email'].forEach((field) => {
      const value = formData[field].trim();
      if (!value) {
        newErrors[field] = `Enter a valid ${field}.`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const bookingData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        service: serviceDetails.service,
        date: serviceDetails.date,
        time: serviceDetails.time,
        createdAt: new Date(),
      };

      try {
        const docId = await saveBookingDetails(bookingData);
        alert("Booking confirmed!");
      } catch (error) {
        console.error("Error saving booking:", error);
        alert("Failed to save booking.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Link href="/book/schedule" className={styles.backButton}>
        &lt; Back
      </Link>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h2>Booking Form</h2>
          <form onSubmit={handleSubmit}>
            <h3>Client Details</h3>
            <p>Have an account? <a href="#">Log in</a></p>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className={styles.errorMessage}>
                  <FaExclamationCircle className={styles.errorIcon} /> {errors.firstName}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className={styles.errorMessage}>
                  <FaExclamationCircle className={styles.errorIcon} /> {errors.lastName}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className={styles.errorMessage}>
                  <FaExclamationCircle className={styles.errorIcon} /> {errors.email}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Add your message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </form>
        </div>
        <div className={styles.column}>
          <h3>Booking Details</h3>
          <div className={styles.sectionBreak}></div>
          <p>{serviceDetails.service}</p>
          <p>{serviceDetails.date} at {serviceDetails.time}</p>
          <p>{serviceDetails.staff}</p>
          <p>{serviceDetails.duration}</p>
          <div className={styles.sectionBreak}></div>
          <p>Payment Details</p>
          <p>{serviceDetails.meeting}</p>
          <div className={styles.sectionBreak}></div>
          <p>By completing your booking, you agree to receive related SMS notifications.</p>
          <button
            type="submit"
            className={styles.bookNowButton}
            onClick={handleSubmit}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
