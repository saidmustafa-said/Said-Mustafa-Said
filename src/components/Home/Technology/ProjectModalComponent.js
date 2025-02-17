/**
 * src/components/home/Technology/ProjectModalComponent.js
 *
 * @format
 */

import React from 'react';
import styles from './ProjectModal.module.css';
import { FaLaptopCode, FaRegListAlt } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
	return (
		<div className={styles['project-modal']}>
			<div className={styles['modal-content']}>
				<button
					className={styles['close-modal']}
					onClick={onClose}>
					&times;
				</button>
				<div className={styles.modalInnerContent}>
					<header className={styles.modalHeader}>
						<h2>{project.title}</h2>
						<p className={styles.modalDescription}>{project.description}</p>
					</header>
					<div className={styles.modalBody}>
						<div className={styles.modalSection}>
							<h3>
								<FaLaptopCode className={styles.modalIcon} /> Technologies
							</h3>
							<div className={styles['list-card']}>
								<ul>
									{project.technologies.map((tech, index) => (
										<li key={index}>{tech}</li>
									))}
								</ul>
							</div>
						</div>
						<div className={styles.modalSection}>
							<h3>
								<FaRegListAlt className={styles.modalIcon} /> Features
							</h3>
							<div className={styles['list-card']}>
								<ul>
									{project.features.map((feature, index) => (
										<li key={index}>{feature}</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectModal;
