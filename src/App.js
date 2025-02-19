/** @format */

import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/FooterInfo/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Project from './pages/Project';
// import NotFound from './pages/NotFound'; // Import 404 page component
import './index.css';

// Create a layout that includes Navbar and Footer
const Layout = () => (
	<>
		<Navbar />
		<div className='app-container'>
			<Outlet />
		</div>
		<Footer />
	</>
);

// Define routes with a 404 fallback
const routes = [
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '/', element: <Home /> },
			{ path: '/resume', element: <Resume /> },
			{ path: '/project', element: <Project /> },
		],
	},
];

const getBasename = () => {
	const { hostname, pathname } = window.location;

	// If hosted on GitHub Pages (github.io), extract repo name from pathname
	if (hostname.endsWith('github.io')) {
		const segments = pathname.split('/').filter(Boolean);
		return segments.length > 0 ? `/${segments[0]}` : '/';
	}

	// If hosted on localhost with a specific path `/build`, return `/build`
	if (hostname === '127.0.0.1' && pathname.includes('/build')) {
		return '/build';
	}

	// For custom domains and localhost (`localhost:3000`), use root `/`
	return '/';
};


const basename = getBasename();
const router = createBrowserRouter(routes, { basename });

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
