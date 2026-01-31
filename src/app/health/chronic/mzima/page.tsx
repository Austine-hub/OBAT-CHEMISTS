import React from 'react';
import styles from './MzimaChronicCare.module.css';

interface ProgramFeature {
  title: string;
  description: string;
  icon: string;
}

interface ChronicCondition {
  name: string;
  description: string;
}

const MzimaChronicCare: React.FC = () => {
  const features: ProgramFeature[] = [
    {
      title: 'Personalised Care Plans',
      description: 'Tailored treatment strategies developed in collaboration with your healthcare team to address your specific health needs and goals.',
      icon: '📋'
    },
    {
      title: 'Continuous Monitoring',
      description: 'Regular health assessments and tracking to ensure optimal disease management and early intervention when necessary.',
      icon: '📊'
    },
    {
      title: 'Medication Management',
      description: 'Comprehensive pharmaceutical care including medication reviews, adherence support, and coordination with your prescribers.',
      icon: '💊'
    },
    {
      title: 'Lifestyle Support',
      description: 'Evidence-based guidance on nutrition, physical activity, and lifestyle modifications to complement your medical treatment.',
      icon: '🏃'
    },
    {
      title: 'Care Coordination',
      description: 'Seamless communication between specialists, primary care providers, and allied health professionals for integrated care.',
      icon: '🤝'
    },
    {
      title: 'Patient Education',
      description: 'Empowering you with knowledge about your condition, self-management techniques, and resources for better health outcomes.',
      icon: '📚'
    }
  ];

  const conditions: ChronicCondition[] = [
    { name: 'Diabetes Mellitus', description: 'Type 1 and Type 2 diabetes management' },
    { name: 'Hypertension', description: 'Blood pressure control and cardiovascular risk reduction' },
    { name: 'Asthma & COPD', description: 'Respiratory condition management and prevention' },
    { name: 'Cardiovascular Disease', description: 'Heart health monitoring and disease prevention' },
    { name: 'Chronic Kidney Disease', description: 'Renal function preservation and complication prevention' },
    { name: 'Arthritis', description: 'Pain management and mobility support' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Mzima Chronic Care Program</h1>
          <p className={styles.subtitle}>
            Comprehensive, patient-centered care for long-term health conditions
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>About the Program</h2>
          <p className={styles.text}>
            The Mzima Chronic Care Program provides specialized, multidisciplinary care for individuals 
            living with chronic health conditions. Our evidence-based approach combines medical expertise, 
            preventive care, and patient empowerment to help you achieve optimal health outcomes and 
            maintain quality of life.
          </p>
          <p className={styles.text}>
            Through regular monitoring, personalized care planning, and coordinated support services, 
            we work alongside you to manage your condition effectively and prevent complications.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Program Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <article key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>Conditions We Manage</h2>
          <div className={styles.conditionsGrid}>
            {conditions.map((condition, index) => (
              <div key={index} className={styles.conditionCard}>
                <h3 className={styles.conditionName}>{condition.name}</h3>
                <p className={styles.conditionDescription}>{condition.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>How to Enroll</h2>
          <div className={styles.enrollmentSteps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Initial Consultation</h3>
                <p className={styles.stepDescription}>
                  Schedule an assessment with our care team to discuss your health needs and determine program eligibility.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Care Plan Development</h3>
                <p className={styles.stepDescription}>
                  Work with your dedicated care coordinator to create a personalized treatment and management plan.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Ongoing Support</h3>
                <p className={styles.stepDescription}>
                  Receive continuous care, monitoring, and education to help you manage your condition effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.content}>
          <h2 className={styles.ctaTitle}>Ready to Take Control of Your Health?</h2>
          <p className={styles.ctaText}>
            Contact our team to learn more about enrollment in the Mzima Chronic Care Program.
          </p>
          <button className={styles.ctaButton}>Schedule Consultation</button>
        </div>
      </section>
    </div>
  );
};

export default MzimaChronicCare;