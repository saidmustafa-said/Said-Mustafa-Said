/** @format */

import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navbar from './components/Navagation/Navbar';
import Footer from './components/FooterInfo/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Project from './pages/Project';
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

// Define routes
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

/**
 * Dynamically compute the basename:
 * - If the hostname ends with 'github.io', assume the first path segment is the repo name.
 * - Otherwise, return an empty string for custom domains.
 */
const getBasename = () => {
	const { hostname, pathname } = window.location;
	// If on GitHub Pages, use the first path segment
	if (hostname.endsWith('github.io')) {
		const segments = pathname.split('/').filter(Boolean);
		return segments.length > 0 ? `/${segments[0]}` : '';
	}
	// For local testing, if your app is served from a subdirectory, return it here.
	// For example, if you're testing at http://localhost:3000/Said-Mustafa-Said
	if (pathname.startsWith('/Said-Mustafa-Said')) {
		return '/Said-Mustafa-Said';
	}
	return '';
};

const basename = getBasename();

const router = createBrowserRouter(routes, { basename });

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
