import React from 'react';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  month: string;
  year: number;
  image: string;
  primaryColor: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ month, year, image, primaryColor }) => {
  return (
    <div className={styles.hero}>
      <img src={image} alt={month} className={styles.image} />
      
      <div className={styles.overlay}>
        <div className={styles.dateInfo}>
          <span className={styles.year}>{year}</span>
          <h1 className={styles.month}>{month}</h1>
        </div>
      </div>

      <div className={styles.waveContainer}>
        <svg 
          viewBox="0 0 1440 320" 
          className={styles.wave}
          preserveAspectRatio="none"
        >
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,192L48,176C96,160,192,128,288,128C384,128,480,160,576,186.7C672,213,768,235,864,224C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className={styles.blueAccent}>
        <svg 
          viewBox="0 0 1440 320" 
          className={styles.accentWave}
          preserveAspectRatio="none"
        >
          <path 
            fill={primaryColor} 
            fillOpacity="0.8" 
            d="M0,160L60,176C120,192,240,224,360,213.3C480,203,600,149,720,138.7C840,128,960,160,1080,176C1200,192,1320,192,1380,192L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
