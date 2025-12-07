"use client";

import React, { useState } from 'react';
import styles from './HealthCenter.module.css';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const HealthCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chronic');

  const tabs = [
    { id: 'chronic', label: 'Chronic Conditions' },
    { id: 'sexual', label: 'Sexual & Reproductive Health' },
    { id: 'iv', label: 'IV Therapy' },
    { id: 'pata', label: 'Pata Tiba Model' },
    { id: 'telehealth', label: 'Telehealth Services' }
  ];

  const chronicServices: ServiceCard[] = [
    {
      id: 'mzima',
      title: 'Mzima Chronic Care Program',
      description: 'Personalised chronic care for your long-term health',
      image: '/images/mzima.jpg',
      bgColor: '#F5E6E8'
    },
    {
      id: 'hypertension',
      title: 'Hypertension',
      description: 'Take Control of Your Blood Pressure',
      image: '/images/hypertension.jpg',
      bgColor: '#E8EEF1'
    },
    {
      id: 'diabetes',
      title: 'Diabetes',
      description: 'Keep your blood sugar in check, stay healthy',
      image: '/images/diabetes.jpg',
      bgColor: '#F0F0F0'
    },
    {
      id: 'sickle',
      title: 'Sickle Cell',
      description: 'Sickle Cell Care That Fits Your Life with Mzima',
      image: '/images/sickle.jpg',
      bgColor: '#DC143C'
    },
    {
      id: 'lupus',
      title: 'Lupus',
      description: 'Manage lupus with care and stay in control of your health',
      image: '/images/lupus.jpg',
      bgColor: '#F5F5DC'
    },
    {
      id: 'arthritis',
      title: 'Arthritis',
      description: 'Arthritis Care Made Easier with Mzima',
      image: '/images/arthritis.jpg',
      bgColor: '#E8F4E0'
    }
  ];

  const sexualServices: ServiceCard[] = [
    {
      id: 'family',
      title: 'Family Planning',
      description: 'Smart choices for birth control',
      image: '/images/family.jpg',
      bgColor: '#F5E6E8'
    },
    {
      id: 'sexual',
      title: 'Sexual health',
      description: 'Your Sexual Health, Your Confidence',
      image: '/images/sexual.jpg',
      bgColor: '#E8EEF1'
    },
    {
      id: 'prep',
      title: 'Pre-Exposure Prophylaxis (PrEP)',
      description: 'Reliable prevention strategies to reduce the risk of HIV infection before exposure',
      image: '/images/prep.jpg',
      bgColor: '#F5E6E8'
    },
    {
      id: 'pep',
      title: 'Post-Exposure Prophylaxis (PEP)',
      description: 'Emergency HIV prevention after possible exposure',
      image: '/images/pep.jpg',
      bgColor: '#F5E6E8'
    }
  ];

  const ivServices: ServiceCard[] = [
    {
      id: 'iv',
      title: 'IV Therapy',
      description: 'Rehydrate, refresh, and boost your wellness',
      image: '/images/iv.jpg',
      bgColor: '#F5F5F5'
    }
  ];

  const pataServices: ServiceCard[] = [
    {
      id: 'pata',
      title: 'Pata Tiba Model',
      description: 'Pata Tiba na Thao! Get Treated at a Fixed Fee',
      image: '/images/pata.jpg',
      bgColor: '#F5F5F5'
    }
  ];

  const telehealthServices: ServiceCard[] = [
    {
      id: 'telehealth',
      title: 'Telehealth',
      description: 'Easy, remote access to quality healthcare anytime',
      image: '/images/telehealth.jpg',
      bgColor: '#F5F5F5'
    }
  ];

  const getServices = () => {
    switch (activeTab) {
      case 'chronic': return chronicServices;
      case 'sexual': return sexualServices;
      case 'iv': return ivServices;
      case 'pata': return pataServices;
      case 'telehealth': return telehealthServices;
      default: return chronicServices;
    }
  };

  const getTitle = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab?.label || 'Chronic Conditions';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Simplify Your Health Journey With<br />My Health Center
        </h1>
        <p className={styles.subtitle}>
          All the information, resources and services you need to make smarter health choices.
        </p>
      </header>

      <nav className={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section className={styles.content}>
        <h2 className={styles.sectionTitle}>{getTitle()}</h2>
        <div className={styles.grid}>
          {getServices().map(service => (
            <article
              key={service.id}
              className={styles.card}
              style={{ backgroundColor: service.bgColor }}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <button className={styles.cardButton} aria-label={`Learn more about ${service.title}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealthCenter;