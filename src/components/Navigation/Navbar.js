/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for client-side navigation
import styles from './Navbar.module.css';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [navData, setNavData] = useState(null);

	// Toggle the dropdown menu
	const toggleMenu = (event) => {
		event.stopPropagation(); // Prevent click from propagating to document
		setIsMenuOpen((prev) => !prev);
	};

	// Fetch navigation data
	useEffect(() => {
		fetch(`${process.env.PUBLIC_URL}/data/home/nav-footer.json`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => setNavData(data))
			.catch((error) => console.error('Error fetching nav data:', error));
	}, []);

	// Close the menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				!event.target.closest(`.${styles['menu-button']}`) &&
				!event.target.closest(`.${styles['dropdown-menu']}`)
			) {
				setIsMenuOpen(false);
			}
		};

		// Attach event listener only if menu is open
		if (isMenuOpen) {
			document.addEventListener('click', handleClickOutside);
		}

		return () => {
			// Clean up the event listener
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isMenuOpen]);

	// Show nothing until data is loaded
	if (!navData) return null;

	const { socialLinks } = navData;

	return (
		<nav className={styles.navbar}>
			<div className={styles['company-name']}>{socialLinks.Name}</div>

			{/* Desktop Navigation */}
			<ul className={styles['nav-links']}>
				<li>
					<Link to='/'>Home</Link> {/* Use Link instead of <a> */}
				</li>
				<li>
					<Link to='/resume'>Resume</Link> {/* Use Link instead of <a> */}
				</li>
				<li>
					<Link to='/project'>Projects</Link> {/* Use Link instead of <a> */}
				</li>
			</ul>

			{/* Social Links */}
			<div className={styles['social-links']}>
				<a
					href={socialLinks.LinkedIn.href}
					title='LinkedIn'
					target='_blank'
					rel='noopener noreferrer'
				>
					<svg viewBox='0 0 24 24'>
						<path d={socialLinks.LinkedIn.iconPath} />
					</svg>
					LinkedIn
				</a>
				<a
					href={socialLinks.GitHub.href}
					title='GitHub'
					target='_blank'
					rel='noopener noreferrer'
				>
					<svg viewBox='0 0 24 24'>
						<path d={socialLinks.GitHub.iconPath} />
					</svg>
					GitHub
				</a>
				<a
					href={socialLinks.Email.href}
					title='Email'
					target='_blank'
					rel='noopener noreferrer'
				>
					<svg viewBox='0 0 24 24'>
						<path d={socialLinks.Email.iconPath} />
					</svg>
					Email
				</a>
			</div>

			{/* Mobile Menu Button */}
			<button
				className={styles['menu-button']}
				onClick={toggleMenu}
				aria-label='Toggle menu'
			>
				<svg
					viewBox='0 0 24 24'
					className={styles['menu-icon']}
				>
					<path d='M3 6h18v2H3zM3 12h18v2H3zM3 18h18v2H3z' />
				</svg>
			</button>

			{/* Mobile Dropdown Menu */}
			<div
				className={`${styles['dropdown-menu']} ${
					isMenuOpen ? styles.open : ''
				}`}
			>
				<ul className={styles['nav-links']}>
					<li>
						<Link to='/'>Home</Link> {/* Use Link instead of <a> */}
					</li>
					<li>
						<Link to='/resume'>Resume</Link> {/* Use Link instead of <a> */}
					</li>
					<li>
						<Link to='/project'>Projects</Link> {/* Use Link instead of <a> */}
					</li>
				</ul>
				<div className={styles.divider}></div>
				<div className={styles['social-links']}>
					<a
						href={socialLinks.LinkedIn.href}
						title='LinkedIn'
						target='_blank'
						rel='noopener noreferrer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<path d={socialLinks.LinkedIn.iconPath} />
						</svg>
						LinkedIn
					</a>
					<a
						href={socialLinks.GitHub.href}
						title='GitHub'
						target='_blank'
						rel='noopener noreferrer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<path d={socialLinks.GitHub.iconPath} />
						</svg>
						GitHub
					</a>
					<a
						href={socialLinks.Email.href}
						title='Email'
						target='_blank'
						rel='noopener noreferrer'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<path d={socialLinks.Email.iconPath} />
						</svg>
						Email
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
