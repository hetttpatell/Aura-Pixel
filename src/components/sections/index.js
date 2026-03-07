// Section Components (Page Sections)
// Only export above-the-fold components that are eagerly loaded
// Below-the-fold components are lazy-loaded directly in App.jsx
export { default as Hero } from './Hero';
export { default as Services } from './Services';
export { default as WhyChooseUs } from './WhyChooseUs';

// Note: Portfolio, ScrollingCompany, Testimonials, Blog, and LeadCapture
// are lazy-loaded in App.jsx for better code splitting
