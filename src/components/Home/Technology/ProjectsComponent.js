/** @format */
// src/components/Home/Technology/ProjectsComponent.js
import React, { useEffect, useState } from 'react';
import ProjectModal from './ProjectModalComponent';
import styles from './Projects.module.css';

const Technology = () => {
	const [projects, setProjects] = useState([]);
	const [activeProject, setActiveProject] = useState(null);

	// Fetch project data on component mount
	useEffect(() => {
		// Correct path to access JSON file in the public directory
		fetch(`${process.env.PUBLIC_URL}/data/home/technology.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				if (data.projects) {
					setProjects(data.projects); // Ensure projects exist in the data
				} else {
					throw new Error('Invalid data format: "projects" key not found.');
				}
			})
			.catch((error) => console.error('Error fetching project data:', error));
	}, []);

	// Early return if projects data hasn't loaded
	if (projects.length === 0) {
		return <div>Loading projects...</div>;
	}

	// Handle project click to set active project
	const handleProjectClick = (project) => {
		setActiveProject(project);
	};

	// Close the project modal
	const closeModal = () => {
		setActiveProject(null);
	};

	return (
		<section className={styles.projects}>
			<div className={styles['projects-title']}>
				<h3>
					Bringing Innovations to Life
					<br />
					<span>
						Explore some of the projects where creativity and technology come
						together to deliver impactful solutions.
					</span>
				</h3>
			</div>
			<div className={styles['projects-grid']}>
				{projects.map((project, index) => (
					<div
						className={styles['project-card']}
						key={index}
						onClick={() => handleProjectClick(project)}
						style={{
							backgroundImage: `url(${process.env.PUBLIC_URL}${project.image})`, // Dynamically set the background image
						}}>
						<div className={styles['project-overlay']}>
							<h3>{project.title}</h3>
						</div>
					</div>
				))}
			</div>
			{activeProject && (
				<ProjectModal
					project={activeProject}
					onClose={closeModal}
				/>
			)}
		</section>
	);
};

export default Technology;
