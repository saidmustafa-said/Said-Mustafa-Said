/** @format */

import React from 'react';
import styles from './Summary.module.css';

const SummaryComponent = ({ data }) => {
	if (!data || !data.about) {
		return (
			<p className={styles.errorMessage}>
				Summary information is not available.
			</p>
		);
	}

	return (
		<div className={styles.section}>
			<h2 className={styles.sectionTitle}>About Me</h2>
			<div className={styles.contentContainer}>
				<p className={styles.aboutParagraph}>{data.about}</p>
			</div>
		</div>
	);
};

export default SummaryComponent;
