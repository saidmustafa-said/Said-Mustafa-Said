/**
 * src/components/ProjectTimeline/ProjectDetailModal/ProjectDetailModal.js
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ProjectDetailModal.module.css';

const ProjectDetailModal = ({ project, onClose }) => {
	const [markdownContent, setMarkdownContent] = useState('');

	// Fetch the Markdown content when the modal opens
	useEffect(() => {
		setMarkdownContent('');

		if (project) {
			const fetchMarkdown = async () => {
				try {
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
					setMarkdownContent('# Error\nFailed to load project details.');
				}
			};

			fetchMarkdown();
		}
	}, [project]);

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

				{/* Modal Header */}
				<div className={styles['modal-header']}>
					<h2>{project.title}</h2>
				</div>

				{/* Markdown Content */}
				<div className={styles['markdown-content']}>
					<ReactMarkdown>{markdownContent}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default ProjectDetailModal;
