/** @format */

import React, { useEffect, useState } from 'react';
import FilterPanel from '../FilterPanel/FilterPanelComponent';
import ProjectGrid from '../ProjectGrid/ProjectGridComponent';
import styles from './Timeline.module.css';

const Timeline = () => {
	const [projects, setProjects] = useState([]);
	const [filters, setFilters] = useState({
		year: 'all',
		month: 'all',
		topic: 'all',
	});

	useEffect(() => {
		// Fetch data from JSON file
		fetch(`${process.env.PUBLIC_URL}/data/project/timelineData.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setProjects(data.timeline))
			.catch((err) => console.error('Error loading data:', err));
	}, []);

	// Extract unique years and topics from the project data
	const years = Array.from(
		new Set(projects.map((project) => project.year))
	).sort();
	const skills = Array.from(
		new Set(projects.flatMap((project) => project.topics))
	);

	// Filtered Projects Logic
	const filteredProjects = projects.filter((project) => {
		const matchesYear =
			filters.year === 'all' || project.year === parseInt(filters.year);

		const matchesMonth =
			filters.month === 'all' || project.month === parseInt(filters.month);

		const matchesTopic =
			filters.topic === 'all' ||
			project.topics.some((topic) => topic === filters.topic);

		return matchesYear && matchesMonth && matchesTopic;
	});

	return (
		<div className={styles.container}>
			{/* Pass projects to FilterPanel for dynamic filtering */}
			<FilterPanel
				filters={filters}
				setFilters={setFilters}
				projects={projects}
				availableYears={years} // Pass available years
				availableSkills={skills} // Pass available skills (topics)
			/>
			<ProjectGrid projects={filteredProjects} />
		</div>
	);
};

export default Timeline;
