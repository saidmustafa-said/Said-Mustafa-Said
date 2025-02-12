/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for internal navigation
import styles from './Footer.module.css';

const Footer = () => {
	const [footerData, setFooterData] = useState(null);

	// Fetch footer data from JSON on component mount
	useEffect(() => {
		fetch(`${process.env.PUBLIC_URL}/data/home/nav-footer.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setFooterData(data.footer))
			.catch((error) => console.error('Error fetching footer data:', error));
	}, []);

	if (!footerData) {
		return null; // Render nothing or a loader if necessary
	}

	const { quickLinks, latestPosts, cta, copyright } = footerData;

	// Helper function to filter valid entries
	const filterValidEntries = (entries) =>
		entries?.filter((entry) => entry.title && entry.href);

	// Filtered arrays
	const validQuickLinks = filterValidEntries(quickLinks) || [];
	const validLatestPosts = filterValidEntries(latestPosts) || [];

	return (
		<footer className={styles.footer}>
			<div className={styles['footer-wrapper']}>
				<div className={styles['footer-container']}>
					{/* Quick Links section */}
					{validQuickLinks.length > 0 && (
						<div
							className={`${styles['footer-section']} ${styles['quick-links']}`}>
							<h4>Quick Links</h4>
							<ul>
								{validQuickLinks.map((link, index) => (
									<li key={index}>
										{/* Use Link for internal links and <a> for external links */}
										{link.href.startsWith('/') ? (
											<Link to={link.href}>{link.title}</Link>
										) : (
											<a
												href={link.href}
												target='_blank'
												rel='noopener noreferrer'>
												{link.title}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Latest Posts section */}
					{validLatestPosts.length > 0 && (
						<div
							className={`${styles['footer-section']} ${styles['latest-posts']}`}>
							<h4>Latest Posts</h4>
							<ul>
								{validLatestPosts.map((post, index) => (
									<li key={index}>
										{/* Use Link for internal links and <a> for external links */}
										{post.href.startsWith('/') ? (
											<Link to={post.href}>{post.title}</Link>
										) : (
											<a
												href={post.href}
												target='_blank'
												rel='noopener noreferrer'>
												{post.title}
											</a>
										)}
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Call to Action (CTA) section */}
					{cta?.contactMethods?.length > 0 && (
						<div className={`${styles['footer-section']} ${styles.cta}`}>
							{cta.title && <h4>{cta.title}</h4>}
							<ul className={styles['contact-methods']}>
								{cta.contactMethods.map((method, index) => (
									<li key={index}>
										<a
											href={method.href}
											target='_blank'
											rel='noopener noreferrer'>
											<svg
												viewBox='0 0 24 24'
												fill='currentColor'
												width='20'
												height='20'>
												<path d={method.iconPath} />
											</svg>
											{method.platform}
										</a>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>

			{/* Copyright section */}
			<div className={styles['footer-copyright']}>
				<p>{copyright}</p>
			</div>
		</footer>
	);
};

export default Footer;
