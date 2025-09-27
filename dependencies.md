# KUMBHARBAJAR Backend Dependencies

This file documents the dependencies required for the KUMBHARBAJAR backend server.

## Required Dependencies

1. **Express.js** - Web framework for Node.js
   - Used to create the server and handle HTTP requests
   - Version: ^4.18.2

2. **Nodemailer** - Email sending library
   - Used to send form submissions to kumbharbazar@gmail.com
   - Version: ^6.9.1

3. **Body-parser** - Middleware for parsing JSON bodies
   - Used to parse incoming form data
   - Version: ^1.20.2

4. **CORS** - Cross-Origin Resource Sharing middleware
   - Used to allow requests from the frontend
   - Version: ^2.8.5

5. **Dotenv** - Environment variable loader
   - Used to load email credentials and other config from .env file
   - Version: ^16.0.3

6. **Path** - Node.js module for working with file paths
   - Used to handle file paths for form submission logs
   - Version: ^0.12.7

## Development Dependencies

1. **Nodemon** - Development server that restarts when files change
   - Used during development for automatic server restart
   - Version: ^2.0.22

## Installation Instructions

1. Make sure Node.js and npm are installed
2. Run `npm install` in the project directory
3. Create a `.env` file with your email credentials (see `.env.example`)
4. Start the server with `npm start` (production) or `npm run dev` (development)