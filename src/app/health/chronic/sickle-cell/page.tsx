'use client';

import React from 'react';
import styles from './SickleCell.module.css';

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

interface Statistic {
  value: string;
  label: string;
}

const SickleCell: React.FC = () => {
  const services: ServiceCard[] = [
    {
      title: 'Comprehensive Care Coordination',
      description: 'Multidisciplinary team approach ensuring continuity of care across all touchpoints.',
      icon: '🏥'
    },
    {
      title: 'Pain Crisis Management',
      description: 'Evidence-based protocols for acute and chronic pain management with 24/7 support.',
      icon: '💊'
    },
    {
      title: 'Preventive Care Programs',
      description: 'Proactive interventions to reduce complications and improve long-term outcomes.',
      icon: '🛡️'
    },
    {
      title: 'Genetic Counseling',
      description: 'Professional guidance on hereditary aspects and family planning considerations.',
      icon: '🧬'
    }
  ];

  const statistics: Statistic[] = [
    { value: '24/7', label: 'Clinical Support' },
    { value: '98%', label: 'Patient Satisfaction' },
    { value: '15+', label: 'Years Experience' },
    { value: '5,000+', label: 'Patients Served' }
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Sickle Cell Care That Fits Your Life
          </h1>
          <p className={styles.heroSubtitle}>
            Comprehensive, patient-centered care designed to help you manage sickle cell disease 
            with confidence and dignity. Our integrated approach combines clinical excellence 
            with compassionate support.
          </p>
          <div className={styles.ctaGroup}>
            <button className={styles.ctaPrimary}>Schedule Consultation</button>
            <button className={styles.ctaSecondary}>Learn More</button>
          </div>
        </div>
      </section>

      <section className={styles.statistics}>
        <div className={styles.statsGrid}>
          {statistics.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.services}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionDescription}>
            Evidence-based care tailored to your unique needs
          </p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <article key={index} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.approach}>
        <div className={styles.approachContent}>
          <h2 className={styles.sectionTitle}>Our Approach</h2>
          <div className={styles.approachGrid}>
            <div className={styles.approachItem}>
              <h3 className={styles.approachTitle}>Patient-Centered Philosophy</h3>
              <p className={styles.approachText}>
                We recognize that sickle cell disease affects every aspect of life. 
                Our care model prioritizes your goals, preferences, and quality of life.
              </p>
            </div>
            <div className={styles.approachItem}>
              <h3 className={styles.approachTitle}>Evidence-Based Treatment</h3>
              <p className={styles.approachText}>
                Our protocols align with current clinical guidelines from leading 
                hematology organizations, ensuring you receive the highest standard of care.
              </p>
            </div>
            <div className={styles.approachItem}>
              <h3 className={styles.approachTitle}>Holistic Support</h3>
              <p className={styles.approachText}>
                Beyond medical treatment, we provide psychological support, nutritional 
                guidance, and care coordination to address all dimensions of wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Begin Your Care Journey?</h2>
          <p className={styles.ctaText}>
            Our team is here to provide the specialized care and support you deserve.
          </p>
          <button className={styles.ctaPrimary}>Contact Us Today</button>
        </div>
      </section>
    </div>
  );
};

export default SickleCell;