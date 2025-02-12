/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Define themes with CSS variables
const themes = {
	0: {},
	1: {
		'--primary-color': '#1E1E1E' /* Rich charcoal */,
		'--secondary-color': '#363636' /* Slightly lighter charcoal */,
		'--third-color': '#4D4D4D' /* Even more charcoal */,
		'--accent-color': '#FFB74D' /* Warm amber */,
		'--text-color': '#BDBDBD' /* Soft light grey */,
		'--hover-color': '#FF9800' /* Bold orange */,
	},
	2: {
		'--primary-color': '#2D2D2D' /* Dark graphite */,
		'--secondary-color': '#434343' /* Slate grey */,
		'--textbackground-color': '#636363' /* Darker slate grey */,
		'--accent-color': '#81D4FA' /* Light sky blue */,
		'--text-color': '#F5F5F5' /* Light off-white */,
		'--hover-color': '#4FC3F7' /* Bright azure */,
	},
	3: {
		'--primary-color': '#3B3B3B' /* Deep grey */,
		'--secondary-color': '#565656' /* Mid-tone grey */,
		'--accent-color': '#64B5F6' /* Soft blue */,
		'--text-color': '#E0E0E0' /* Cool light grey */,
		'--hover-color': '#42A5F5' /* Bright blue */,
	},
	4: {
		'--primary-color': '#1B1B1B' /* Blackened grey */,
		'--secondary-color': '#353535' /* Soft charcoal */,
		'--accent-color': '#8BC34A' /* Fresh lime green */,
		'--text-color': '#D1D1D1' /* Soft grey */,
		'--hover-color': '#689F38' /* Deep lime green */,
	},
	5: {
		'--primary-color': '#2F3C41' /* Dark slate green */,
		'--secondary-color': '#4C5C61' /* Muted grey-blue */,
		'--accent-color': '#F57C00' /* Bold orange */,
		'--text-color': '#E7E7E7' /* Soft grey */,
		'--hover-color': '#FF6F00' /* Deep orange */,
	},
	6: {
		'--primary-color': '#004D40' /* Dark teal */,
		'--secondary-color': '#00695C' /* Rich forest teal */,
		'--accent-color': '#FFEB3B' /* Bright yellow */,
		'--text-color': '#F1F8E9' /* Soft cream */,
		'--hover-color': '#FBC02D' /* Goldenrod yellow */,
	},
};

// Default to theme 0 if no theme is selected or if selectedTheme is not set
const selectedTheme = 0; // You can modify this number to switch themes, 0 is the default theme

// Apply the selected theme by setting CSS variables on the root element
const root = document.documentElement;
const selectedVariables = themes[selectedTheme];

for (const [key, value] of Object.entries(selectedVariables)) {
	root.style.setProperty(key, value);
}

// React rendering
const appRoot = ReactDOM.createRoot(document.getElementById('root'));
appRoot.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
