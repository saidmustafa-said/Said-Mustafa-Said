/** @format */

// src/components/ProjectTimeline/FilterPanel/FilterPanelComponent.js
import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

const FilterPanel = ({
	filters,
	setFilters,
	projects,
	availableYears,
	availableSkills,
}) => {
	const [selectedYear, setSelectedYear] = useState(null);
	const [showAllSkills, setShowAllSkills] = useState(false); // State to toggle skills dropdown

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const toggleYear = (year) => {
		if (selectedYear === year) {
			setSelectedYear(null); // Deselect the year
			setFilters((prev) => ({
				...prev,
				year: 'all',
				month: 'all', // Reset month filter when year is deselected
			}));
		} else {
			setSelectedYear(year); // Select the year
			handleFilterChange('year', year);
			setFilters((prev) => ({
				...prev,
				month: 'all', // Reset month filter when a new year is selected
			}));
		}
	};

	const availableMonths = selectedYear
		? Array.from(
				new Set(
					projects
						.filter((project) => project.year === parseInt(selectedYear))
						.map((project) => project.month)
				)
		  )
		: [];

	const months = [
		{ value: 1, label: 'January' },
		{ value: 2, label: 'February' },
		{ value: 3, label: 'March' },
		{ value: 4, label: 'April' },
		{ value: 5, label: 'May' },
		{ value: 6, label: 'June' },
		{ value: 7, label: 'July' },
		{ value: 8, label: 'August' },
		{ value: 9, label: 'September' },
		{ value: 10, label: 'October' },
		{ value: 11, label: 'November' },
		{ value: 12, label: 'December' },
	];

	// Split the available skills into two parts: the first five, and the rest
	const topSkills = availableSkills.slice(0, 5);
	const remainingSkills = availableSkills.slice(5);

	return (
		<div className={styles['filter-container']}>
			{/* Year and Month Filters */}
			<div className={styles['filter-row']}>
				<div className={styles['year-section']}>
					<h3 className={styles['filter-section-title']}>Years</h3>
					<div className={styles['filter-group']}>
						<button
							className={`${styles['filter-tag']} ${
								filters.year === 'all' ? styles.active : ''
							}`}
							onClick={() => {
								handleFilterChange('year', 'all');
								setSelectedYear(null); // Hide months
							}}>
							All Years
						</button>
						{availableYears.map((year) => (
							<button
								key={year}
								className={`${styles['filter-tag']} ${
									filters.year === year ? styles.active : ''
								}`}
								onClick={() => toggleYear(year)}>
								{year}
							</button>
						))}
					</div>
				</div>

				{selectedYear && (
					<div className={styles['month-section']}>
						<h3 className={styles['filter-section-title']}>Months</h3>
						<div className={styles['filter-group']}>
							<button
								className={`${styles['filter-tag']} ${
									filters.month === 'all' ? styles.active : ''
								}`}
								onClick={() => handleFilterChange('month', 'all')}>
								All Months
							</button>
							{months
								.filter((month) => availableMonths.includes(month.value))
								.map((month) => (
									<button
										key={month.value}
										className={`${styles['filter-tag']} ${
											filters.month === month.value ? styles.active : ''
										}`}
										onClick={() => handleFilterChange('month', month.value)}>
										{month.label}
									</button>
								))}
						</div>
					</div>
				)}
			</div>

			{/* Topic Filter */}
			<div>
				<h3 className={styles['filter-section-title']}>Topics</h3>
				<div className={styles['filter-group']}>
					<button
						className={`${styles['filter-tag']} ${
							filters.topic === 'all' ? styles.active : ''
						}`}
						onClick={() => handleFilterChange('topic', 'all')}>
						All Topics
					</button>
					{topSkills.map((topic) => (
						<button
							key={topic}
							className={`${styles['filter-tag']} ${
								filters.topic === topic ? styles.active : ''
							}`}
							onClick={() => handleFilterChange('topic', topic)}>
							{topic}
						</button>
					))}

					{/* Dropdown for remaining skills */}
					{remainingSkills.length > 0 && (
						<div className={styles['popup-container']}>
							<button
								className={`${styles['filter-tag']} ${styles['more-skills-toggle']}`}
								onClick={() => setShowAllSkills(!showAllSkills)}>
								{showAllSkills ? 'Show Less' : 'Show More'}
							</button>
							{showAllSkills && (
								<div className={styles['skills-popup']}>
									{remainingSkills.map((topic) => (
										<button
											key={topic}
											className={`${styles['filter-tag']} ${
												filters.topic === topic ? styles.active : ''
											}`}
											onClick={() => handleFilterChange('topic', topic)}>
											{topic}
										</button>
									))}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FilterPanel;
