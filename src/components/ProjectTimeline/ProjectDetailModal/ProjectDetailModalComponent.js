/** @format */

import React, { useState, useEffect, useRef } from 'react';
import styles from './ProjectDetailModal.module.css';

const ProjectDetailModal = ({ project, onClose }) => {
	const [projectData, setProjectData] = useState(null);
	const modalRef = useRef(null);

	useEffect(() => {
		if (project) {
			document.body.classList.add('modal-open');
		} else {
			document.body.classList.remove('modal-open');
		}
		return () => {
			document.body.classList.remove('modal-open');
		};
	}, [project]);

	useEffect(() => {
		setProjectData(null);
		if (project) {
			const fetchProjectData = async () => {
				try {
					const response = await fetch(
						`${process.env.PUBLIC_URL}/data/project/json/${project.id}.json`
					);
					if (!response.ok)
						throw new Error(`HTTP error! Status: ${response.status}`);
					const data = await response.json();
					setProjectData(data);
				} catch (error) {
					console.error('Error fetching project data:', error);
				}
			};
			fetchProjectData();
		}
	}, [project]);

	const preventScrollPropagation = (e) => {
		if (!modalRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = modalRef.current;
		const isAtTop = scrollTop === 0;
		const isAtBottom = scrollTop + clientHeight === scrollHeight;
		if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
			e.preventDefault();
		}
	};

	if (!project || !projectData) return null;

	return (
		<div
			className={styles.overlay}
			onClick={onClose}>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
				ref={modalRef}
				onWheel={preventScrollPropagation}>
				<button
					className={styles.closeButton}
					onClick={onClose}>
					<span className={styles.closeIcon}>&times;</span>
				</button>

				<div className={styles.header}>
					<h2 className={styles.title}>{projectData.project_name}</h2>
					<div className={styles.meta}>
						<span className={styles.pill}>{projectData.year}</span>
						<span className={styles.pill}>{projectData.month}</span>
						<span className={styles.pill}>{projectData.role}</span>
						<span className={styles.pill}>{projectData.project_type}</span>
					</div>
				</div>

				<div className={styles.content}>
					<section className={styles.section}>
						<h3 className={styles.sectionTitle}>Project Overview</h3>
						<p className={styles.description}>{projectData.description}</p>
					</section>

					{/* Tech Stack Section */}
					{projectData.technologies_used.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Tech Stack</h3>
							<div className={styles.techGrid}>
								{projectData.technologies_used.map((tech, index) => (
									<div
										key={index}
										className={styles.techCard}>
										<div className={styles.techHeader}>
											<span className={styles.techName}>{tech.name}</span>
										</div>
										<p className={styles.techDescription}>{tech.description}</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Infrastructure Section */}
					{projectData.infrastructure.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Infrastructure</h3>
							<div className={styles.accordion}>
								{projectData.infrastructure.map((infra, index) => (
									<details
										key={index}
										className={styles.accordionItem}>
										<summary className={styles.accordionHeader}>
											{infra.name}
										</summary>
										<div className={styles.accordionContent}>
											<p>{infra.description}</p>
											{infra.steps?.length > 0 && (
												<ol className={styles.stepsList}>
													{infra.steps.map((step, stepIndex) => (
														<li key={stepIndex}>{step}</li>
													))}
												</ol>
											)}
										</div>
									</details>
								))}
							</div>
						</section>
					)}

					{/* Skills Required Section */}
					{projectData.skills_required.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Skills Required</h3>
							<div className={styles.techGrid}>
								{projectData.skills_required.map((skill, index) => (
									<div
										key={index}
										className={styles.techCard}>
										<div className={styles.techHeader}>
											<span className={styles.techName}>{skill.name}</span>
										</div>
										<p className={styles.techDescription}>
											{skill.description}
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Challenges Faced Section */}
					{projectData.challenges_faced.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Challenges Faced</h3>
							<div className={styles.techGrid}>
								{projectData.challenges_faced.map((challenge, index) => (
									<div
										key={index}
										className={styles.techCard}>
										<div className={styles.techHeader}>
											<span className={styles.techName}>{challenge.name}</span>
										</div>
										<p className={styles.techDescription}>
											{challenge.description}
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Outcomes Section */}
					{projectData.outcomes.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Outcomes</h3>
							<div className={styles.techGrid}>
								{projectData.outcomes.map((outcome, index) => (
									<div
										key={index}
										className={styles.techCard}>
										<div className={styles.techHeader}>
											<span className={styles.techName}>{outcome.name}</span>
										</div>
										<p className={styles.techDescription}>
											{outcome.description}
										</p>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Links & Resources Section */}
					{projectData.links.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Links & Resources</h3>
							<div className={styles.linkList}>
								{projectData.links.map((link, index) => (
									<a
										key={index}
										href={link.url}
										target='_blank'
										rel='noopener noreferrer'
										className={styles.linkButton}>
										{link.name}
									</a>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailModal;
