"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './HealthCenter.module.css';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  path: string;
  bgColor: string;
}

interface Tab {
  id: string;
  label: string;
}

const HealthCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('chronic');

  const tabs: Tab[] = [
    { id: 'chronic', label: 'Chronic Conditions' },
    { id: 'sexual', label: 'Sexual & Reproductive Health' },
    { id: 'iv', label: 'IV Therapy' },
    { id: 'pata', label: 'Pata Tiba Model' },
    { id: 'telehealth', label: 'Telehealth Services' }
  ];

  const servicesByCategory: Record<string, ServiceCard[]> = {
    chronic: [
      {
        id: 'mzima',
        title: 'Mzima Chronic Care Program',
        description: 'Personalised chronic care for your long-term health',
        path: '/health/chronic/mzima',
        bgColor: '#F5E6E8'
      },
      {
        id: 'hypertension',
        title: 'Hypertension',
        description: 'Take Control of Your Blood Pressure',
        path: '/health/chronic/hypertension',
        bgColor: '#E8EEF1'
      },
      {
        id: 'diabetes',
        title: 'Diabetes',
        description: 'Keep your blood sugar in check, stay healthy',
        path: '/health/chronic/diabetes',
        bgColor: '#F0F0F0'
      },
      {
        id: 'sickle',
        title: 'Sickle Cell',
        description: 'Sickle Cell Care That Fits Your Life with Mzima',
        path: '/health/chronic/sickle-cell',
        bgColor: '#DC143C'
      },
      {
        id: 'lupus',
        title: 'Lupus',
        description: 'Manage lupus with care and stay in control of your health',
        path: '/health/chronic/lupus',
        bgColor: '#F5F5DC'
      },
      {
        id: 'arthritis',
        title: 'Arthritis',
        description: 'Arthritis Care Made Easier with Mzima',
        path: '/health/chronic/arthritis',
        bgColor: '#E8F4E0'
      }
    ],
    sexual: [
      {
        id: 'family',
        title: 'Family Planning',
        description: 'Smart choices for birth control',
        path: '/health/sexual/family-planning',
        bgColor: '#F5E6E8'
      },
      {
        id: 'sexual',
        title: 'Sexual health',
        description: 'Your Sexual Health, Your Confidence',
        path: '/health/sexual/sexual-health',
        bgColor: '#E8EEF1'
      },
      {
        id: 'prep',
        title: 'Pre-Exposure Prophylaxis (PrEP)',
        description: 'Reliable prevention strategies to reduce the risk of HIV infection before exposure',
        path: '/health/sexual/prep',
        bgColor: '#F5E6E8'
      },
      {
        id: 'pep',
        title: 'Post-Exposure Prophylaxis (PEP)',
        description: 'Emergency HIV prevention after possible exposure',
        path: '/health/sexual/pep',
        bgColor: '#F5E6E8'
      }
    ],
    iv: [
      {
        id: 'iv',
        title: 'IV Therapy',
        description: 'Rehydrate, refresh, and boost your wellness',
        path: '/health/iv-therapy',
        bgColor: '#F5F5F5'
      }
    ],
    pata: [
      {
        id: 'pata',
        title: 'Pata Tiba Model',
        description: 'Pata Tiba na Thao! Get Treated at a Fixed Fee',
        path: '/health/pata-tiba',
        bgColor: '#F5F5F5'
      }
    ],
    telehealth: [
      {
        id: 'telehealth',
        title: 'Telehealth',
        description: 'Easy, remote access to quality healthcare anytime',
        path: '/health/telehealth',
        bgColor: '#F5F5F5'
      }
    ]
  };

  const currentServices = servicesByCategory[activeTab] || servicesByCategory.chronic;
  const currentTitle = tabs.find(t => t.id === activeTab)?.label || 'Chronic Conditions';

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

      <nav className={styles.tabs} role="tablist" aria-label="Health service categories">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <section 
        className={styles.content}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={activeTab}
      >
        <h2 className={styles.sectionTitle}>{currentTitle}</h2>
        <div className={styles.grid}>
          {currentServices.map(service => (
            <article
              key={service.id}
              className={styles.card}
              style={{ backgroundColor: service.bgColor }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                </div>
                <Link 
                  href={service.path}
                  className={styles.cardLink}
                  aria-label={`Learn more about ${service.title}`}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path 
                      d="M7 17L17 7M17 7H7M17 7V17" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HealthCenter;