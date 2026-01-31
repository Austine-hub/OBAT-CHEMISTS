'use client';


import React, { useState } from 'react';
import styles from './Diabetes.module.css';

interface BloodGlucoseReading {
  id: string;
  value: number;
  timestamp: Date;
  mealContext: 'fasting' | 'before-meal' | 'after-meal' | 'bedtime';
}

interface A1CRecord {
  value: number;
  date: Date;
}

const Diabetes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'monitor' | 'education' | 'resources'>('monitor');
  const [glucoseValue, setGlucoseValue] = useState<string>('');
  const [mealContext, setMealContext] = useState<BloodGlucoseReading['mealContext']>('fasting');
  const [readings, setReadings] = useState<BloodGlucoseReading[]>([]);

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(glucoseValue);
    
    if (isNaN(value) || value <= 0) return;

    const newReading: BloodGlucoseReading = {
      id: Date.now().toString(),
      value,
      timestamp: new Date(),
      mealContext
    };

    setReadings([newReading, ...readings].slice(0, 10));
    setGlucoseValue('');
  };

  const getGlucoseStatus = (value: number, context: BloodGlucoseReading['mealContext']): string => {
    if (context === 'fasting') {
      if (value < 70) return 'low';
      if (value <= 100) return 'normal';
      if (value <= 125) return 'prediabetes';
      return 'high';
    } else {
      if (value < 70) return 'low';
      if (value <= 140) return 'normal';
      if (value <= 199) return 'prediabetes';
      return 'high';
    }
  };

  const formatTimestamp = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Diabetes Management</h1>
        <p className={styles.subtitle}>Monitor your blood glucose levels and access evidence-based resources</p>
      </header>

      <nav className={styles.navigation}>
        <button
          className={`${styles.navButton} ${activeTab === 'monitor' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveTab('monitor')}
          aria-current={activeTab === 'monitor' ? 'page' : undefined}
        >
          Blood Glucose Monitor
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'education' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveTab('education')}
          aria-current={activeTab === 'education' ? 'page' : undefined}
        >
          Patient Education
        </button>
        <button
          className={`${styles.navButton} ${activeTab === 'resources' ? styles.navButtonActive : ''}`}
          onClick={() => setActiveTab('resources')}
          aria-current={activeTab === 'resources' ? 'page' : undefined}
        >
          Resources
        </button>
      </nav>

      <main className={styles.content}>
        {activeTab === 'monitor' && (
          <section className={styles.section}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Log Blood Glucose Reading</h2>
              <form onSubmit={handleAddReading} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="glucose-value" className={styles.label}>
                    Blood Glucose (mg/dL)
                  </label>
                  <input
                    id="glucose-value"
                    type="number"
                    value={glucoseValue}
                    onChange={(e) => setGlucoseValue(e.target.value)}
                    className={styles.input}
                    placeholder="Enter reading"
                    min="1"
                    step="1"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="meal-context" className={styles.label}>
                    Measurement Context
                  </label>
                  <select
                    id="meal-context"
                    value={mealContext}
                    onChange={(e) => setMealContext(e.target.value as BloodGlucoseReading['mealContext'])}
                    className={styles.select}
                  >
                    <option value="fasting">Fasting (8+ hours)</option>
                    <option value="before-meal">Before Meal</option>
                    <option value="after-meal">After Meal (2 hours)</option>
                    <option value="bedtime">Bedtime</option>
                  </select>
                </div>

                <button type="submit" className={styles.primaryButton}>
                  Log Reading
                </button>
              </form>
            </div>

            {readings.length > 0 && (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Recent Readings</h2>
                <div className={styles.readingsList}>
                  {readings.map((reading) => (
                    <div key={reading.id} className={styles.readingItem}>
                      <div className={styles.readingHeader}>
                        <span className={`${styles.readingValue} ${styles[getGlucoseStatus(reading.value, reading.mealContext)]}`}>
                          {reading.value} mg/dL
                        </span>
                        <span className={styles.readingTime}>{formatTimestamp(reading.timestamp)}</span>
                      </div>
                      <p className={styles.readingContext}>
                        {reading.mealContext.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Target Ranges</h2>
              <dl className={styles.targetList}>
                <div className={styles.targetItem}>
                  <dt className={styles.targetLabel}>Fasting or Before Meals</dt>
                  <dd className={styles.targetValue}>80-130 mg/dL</dd>
                </div>
                <div className={styles.targetItem}>
                  <dt className={styles.targetLabel}>2 Hours After Meals</dt>
                  <dd className={styles.targetValue}>Less than 180 mg/dL</dd>
                </div>
                <div className={styles.targetItem}>
                  <dt className={styles.targetLabel}>A1C Goal</dt>
                  <dd className={styles.targetValue}>Below 7%</dd>
                </div>
              </dl>
              <p className={styles.disclaimer}>
                Note: Target ranges may vary based on individual circumstances. Consult your healthcare provider for personalized goals.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'education' && (
          <section className={styles.section}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Understanding Diabetes</h2>
              <div className={styles.textContent}>
                <p>
                  Diabetes is a chronic condition affecting how your body regulates blood glucose. Effective management 
                  requires a comprehensive approach including regular monitoring, medication adherence, nutrition planning, 
                  and physical activity.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Essential Self-Management Skills</h2>
              <ul className={styles.skillsList}>
                <li className={styles.skillItem}>
                  <strong>Blood Glucose Monitoring:</strong> Regular testing helps you understand how food, activity, 
                  and medication affect your levels.
                </li>
                <li className={styles.skillItem}>
                  <strong>Medication Management:</strong> Take prescribed medications as directed and communicate with 
                  your healthcare team about any concerns.
                </li>
                <li className={styles.skillItem}>
                  <strong>Nutrition Therapy:</strong> Focus on portion control, carbohydrate counting, and balanced meals 
                  with vegetables, lean proteins, and whole grains.
                </li>
                <li className={styles.skillItem}>
                  <strong>Physical Activity:</strong> Aim for at least 150 minutes of moderate aerobic activity weekly, 
                  as recommended by the American Diabetes Association.
                </li>
                <li className={styles.skillItem}>
                  <strong>Risk Reduction:</strong> Regular foot checks, annual eye exams, and cardiovascular risk 
                  monitoring are essential preventive measures.
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Recognizing Warning Signs</h2>
              <div className={styles.warningBox}>
                <h3 className={styles.warningTitle}>Seek Immediate Medical Attention If You Experience:</h3>
                <ul className={styles.warningList}>
                  <li>Blood glucose consistently above 300 mg/dL</li>
                  <li>Severe hypoglycemia (below 54 mg/dL) with confusion or loss of consciousness</li>
                  <li>Persistent nausea, vomiting, or abdominal pain</li>
                  <li>Fruity-smelling breath or rapid breathing</li>
                  <li>Extreme thirst or frequent urination</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'resources' && (
          <section className={styles.section}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Professional Organizations</h2>
              <ul className={styles.resourceList}>
                <li className={styles.resourceItem}>
                  <strong>American Diabetes Association (ADA)</strong>
                  <p className={styles.resourceDescription}>
                    Evidence-based standards of care, patient education materials, and research updates.
                  </p>
                </li>
                <li className={styles.resourceItem}>
                  <strong>Centers for Disease Control and Prevention (CDC)</strong>
                  <p className={styles.resourceDescription}>
                    National diabetes statistics, prevention programs, and public health resources.
                  </p>
                </li>
                <li className={styles.resourceItem}>
                  <strong>JDRF (Type 1 Diabetes Research)</strong>
                  <p className={styles.resourceDescription}>
                    Research funding, advocacy, and community support for type 1 diabetes.
                  </p>
                </li>
              </ul>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Support Services</h2>
              <div className={styles.textContent}>
                <p>
                  Consider working with a certified diabetes care and education specialist (CDCES) or registered 
                  dietitian nutritionist (RDN) for personalized guidance. Many insurance plans cover diabetes 
                  self-management education and support services.
                </p>
                <p>
                  Your healthcare team may include endocrinologists, primary care physicians, nurses, pharmacists, 
                  and mental health professionals. Regular communication with your team is essential for optimal outcomes.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Technology and Tools</h2>
              <ul className={styles.resourceList}>
                <li className={styles.resourceItem}>
                  <strong>Continuous Glucose Monitors (CGMs)</strong>
                  <p className={styles.resourceDescription}>
                    Real-time glucose tracking with alerts for high and low readings.
                  </p>
                </li>
                <li className={styles.resourceItem}>
                  <strong>Insulin Pumps</strong>
                  <p className={styles.resourceDescription}>
                    Automated insulin delivery systems that can improve glycemic control.
                  </p>
                </li>
                <li className={styles.resourceItem}>
                  <strong>Mobile Applications</strong>
                  <p className={styles.resourceDescription}>
                    Digital tools for tracking meals, activity, medications, and blood glucose patterns.
                  </p>
                </li>
              </ul>
            </div>
          </section>
        )}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          This tool is for educational purposes and does not replace professional medical advice. 
          Always consult your healthcare provider regarding your diabetes management plan.
        </p>
      </footer>
    </div>
  );
};

export default Diabetes;