/** @format */

import React from 'react';
import styles from './ProjectModal.module.css';

const ProjectModal = ({ project, onClose }) => {
	return (
		<div className={styles['project-modal']}>
			<div className={styles['modal-content']}>
				<button
					className={styles['close-modal']}
					onClick={onClose}>
					&times;
				</button>
				<div id={styles.modalContent}>
					<h2>{project.title}</h2>
					<p>{project.description}</p>
					<h3>Technologies</h3>
					<ul>
						{project.technologies.map((tech, index) => (
							<li key={index}>{tech}</li>
						))}
					</ul>
					<h3>Features</h3>
					<ul>
						{project.features.map((feature, index) => (
							<li key={index}>{feature}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProjectModal;
