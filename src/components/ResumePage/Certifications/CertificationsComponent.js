/** @format */

import React from 'react';
import styles from './Certifications.module.css';

const Certifications = ({ data }) => (
	<section
		id='certifications'
		className={styles.section}>
		<h2 className={styles.sectionTitle}>Certifications</h2>
		<div className={styles.grid}>
			{data.map((item, index) => (
				<div
					key={index}
					className={styles.card}>
					<img
						src={`${process.env.PUBLIC_URL}${item.path}`}
						alt={`Certificate for ${item.title}`}
						className={styles.icon}
					/>
					<div className={styles.content}>
						<h3 className={styles.certTitle}>{item.title}</h3>
						<div className={styles.issuer}>{item.issuer}</div>
						<div className={styles.year}>{item.year}</div>
						{item.details && <p className={styles.details}>{item.details}</p>}
					</div>
				</div>
			))}
		</div>
	</section>
);

export default Certifications;
