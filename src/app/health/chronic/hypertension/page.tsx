'use client';

import React, { useEffect, useRef } from 'react';
import styles from './Hypertension.module.css';

interface BloodPressureRange {
  category: string;
  systolic: string;
  diastolic: string;
  status: 'normal' | 'elevated' | 'stage1' | 'stage2' | 'crisis';
}

const Hypertension: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    if (heroRef.current) observer.observe(heroRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  const bloodPressureRanges: BloodPressureRange[] = [
    {
      category: 'Normal',
      systolic: 'Less than 120',
      diastolic: 'Less than 80',
      status: 'normal'
    },
    {
      category: 'Elevated',
      systolic: '120-129',
      diastolic: 'Less than 80',
      status: 'elevated'
    },
    {
      category: 'Stage 1 Hypertension',
      systolic: '130-139',
      diastolic: '80-89',
      status: 'stage1'
    },
    {
      category: 'Stage 2 Hypertension',
      systolic: '140 or higher',
      diastolic: '90 or higher',
      status: 'stage2'
    },
    {
      category: 'Hypertensive Crisis',
      systolic: 'Higher than 180',
      diastolic: 'Higher than 120',
      status: 'crisis'
    }
  ];

  const lifestyleModifications = [
    {
      title: 'Dietary Approaches',
      items: [
        'Follow the DASH (Dietary Approaches to Stop Hypertension) eating plan',
        'Reduce sodium intake to less than 2,300 mg per day, ideally 1,500 mg',
        'Increase potassium-rich foods such as fruits and vegetables',
        'Limit alcohol consumption to moderate levels'
      ]
    },
    {
      title: 'Physical Activity',
      items: [
        'Engage in at least 150 minutes of moderate-intensity aerobic activity weekly',
        'Include muscle-strengthening activities two or more days per week',
        'Consult your healthcare provider before starting a new exercise program'
      ]
    },
    {
      title: 'Weight Management',
      items: [
        'Maintain a healthy body weight (BMI 18.5-24.9)',
        'Even modest weight loss can significantly reduce blood pressure',
        'Work with healthcare professionals to develop a sustainable plan'
      ]
    },
    {
      title: 'Stress Reduction',
      items: [
        'Practice relaxation techniques such as deep breathing or meditation',
        'Ensure adequate sleep (7-9 hours for most adults)',
        'Identify and address sources of chronic stress'
      ]
    }
  ];

  const warningSignsData = [
    'Severe headache',
    'Chest pain or tightness',
    'Difficulty breathing',
    'Vision changes or blurred vision',
    'Blood in urine',
    'Irregular heartbeat',
    'Severe anxiety',
    'Nosebleeds'
  ];

  return (
    <div className={styles.container}>
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Hypertension Management</h1>
          <p className={styles.subtitle}>
            Evidence-Based Strategies for Blood Pressure Control
          </p>
          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>1.28B</span>
              <span className={styles.statLabel}>Adults affected worldwide</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>46%</span>
              <span className={styles.statLabel}>Unaware of their condition</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Understanding Blood Pressure Classifications</h2>
          <p className={styles.sectionDescription}>
            According to the American Heart Association and American College of Cardiology guidelines
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.bpTable}>
            <thead>
              <tr>
                <th>Category</th>
                <th>Systolic (mm Hg)</th>
                <th>Diastolic (mm Hg)</th>
              </tr>
            </thead>
            <tbody>
              {bloodPressureRanges.map((range, index) => (
                <tr key={index} className={styles[range.status]}>
                  <td className={styles.categoryCell}>
                    <span className={styles.statusIndicator}></span>
                    {range.category}
                  </td>
                  <td>{range.systolic}</td>
                  <td>{range.diastolic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.note}>
          <p>
            <strong>Important:</strong> Blood pressure measurements should be taken at rest, with proper technique.
            Multiple readings over time are necessary for accurate diagnosis. Consult your healthcare provider
            for personalized assessment and treatment recommendations.
          </p>
        </div>
      </section>

      <section className={styles.section} ref={statsRef}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Lifestyle Modifications</h2>
          <p className={styles.sectionDescription}>
            First-line interventions proven to reduce blood pressure
          </p>
        </div>

        <div className={styles.lifestyleGrid}>
          {lifestyleModifications.map((category, index) => (
            <div key={index} className={styles.lifestyleCard}>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <ul className={styles.cardList}>
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.warningSection}>
          <div className={styles.warningSectionHeader}>
            <h2 className={styles.sectionTitle}>Recognize Hypertensive Emergency</h2>
            <p className={styles.sectionDescription}>
              Seek immediate medical attention if experiencing any of these symptoms
            </p>
          </div>

          <div className={styles.warningGrid}>
            {warningSignsData.map((sign, index) => (
              <div key={index} className={styles.warningItem}>
                <span className={styles.warningIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span>{sign}</span>
              </div>
            ))}
          </div>

          <div className={styles.emergencyNote}>
            <p>
              If blood pressure exceeds 180/120 mm Hg and you are experiencing any of these symptoms,
              call emergency services immediately. This may indicate a hypertensive crisis requiring
              urgent medical intervention.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.monitoringSection}>
          <h2 className={styles.sectionTitle}>Home Blood Pressure Monitoring</h2>
          <div className={styles.monitoringContent}>
            <div className={styles.monitoringText}>
              <h3>Benefits of Regular Monitoring</h3>
              <ul>
                <li>Provides more comprehensive data than office measurements alone</li>
                <li>Helps identify white coat hypertension and masked hypertension</li>
                <li>Enables assessment of treatment effectiveness</li>
                <li>Promotes patient engagement and adherence to treatment</li>
              </ul>

              <h3>Proper Measurement Technique</h3>
              <ol>
                <li>Rest quietly for five minutes before measuring</li>
                <li>Sit with back supported and feet flat on the floor</li>
                <li>Position arm at heart level, supported on a flat surface</li>
                <li>Use an appropriately sized cuff on bare skin</li>
                <li>Take two or three readings one minute apart and record the average</li>
                <li>Measure at the same time each day</li>
              </ol>
            </div>

            <div className={styles.monitoringTips}>
              <h4>Recommendations</h4>
              <div className={styles.tip}>
                <strong>Device Selection:</strong> Use a validated, automated upper-arm monitor.
                Wrist and finger monitors are generally less accurate.
              </div>
              <div className={styles.tip}>
                <strong>Recording:</strong> Maintain a log of readings to share with your healthcare provider.
                Many devices offer digital tracking capabilities.
              </div>
              <div className={styles.tip}>
                <strong>Calibration:</strong> Bring your home monitor to medical appointments
                periodically to verify accuracy against clinical measurements.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.resourcesSection}>
          <h2 className={styles.sectionTitle}>Professional Resources</h2>
          <div className={styles.resourcesGrid}>
            <div className={styles.resourceCard}>
              <h3>Clinical Guidelines</h3>
              <p>
                American Heart Association and American College of Cardiology provide
                comprehensive guidelines for the prevention, detection, evaluation,
                and management of high blood pressure in adults.
              </p>
            </div>
            <div className={styles.resourceCard}>
              <h3>Patient Education</h3>
              <p>
                The National Heart, Lung, and Blood Institute offers evidence-based
                educational materials on hypertension management and cardiovascular health.
              </p>
            </div>
            <div className={styles.resourceCard}>
              <h3>Medication Management</h3>
              <p>
                Work closely with your healthcare team to determine if pharmacological
                intervention is necessary. Never discontinue medications without
                consulting your provider.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.disclaimer}>
          <strong>Medical Disclaimer:</strong> This information is provided for educational purposes only
          and is not intended to replace professional medical advice, diagnosis, or treatment. Always seek
          the advice of your physician or qualified health provider with any questions regarding a medical
          condition. Never disregard professional medical advice or delay seeking it because of information
          presented here.
        </p>
      </footer>
    </div>
  );
};

export default Hypertension;