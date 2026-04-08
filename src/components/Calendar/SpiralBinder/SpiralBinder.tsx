import React from 'react';
import styles from './SpiralBinder.module.css';

const SpiralBinder: React.FC = () => {
  const loops = Array.from({ length: 40 });

  return (
    <div className={styles.container}>
      <div className={styles.hook}>
        <div className={styles.hookLoop}></div>
      </div>
      <div className={styles.binder}>
        {loops.map((_, i) => (
          <div key={i} className={styles.loop}></div>
        ))}
      </div>
    </div>
  );
};

export default SpiralBinder;
