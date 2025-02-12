/** @format */

import React, { useEffect, useState } from 'react';
import styles from './Services.module.css';

const Services = () => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		// Fetch the services JSON file from the public directory
		fetch(`${process.env.PUBLIC_URL}/data/home/services.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				// Ensure the data structure matches the expected format
				if (data.services) {
					setServices(data.services);
				} else {
					throw new Error('Invalid data format: "services" key not found.');
				}
			})
			.catch((error) => {
				console.error('Error fetching services data:', error);
			});
	}, []);

	if (services.length === 0) {
		return <div>Loading services...</div>;
	}

	return (
		<section className={styles.services}>
			<div className={styles['services-title']}>
				<h3>
					Transforming Ideas into Reality
					<br />
					<span>
						Whether you're launching a new business or enhancing your current
						one, we're here to help make it happen.
					</span>
				</h3>
			</div>
			<div className={styles['services-grid']}>
				{services.map((service) => (
					<div
						className={styles['service-card']}
						key={service.id}
						data-service={service.id}>
						<h3>{service.title}</h3>
						<p>{service.description}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default Services;
