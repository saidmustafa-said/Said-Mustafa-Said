/** @format */

import React from 'react';
import Hero from '../components/Home/LandingPage/Hero';
import Services from '../components/Home/Services/Services';
import Technology from '../components/Home/Technology/ProjectsComponent';
import '../styles/Home.css';

const HomePage = () => {
	return (
		<div className='home-page'>
			<Hero />
			<Services />
			<Technology />
		</div>
	);
};

export default HomePage;
