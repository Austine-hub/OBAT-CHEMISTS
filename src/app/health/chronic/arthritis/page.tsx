
import React from 'react';
import styles from './Arthritis.module.css';

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => (
  <div className={styles.statCard}>
    <div className={styles.statValue}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
  </div>
);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className={styles.featureCard}>
    <div className={styles.featureIcon}>{icon}</div>
    <h3 className={styles.featureTitle}>{title}</h3>
    <p className={styles.featureDescription}>{description}</p>
  </div>
);

const Arthritis: React.FC = () => {
  const stats = [
    { value: '58.5M', label: 'Adults affected in the U.S.' },
    { value: '300+', label: 'Types of arthritis' },
    { value: '24/7', label: 'Care coordination available' }
  ];

  const features = [
    {
      icon: '🩺',
      title: 'Personalized Treatment Plans',
      description: 'Evidence-based care strategies tailored to your specific type of arthritis, lifestyle, and health goals.'
    },
    {
      icon: '💊',
      title: 'Medication Management',
      description: 'Comprehensive tracking of prescriptions, dosages, and potential interactions to optimize your treatment regimen.'
    },
    {
      icon: '📊',
      title: 'Symptom Monitoring',
      description: 'Track pain levels, joint stiffness, and mobility to identify patterns and improve treatment outcomes.'
    },
    {
      icon: '🏃',
      title: 'Physical Therapy Support',
      description: 'Access to guided exercises and movement recommendations designed to maintain joint function and reduce pain.'
    },
    {
      icon: '🔬',
      title: 'Laboratory Integration',
      description: 'Seamless access to lab results and inflammation markers to monitor disease progression and treatment efficacy.'
    },
    {
      icon: '👥',
      title: 'Specialist Network',
      description: 'Connect with rheumatologists, orthopedic specialists, and allied health professionals for comprehensive care.'
    }
  ];

  const managementTips = [
    'Maintain a healthy weight to reduce stress on weight-bearing joints',
    'Engage in low-impact exercises such as swimming or cycling',
    'Apply heat or cold therapy to affected joints as recommended',
    'Follow your prescribed medication schedule consistently',
    'Attend regular follow-up appointments with your healthcare team',
    'Consider occupational therapy for joint protection strategies'
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Arthritis Care Made Easier with Mzima</h1>
          <p className={styles.subtitle}>
            Comprehensive support for managing arthritis through integrated care coordination,
            symptom tracking, and personalized treatment strategies.
          </p>
          <button className={styles.ctaButton}>Get Started with Your Care Plan</button>
        </div>
      </header>

      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <StatCard key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Understanding Arthritis</h2>
          <p className={styles.sectionDescription}>
            Arthritis encompasses over 100 different conditions affecting joints and surrounding tissues.
            The most common types include osteoarthritis, rheumatoid arthritis, and psoriatic arthritis.
            While each type has unique characteristics, all forms of arthritis can significantly impact
            daily activities and quality of life.
          </p>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Comprehensive Arthritis Management</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className={styles.managementSection}>
        <div className={styles.managementContent}>
          <h2 className={styles.sectionTitle}>Daily Management Strategies</h2>
          <p className={styles.managementIntro}>
            Effective arthritis management combines medical treatment with lifestyle modifications.
            The following evidence-based strategies can help improve joint function and reduce symptoms:
          </p>
          <ul className={styles.managementList}>
            {managementTips.map((tip, index) => (
              <li key={index} className={styles.managementItem}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Take Control of Your Arthritis Care</h2>
          <p className={styles.ctaDescription}>
            Join thousands of patients who have improved their quality of life through
            coordinated arthritis care with Mzima Health.
          </p>
          <button className={styles.ctaButton}>Schedule Your Consultation</button>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          This information is for educational purposes only and does not constitute medical advice.
          Always consult with qualified healthcare professionals regarding your specific condition and treatment options.
        </p>
      </footer>
    </div>
  );
};

export default Arthritis;