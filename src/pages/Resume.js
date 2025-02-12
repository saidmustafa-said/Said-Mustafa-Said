/** @format */

import React, { useState, useEffect } from 'react';
import SummaryComponent from '../components/ResumePage/Summary/SummaryComponent';
import SkillsComponent from '../components/ResumePage/Skills/SkillsComponent';
import ExperienceComponent from '../components/ResumePage/Experience/ExperienceComponent';
import CertificationsComponent from '../components/ResumePage/Certifications/CertificationsComponent';
import EducationComponent from '../components/ResumePage/Education/EducationComponent';
import styles from '../styles/Resume.module.css';

const Resume = () => {
	const [resumeData, setResumeData] = useState(null);

	useEffect(() => {
		fetch(`${process.env.PUBLIC_URL}/data/resume/resumeData.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setResumeData(data))
			.catch((error) => console.error('Failed to load resume data:', error));
	}, []);

	if (!resumeData) {
		return (
			<div className={styles.loadingContainer}>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<div className={styles.resumeContainer}>
			{/* Summary Component */}
			<div className={styles.resumeCard}>
				<div className={styles.sidewaysTitleContainer}>
					<div className={styles.sidewaysTitle}>Summary</div>
				</div>
				<div className={styles.cardContent}>
					<SummaryComponent data={resumeData.summary} />
				</div>
			</div>

			{/* Skills Component */}
			<div className={styles.resumeCard}>
				<div className={styles.sidewaysTitleContainer}>
					<div className={styles.sidewaysTitle}>Skills</div>
				</div>
				<div className={styles.cardContent}>
					<SkillsComponent data={resumeData.skills} />
				</div>
			</div>

			{/* Experience Component */}
			<div className={styles.resumeCard}>
				<div className={styles.sidewaysTitleContainer}>
					<div className={styles.sidewaysTitle}>Experience</div>
				</div>
				<div className={styles.cardContent}>
					<ExperienceComponent data={resumeData.experience} />
				</div>
			</div>

			{/* Education Component */}
			<div className={styles.resumeCard}>
				<div className={styles.sidewaysTitleContainer}>
					<div className={styles.sidewaysTitle}>Education</div>
				</div>
				<div className={styles.cardContent}>
					<EducationComponent data={resumeData.education} />
				</div>
			</div>

			{/* Certifications Component */}
			<div className={styles.resumeCard}>
				<div className={styles.sidewaysTitleContainer}>
					<div className={styles.sidewaysTitle}>Certifications</div>
				</div>
				<div className={styles.cardContent}>
					<CertificationsComponent data={resumeData.certifications} />
				</div>
			</div>
		</div>
	);
};

export default Resume;
