/** @format */

import React from 'react';
import styles from './Experience.module.css';

const Experience = ({ data }) => (
	<section
		id='experience'
		className={styles.section}>
		<h2 className={styles.sectionTitle}>Work History</h2>
		{data.map((item, index) => (
			<div
				key={index}
				className={styles.contentContainer}>
				<div className={styles.header}>
					<h3 className={styles.position}>{item.title}</h3>
					<span className={styles.date}>{item.date}</span>
				</div>
				<div className={styles.company}>{item.company}</div>
				<ul className={styles.tasks}>
					{item.tasks.map((task, idx) => (
						<li key={idx}>{task}</li>
					))}
				</ul>
			</div>
		))}
	</section>
);

export default Experience;
