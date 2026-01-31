import React from 'react';
import styles from './Lupus.module.css';

interface SymptomCard {
  title: string;
  description: string;
  icon: string;
}

interface ManagementStrategy {
  category: string;
  recommendations: string[];
}

const Lupus: React.FC = () => {
  const commonSymptoms: SymptomCard[] = [
    {
      title: 'Fatigue',
      description: 'Persistent exhaustion that interferes with daily activities',
      icon: '😴'
    },
    {
      title: 'Joint Pain',
      description: 'Inflammation and swelling in multiple joints',
      icon: '🦴'
    },
    {
      title: 'Skin Rashes',
      description: 'Butterfly-shaped rash across cheeks and nose',
      icon: '🦋'
    },
    {
      title: 'Photosensitivity',
      description: 'Increased sensitivity to sunlight and UV exposure',
      icon: '☀️'
    }
  ];

  const managementStrategies: ManagementStrategy[] = [
    {
      category: 'Medical Management',
      recommendations: [
        'Adhere to prescribed medication regimen',
        'Attend regular rheumatology appointments',
        'Monitor for disease flares and complications',
        'Coordinate care with healthcare team'
      ]
    },
    {
      category: 'Lifestyle Modifications',
      recommendations: [
        'Maintain consistent sleep schedule',
        'Practice stress reduction techniques',
        'Engage in low-impact exercise activities',
        'Follow anti-inflammatory nutrition guidelines'
      ]
    },
    {
      category: 'Sun Protection',
      recommendations: [
        'Apply broad-spectrum SPF 50+ sunscreen daily',
        'Wear protective clothing and wide-brimmed hats',
        'Avoid peak sun exposure hours (10 AM - 4 PM)',
        'Seek shade when outdoors'
      ]
    }
  ];

  const warningSignsData: string[] = [
    'High fever (above 38.3°C / 101°F)',
    'Severe chest pain or difficulty breathing',
    'Sudden severe headache or vision changes',
    'Swelling in legs, ankles, or around eyes',
    'Blood in urine or decreased urination',
    'Severe abdominal pain',
    'Confusion or difficulty concentrating'
  ];

  return (
    <main className={styles.lupusContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.mainTitle}>Living with Systemic Lupus Erythematosus</h1>
          <p className={styles.heroDescription}>
            Comprehensive guidance for managing lupus and maintaining optimal health through
            evidence-based care strategies and lifestyle modifications.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Understanding Lupus</h2>
        </div>
        <div className={styles.infoCard}>
          <p className={styles.bodyText}>
            Systemic Lupus Erythematosus (SLE) is a chronic autoimmune condition where the
            immune system attacks healthy tissues throughout the body. This can affect multiple
            organ systems including joints, skin, kidneys, heart, lungs, and brain. While lupus
            is a lifelong condition, appropriate medical management and lifestyle adjustments
            can help control symptoms and prevent complications.
          </p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Common Symptoms</h2>
        </div>
        <div className={styles.symptomGrid}>
          {commonSymptoms.map((symptom, index) => (
            <article key={index} className={styles.symptomCard}>
              <span className={styles.symptomIcon} aria-hidden="true">{symptom.icon}</span>
              <h3 className={styles.symptomTitle}>{symptom.title}</h3>
              <p className={styles.symptomDescription}>{symptom.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Management Strategies</h2>
        </div>
        {managementStrategies.map((strategy, index) => (
          <div key={index} className={styles.managementCard}>
            <h3 className={styles.managementCategory}>{strategy.category}</h3>
            <ul className={styles.recommendationList}>
              {strategy.recommendations.map((recommendation, recIndex) => (
                <li key={recIndex} className={styles.recommendationItem}>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.contentSection}>
        <div className={styles.alertCard}>
          <div className={styles.alertHeader}>
            <h2 className={styles.alertTitle}>Warning Signs Requiring Immediate Medical Attention</h2>
          </div>
          <p className={styles.alertIntro}>
            Contact your healthcare provider immediately or seek emergency care if you experience:
          </p>
          <ul className={styles.warningList}>
            {warningSignsData.map((sign, index) => (
              <li key={index} className={styles.warningItem}>
                {sign}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Partner with Your Healthcare Team</h2>
          <p className={styles.ctaDescription}>
            Effective lupus management requires ongoing collaboration with rheumatologists,
            primary care physicians, and specialists. Regular monitoring, open communication,
            and adherence to treatment plans are essential for optimal outcomes.
          </p>
          <div className={styles.ctaActions}>
            <button className={styles.primaryButton} type="button">
              Find a Specialist
            </button>
            <button className={styles.secondaryButton} type="button">
              Download Resources
            </button>
          </div>
        </div>
      </section>

      <footer className={styles.disclaimer}>
        <p className={styles.disclaimerText}>
          This information is for educational purposes only and does not constitute medical advice.
          Always consult with qualified healthcare professionals regarding your specific condition
          and treatment options.
        </p>
      </footer>
    </main>
  );
};

export default Lupus;