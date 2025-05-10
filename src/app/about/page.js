"use client"

import styles from '../../styles/About.module.css';
import Image from 'next/image';
import AdamImage from '../../../public/images/Adam.jpg';
import { FaFacebookF, FaTwitter, FaVimeoV, FaInstagram, FaExclamationCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function About() {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const newErrors = {};

    // Validate each field
    ['firstName', 'lastName', 'email'].forEach((field) => {
      const value = form[field].value.trim();
      if (!value) {
        if (field === 'firstName') {
          newErrors[field] = 'Enter a first name.';
        } else if (field === 'lastName') {
          newErrors[field] = 'Enter a last name.';
        } else if (field === 'email') {
          newErrors[field] = 'Enter an email address like example@mysite.com.';
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Submit the form if no errors
      console.log('Form submitted successfully');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageContainer}>
          <Image src={AdamImage} alt="Adam Scharf" className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1>ABOUT ADAM SCHARF</h1>
          <p>
            I'm a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
            <br/><br/>
            This is a great space to write long text about your company and your services. You can use this space to go into a little more detail about your company. Talk about your team and what services you provide. Tell your visitors the story of how you came up with the idea for your business and what makes you different from your competitors. Make your company stand out and show your visitors who you are.
          </p>
        </div>
      </div>
      <div className={styles.sectionBreak}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.awardsContainer}>
          <h2>AWARDS & RECOGNITIONS</h2>
          <ul>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
            <li>2035 - Add Award Name - Add City</li>
          </ul>
        </div>
        <div className={styles.contactContainer}>
          <h2>CONTACT</h2>
          <p>info@mysite.com</p>
          <div className={styles.lineBreak}></div>
          <p>Tel: 123-456-7890</p>
          <div className={styles.socialIcons}>
            <FaFacebookF className={styles.icon} />
            <FaInstagram className={styles.icon} />
            <FaTwitter className={styles.icon} />
            <FaVimeoV className={styles.icon} />
          </div>
        </div>
      </div>
      <div className={styles.sectionBreak}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.contactForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">First Name *</label>
              <input type="text" id="firstName" name="firstName" />
              {errors.firstName && (
                <p className={styles.errorMessage}>
                  <FaExclamationCircle className={styles.errorIcon} /> {errors.firstName}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Last Name *</label>
              <input type="text" id="lastName" name="lastName" />
              {errors.lastName && (
                <p className={styles.errorMessage}>
                  <FaExclamationCircle className={styles.errorIcon} /> {errors.lastName}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" />
              {errors.email && (
                <p className={styles.errorMessage}>
                  <FaExclamationCircle className={styles.errorIcon} /> {errors.email}
                </p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" />
              {errors.subject && <p className={styles.errorMessage}>{errors.subject}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5"></textarea>
              {errors.message && <p className={styles.errorMessage}>{errors.message}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}