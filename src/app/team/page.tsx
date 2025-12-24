//src/app/team/page.tsx

'use client';

import { memo } from 'react';
import styles from './OurTeam.module.css';

// ===============================================================
// Type Definitions
// ===============================================================
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualification?: string;
  bio?: string;
  phone?: string;
  email?: string;
  imageSrc?: string;
}

interface OurTeamProps {
  members?: TeamMember[];
}

// ===============================================================
// Default Team Data
// ===============================================================
const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr Anisa Mule',
    role: 'Chief Pharmacologist',
    qualification: 'MBChB, PhD',
    bio: 'Leads clinical pharmacy services and medication safety initiatives with over 15 years of experience.',
    email: 'jane.doe@example.com',
    phone: '+254 712 345 678',
    imageSrc: 'team/Pharmacologist.jpg',
  },
  {
    id: '2',
    name: 'Dr Allan Webi',
    role: 'Senior Clinical Pharmacist',
    qualification: 'MPharm, RPh',
    bio: 'Specialist in outpatient medication review and patient counselling with a focus on chronic disease management.',
    email: 'john.smith@example.com',
    phone: '+254 723 456 789',
    imageSrc: 'team/Pharmacist.jpg',
  },
  {
    id: '3',
    name: 'Ms. Katuga Njoroge',
    role: 'Pharmacy Technician',
    qualification: 'HND Pharmacy',
    bio: 'Supports dispensing services and inventory management while ensuring quality patient care.',
    email: 'amina.patel@example.com',
    phone: '+254 734 567 890',
    imageSrc: 'team/Technician.jpg',
  },
];

// ===============================================================
// Component
// ===============================================================
function OurTeam({ members = DEFAULT_MEMBERS }: OurTeamProps) {
  return (
    <section className={styles.section} aria-labelledby="team-heading">
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 id="team-heading" className={styles.heading}>
            Meet Our Team
          </h2>
          <p className={styles.description}>
            Experienced pharmacy and clinical staff committed to safe, patient-centred care
          </p>
        </header>

        {/* Team Grid */}
        <div className={styles.grid} role="list">
          {members.map((member) => (
            <article key={member.id} className={styles.card} role="listitem">
              {/* Image Container */}
              <div className={styles.imageWrapper}>
                <img
                  src={member.imageSrc || 'https://via.placeholder.com/400x400/e0f2f1/64748b?text=Team+Member'}
                  alt={`${member.name}, ${member.role}`}
                  className={styles.image}
                  loading="lazy"
                  width={400}
                  height={400}
                />
                <div className={styles.imageOverlay} />
              </div>

              {/* Content */}
              <div className={styles.content}>
                <div className={styles.info}>
                  <h3 className={styles.name}>{member.name}</h3>
                  {member.qualification && (
                    <p className={styles.qualification}>{member.qualification}</p>
                  )}
                  <p className={styles.role}>{member.role}</p>
                </div>

                {member.bio && (
                  <p className={styles.bio}>{member.bio}</p>
                )}

                {/* Contact */}
                {(member.email || member.phone) && (
                  <div className={styles.contact}>
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className={styles.contactLink}
                        aria-label={`Email ${member.name}`}
                      >
                        <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                          <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                        </svg>
                        <span className={styles.contactText}>Email</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className={styles.contactLink}
                        aria-label={`Call ${member.name}`}
                      >
                        <svg className={styles.icon} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                        </svg>
                        <span className={styles.contactText}>Call</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(OurTeam);