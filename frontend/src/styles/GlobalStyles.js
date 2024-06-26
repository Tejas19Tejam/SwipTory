import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
	/* Indigo */
	--color-brand-50: #eef2ff;
	--color-brand-100: #e0e7ff;
	--color-brand-200: #c7d2fe;
	--color-brand-500: #6366f1;
	--color-brand-600: #4f46e5;
	--color-brand-700: #4338ca;
	--color-brand-800: #3730a3;
	--color-brand-900: #312e81;

	/* Gray */
	--color-gray-0: #fff;
	--color-gray-50: #f9fafb;
	--color-gray-100: #f3f4f6;
	--color-gray-200: #e5e7eb;
	--color-gray-300: #d1d5db;
	--color-gray-400: #9ca3af;
	--color-gray-500: #6b7280;
	--color-gray-600: #4b5563;
	--color-gray-700: #374151;
	--color-gray-800: #1f2937;
	--color-gray-900: #111827;

	
	--color-green-700: #1aff1a;
	--color-green-800: #00e600;


	--color-red-700:#ec7063;
	--color-red-800:#e74c3c ;


	--color-blue-700: #5dade2 ;
	--color-blue-800: #3498db ;

	--backdrop-color:  #000000e6;

	--shadow-gray-sm:0px 0.6rem 1.8rem rgba(238, 233, 233, 0.4);
	--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
	--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
	--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

	--linear-gradient:linear-gradient(
      0deg,
      rgb(0, 0, 0) 20%,
      rgba(0, 0, 0, 0) 50%
    ),
    linear-gradient(rgb(0, 0, 0) 1%, rgba(0, 0, 0, 0) 20%);

	--border-radius-tiny: 3px;
	--border-radius-sm: 5px;
	--border-radius-md: 12px;
	--border-radius-lg: 25px;

	/* For dark mode */
	--image-grayscale: 0;
	--image-opacity: 100%;
}

*,
*::before,
*::after {
	box-sizing: border-box;
	padding: 0;
	margin: 0;

	/* Creating animations for dark mode */
	transition: background-color 0.3s, border 0.3s;
}

html {
	font-size: 62.5%;
}

body {
	font-family: 'DM Sans', sans-serif;
	color: var(--color-gray-900);

	transition: color 0.3s, background-color 0.3s;
	min-height: 100vh;
	line-height: 1.5;
	font-size: 1.6rem;
}

input,
button,
textarea,
select {
	font: inherit;
	color: inherit;
}

button {
	cursor: pointer;
}

*:disabled {
	cursor: not-allowed;
}

select:disabled,
input:disabled {
	background-color: var(--color-gray-200);
	color: var(--color-gray-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
	outline: 2px solid var(--color-brand-600);
	outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
	line-height: 0;
}

a {
	color: inherit;
	text-decoration: none;
}

ul {
	list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
	overflow-wrap: break-word;
	hyphens: auto;
}

img {
	max-width: 100%;

	/* For dark mode */
	filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
