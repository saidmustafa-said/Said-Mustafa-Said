/** @format */

import React from 'react';
import styles from './Skills.module.css';

const SkillsComponent = ({ data }) => {
	// Handle empty or invalid data gracefully
	if (!data?.categories?.length) {
		return <p className={styles.errorMessage}>Skills data is not available.</p>;
	}

	return (
		<section
			id='skills'
			className={styles.section}>
			<h2 className={styles.sectionTitle}>Technical Expertise</h2>
			<div className={styles.contentContainer}>
				{data.categories.map((category, index) => (
					<div
						key={index}
						className={styles.categoryBox}>
						<h3 className={styles.categoryTitle}>{category.title}</h3>
						<div className={styles.tagsContainer}>
							{category.tags.map((tag, idx) => (
								<span
									key={idx}
									className={styles.tag}>
									{tag}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default SkillsComponent;
