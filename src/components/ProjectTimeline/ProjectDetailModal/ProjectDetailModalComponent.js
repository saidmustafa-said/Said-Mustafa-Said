/** @format */

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ProjectDetailModal.module.css';

const ProjectDetailModal = ({ project, onClose }) => {
	// State to hold the markdown content
	const [markdownContent, setMarkdownContent] = useState('');

	// Fetch the Markdown content when the modal opens
	useEffect(() => {
		// Reset content initially
		setMarkdownContent('');

		// If a project exists, fetch its Markdown file
		if (project) {
			const fetchMarkdown = async () => {
				try {
					// Fetch the Markdown file based on numeric project ID
					const response = await fetch(
						`${process.env.PUBLIC_URL}/data/project/markdown/${project.id}.md`
					);

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const data = await response.text();
					setMarkdownContent(data);
				} catch (error) {
					console.error('Error fetching Markdown content:', error);
					// Fallback error message
					setMarkdownContent('# Error\nFailed to load project details.');
				}
			};

			fetchMarkdown();
		}
	}, [project]);

	// If no project is selected, render nothing
	if (!project) return null;

	return (
		<div
			className={styles['project-modal']}
			onClick={onClose}>
			<div
				className={styles['modal-content']}
				onClick={(e) => e.stopPropagation()}>
				{/* Close Button */}
				<button
					className={styles['close-modal']}
					onClick={onClose}>
					×
				</button>

				{/* Project Title */}
				<h2>{project.title}</h2>

				{/* Render Markdown Content */}
				<div className={styles['markdown-content']}>
					<ReactMarkdown>{markdownContent}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailModal;
