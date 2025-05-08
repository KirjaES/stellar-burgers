import React from 'react';
import styles from './preloader.module.css';

type PreloaderProps = {
  minWidth?: 640;
};

export const Preloader = ({ minWidth }: PreloaderProps) => (
  <div
    className={styles.preloader}
    style={{
      minWidth
    }}
  >
    <div className={styles.preloader_circle} />
  </div>
);
