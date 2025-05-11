"use client"

import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import styles from '../../styles/Login.module.css';
import { signInWithGoogle, signInAnonymouslyHandler, signUpWithEmail, logInWithEmail } from '../../firebaseConfig';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      console.log('Google Sign-In successful:', user);
    } catch (error) {
      alert('Google Sign-In failed. Please try again.');
    }
  };

  const handleAnonymousSignIn = async () => {
    try {
      const user = await signInAnonymouslyHandler();
      console.log('Anonymous Sign-In successful:', user);
    } catch (error) {
      alert('Anonymous Sign-In failed. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const user = await logInWithEmail(formData.email, formData.password);
        console.log('Login successful:', user);
      } else {
        const user = await signUpWithEmail(formData.email, formData.password);
        console.log('Signup successful:', user);
      }
    } catch (error) {
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isLogin ? 'Log In' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Log In' : 'Sign Up'}</button>
      </form>
      <div className={styles.authIcons}>
        <button className={styles.iconButton} onClick={handleGoogleSignIn}><FaGoogle /> Continue with Google</button>
        <button className={styles.iconButton} onClick={handleAnonymousSignIn}>Continue as Guest</button>
      </div>
      <p>
        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
        <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleButton}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </div>
  );
}
