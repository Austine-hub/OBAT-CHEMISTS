'use client';

import { useState } from 'react';
import styles from './ServicesSection.module.css';

interface Service {
  id: string;
  icon: string;
  title: string;
}

interface TabContent {
  pharmacy: Service[];
  health: Service[];
  clinics: Service[];
}

const SERVICES_DATA: TabContent = {
  pharmacy: [
    { id: 'rx-reminders', icon: '💊', title: 'Prescription Reminders and Consultations' },
    { id: 'rx-transfer', icon: '📋', title: 'Prescription Transfers and Delivery' },
    { id: 'blood-pressure', icon: '💊', title: 'Ambulatory Blood Pressure Monitoring' },
    { id: 'consultations', icon: '⚕️', title: 'Consultations and Prescription Reminders' }
  ],
  health: [
    { id: 'compression', icon: '🏪', title: 'Compression Stocking Fitting' },
    { id: 'diabetes', icon: '💼', title: 'Diabetes Services & Holter Monitoring' },
    { id: 'pill-packs', icon: '➕', title: 'Pill Packs & Rental Program' },
    { id: 'smoking', icon: '💉', title: 'Smoking Cessation' }
  ],
  clinics: [
    { id: 'compounding', icon: '⚕️', title: 'Specialty Compounding' },
    { id: 'disposal', icon: '📄', title: 'Medication Disposal & Review' },
    { id: 'methadone', icon: '💊', title: 'Methadone Dispensing Service' },
    { id: 'vaccines', icon: '➕', title: 'Vaccines & Immunizations' }
  ]
};

type TabKey = keyof TabContent;

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>('pharmacy');

  return (
    <section className={styles.section} aria-labelledby="services-heading">
      <h2 id="services-heading" className={styles.heading}>
        What do you need?
      </h2>

      <nav className={styles.tabs} role="tablist" aria-label="Service categories">
        {(['pharmacy', 'health', 'clinics'] as TabKey[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-panel`}
            id={`${tab}-tab`}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'pharmacy' ? 'Pharmacy Services' : tab === 'health' ? 'Health Products' : 'Health Clinics'}
          </button>
        ))}
      </nav>

      <div
        role="tabpanel"
        id={`${activeTab}-panel`}
        aria-labelledby={`${activeTab}-tab`}
        className={styles.panel}
      >
        <div className={styles.grid}>
          {SERVICES_DATA[activeTab].map((service) => (
            <article key={service.id} className={styles.card}>
              <div className={styles.icon} aria-hidden="true">
                <span>{service.icon}</span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
            </article>
          ))}
        </div>

        <div className={styles.actions}>
          <button className={styles.btn} aria-label="View more services">
            VIEW MORE SERVICES
          </button>
        </div>
      </div>
    </section>
  );
}