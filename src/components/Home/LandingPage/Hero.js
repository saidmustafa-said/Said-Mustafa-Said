/** @format */

import React, { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const Hero = () => {
	const [imagePath, setImagePath] = useState('');

	useEffect(() => {
		// Fetch the JSON file containing the image path
		fetch(`${process.env.PUBLIC_URL}/data/home/background-image.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				return response.json(); // Parse the JSON
			})
			.then((data) => {
				// Set the image path from the JSON data
				setImagePath(`${process.env.PUBLIC_URL}${data.heroImagePath}`);
			})
			.catch((error) => {
				console.error('Error loading the JSON data:', error);
			});
	}, []);

	return (
		<section className={styles.hero}>
			<div
				className={styles['hero-bg']}
				style={{ backgroundImage: `url(${imagePath})` }} // Dynamically set the background image
			></div>
			<div className={styles['hero-content']}>
				<div className={styles.titles}>
					<p className={styles.role}>AI & ML</p>
					<p className={styles.role}>DevOps</p>
				</div>
				<p className={styles['engineer-title']}>Engineer</p>
			</div>
			<div className={styles['scroll-indicator']}>
				<p>Services</p>
				<div className={styles['scroll-arrow']}>↓</div>
			</div>
		</section>
	);
};

export default Hero;
