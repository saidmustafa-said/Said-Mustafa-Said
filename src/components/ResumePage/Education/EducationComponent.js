/** @format */

import React from 'react';
import styles from './Education.module.css';

const Education = ({ data }) => (
	<section
		id='education'
		className={styles.section}>
		<h2 className={styles.sectionTitle}>Academic Background</h2>
		{data.map((item, index) => (
			<div
				key={index}
				className={styles.contentContainer}>
				<div className={styles.header}>
					<h3 className={styles.degree}>{item.degree}</h3>
					<span className={styles.date}>{item.date}</span>
				</div>
				<div className={styles.school}>{item.school}</div>
				<div className={styles.details}>
					<p>
						<strong>Specialization:</strong> {item.details.specialization}
					</p>
					{item.details.gpa && (
						<p>
							<strong>GPA:</strong> {item.details.gpa}
						</p>
					)}
				</div>
				<ul className={styles.achievements}>
					{item.achievements.map((achievement, idx) => (
						<li key={idx}>{achievement}</li>
					))}
				</ul>
			</div>
		))}
	</section>
);

export default Education;
