/** @format */

// src/components/ProjectTimeline/ProjectGrid/ProjectGridComponent.js

import React, { useState } from 'react';
import ProjectDetailModal from '../ProjectDetailModal/ProjectDetailModalComponent';
import styles from './ProjectGrid.module.css';

const ProjectGrid = ({ projects }) => {
	const [selectedProject, setSelectedProject] = useState(null);

	const handleCardClick = (project) => {
		setSelectedProject(project);
	};

	return (
		<>
			{projects.length === 0 ? (
				<p className={styles.noProjects}>No projects match your filters.</p>
			) : (
				<div className={styles.projectsGrid}>
					{projects.map((project) => (
						<div
							key={project.id}
							className={styles.projectCard}
							onClick={() => handleCardClick(project)}>
							{/* Date section at the top-right */}
							<div className={styles.dateInfo}>
								<span className={styles.date}>{project.year}</span>
								<span className={styles.date}>
									{new Date(2000, project.month - 1).toLocaleString('default', {
										month: 'short', // Small month name
									})}
								</span>
							</div>

							<h3>{project.title}</h3>
							<p>{project.description}</p>

							{/* Topics/Skills section */}
							<div className={styles.skills}>
								{project.topics.slice(0, 3).map((topic, index) => (
									<span
										key={index}
										className={styles.skill}>
										{topic}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			)}
			<ProjectDetailModal
				project={selectedProject}
				onClose={() => setSelectedProject(null)}
			/>
		</>
	);
};

export default ProjectGrid;
