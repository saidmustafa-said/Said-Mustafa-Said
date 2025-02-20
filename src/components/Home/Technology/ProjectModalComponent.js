/** @format */

import React from 'react';
import styles from './ProjectModal.module.css';
import { FaLaptopCode, FaRegListAlt } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
	if (!project) return null;

	return (
		<div
			className={styles.overlay}
			onClick={onClose}>
			<div
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}>
				<button
					className={styles.closeButton}
					onClick={onClose}>
					<span className={styles.closeIcon}>&times;</span>
				</button>

				<div className={styles.header}>
					<h2 className={styles.title}>{project.title}</h2>
					<p className={styles.description}>{project.description}</p>
				</div>

				<div className={styles.content}>
					{/* Technologies Section */}
					{project.technologies && project.technologies.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>
								<FaLaptopCode className={styles.icon} /> Technologies
							</h3>
							<div className={styles.techGrid}>
								{project.technologies.map((tech, index) => (
									<div
										key={index}
										className={styles.techCard}>
										<span className={styles.techName}>{tech}</span>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Features Section */}
					{project.features && project.features.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>
								<FaRegListAlt className={styles.icon} /> Features
							</h3>
							<div className={styles.techGrid}>
								{project.features.map((feature, index) => (
									<div
										key={index}
										className={styles.techCard}>
										<span className={styles.techName}>{feature}</span>
									</div>
								))}
							</div>
						</section>
					)}

					{/* Links & Resources Section */}
					{project.github_links && project.github_links.length > 0 && (
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Links & Resources</h3>
							<div className={styles.accordion}>
								{project.github_links.map((link, index) => (
									<details
										key={index}
										className={styles.accordionItem}>
										<summary className={styles.accordionHeader}>
											{link.name}
										</summary>
										<div className={styles.accordionContent}>
											<p>{link.description}</p>
											<a
												href={link.url}
												target='_blank'
												rel='noopener noreferrer'
												className={styles.linkButton}>
												Visit Link
											</a>
										</div>
									</details>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectModal;
