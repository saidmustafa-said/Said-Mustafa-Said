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
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
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
			className={styles['project-modal']}
			onClick={onClose}>
			<div
				className={styles['modal-content']}
				onClick={(e) => e.stopPropagation()}
				ref={modalRef}
				onWheel={preventScrollPropagation}>
				<button
					className={styles['close-modal']}
					onClick={onClose}>
					×
				</button>
				<div className={styles['modal-header']}>
					<h2>{projectData.project_name}</h2>
					<p>
						<strong>Year:</strong> {projectData.year}, <strong>Month:</strong>{' '}
						{projectData.month}
					</p>
					<p>
						<strong>Role:</strong> {projectData.role} | <strong>Type:</strong>{' '}
						{projectData.project_type}
					</p>
				</div>
				<div className={styles['markdown-content']}>
					<h3>Description</h3>
					<p>{projectData.description}</p>

					{projectData.technologies_used.length > 0 && (
						<>
							<h3>Technologies Used</h3>
							<ul>
								{projectData.technologies_used.map((tech, index) => (
									<li key={index}>
										<strong>{tech.name}:</strong> {tech.description}
									</li>
								))}
							</ul>
						</>
					)}

					{projectData.infrastructure.length > 0 && (
						<>
							<h3>Infrastructure</h3>
							<ul>
								{projectData.infrastructure.map((infra, index) => (
									<li key={index}>
										<strong>{infra.name}:</strong> {infra.description}
										{infra.steps && infra.steps.length > 0 && (
											<ul>
												{infra.steps.map((step, stepIndex) => (
													<li key={stepIndex}>{step}</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						</>
					)}

					{projectData.skills_required.length > 0 && (
						<>
							<h3>Skills Required</h3>
							<ul>
								{projectData.skills_required.map((skill, index) => (
									<li key={index}>
										<strong>{skill.name}:</strong> {skill.description}
									</li>
								))}
							</ul>
						</>
					)}

					{projectData.challenges_faced.length > 0 && (
						<>
							<h3>Challenges Faced</h3>
							<ul>
								{projectData.challenges_faced.map((challenge, index) => (
									<li key={index}>
										<strong>{challenge.name}:</strong> {challenge.description}
									</li>
								))}
							</ul>
						</>
					)}

					{projectData.outcomes.length > 0 && (
						<>
							<h3>Outcomes</h3>
							<ul>
								{projectData.outcomes.map((outcome, index) => (
									<li key={index}>
										<strong>{outcome.name}:</strong> {outcome.description}
									</li>
								))}
							</ul>
						</>
					)}

					{projectData.links.length > 0 && (
						<>
							<h3>Links</h3>
							<ul>
								{projectData.links.map((link, index) => (
									<li key={index}>
										<a
											href={link.url}
											target='_blank'
											rel='noopener noreferrer'>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailModal;
