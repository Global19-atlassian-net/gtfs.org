import React from 'react';
import styles from './footer.module.css';
import { Link } from 'gatsby';

const Footer = () => (
  <div className={styles.footerContainer}>
    <div>Except as otherwise noted, the content of this page is licensed under the <a href="https://creativecommons.org/licenses/by/3.0/">Creative Commons Attribution 3.0 License</a>, and code samples are licensed under the <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License.</a></div>
    <div className={styles.footerCredits}><Link to="/about">About GTFS.org & Site Credits</Link></div>
  </div>
)

export default Footer
