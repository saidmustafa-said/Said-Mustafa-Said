/**
 * src/components/ProjectTimeline/ProjectDetailModal/ProjectDetailModal.js
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ProjectDetailModal.module.css';

const ProjectDetailModal = ({ project, onClose }) => {
	const [markdownContent, setMarkdownContent] = useState('');
	const modalRef = useRef(null);

	// Prevent background scrolling when modal is open
	useEffect(() => {
		if (project) {
			document.body.classList.add('modal-open'); // Disable background scrolling
		} else {
			document.body.classList.remove('modal-open'); // Enable background scrolling
		}

		return () => {
			document.body.classList.remove('modal-open'); // Ensure cleanup
		};
	}, [project]);


	// Prevent scroll propagation from modal to background
	const preventScrollPropagation = (e) => {
		if (!modalRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = modalRef.current;

		const isAtTop = scrollTop === 0;
		const isAtBottom = scrollTop + clientHeight === scrollHeight;

		if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
			e.preventDefault(); // Stop background scroll
		}
	};

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
				onClick={(e) => e.stopPropagation()}
				ref={modalRef}
				onWheel={preventScrollPropagation} // Prevents background scroll when at the end
			>
				{/* Close Button */}
				<button
					className={styles['close-modal']}
					onClick={onClose}>
					×
				</button>

				{/* Modal Header */}
				<div className={styles['modal-header']}>
					<h2>{project.project_name}</h2>
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
