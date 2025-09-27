# KUMBHARBAJAR Form Submission Backend

This repository contains the backend code for handling form submissions from the KUMBHARBAJAR website and sending them to kumbharbazar@gmail.com.

## Features

- Collects form data from the website
- Sends form data to kumbharbazar@gmail.com via Gmail
- Sends confirmation email to the user
- Logs each submission to a local JSON file
- Validates form fields
- Handles errors gracefully
- Supports CORS for frontend integration

## Requirements

- Node.js
- npm
- Gmail account with App Password enabled

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your email credentials (see `.env.example`)
4. Start the server: `node server.js`

## Usage

The backend provides a single endpoint:

- `POST /api/contact` - Submit form data

Form data should include:
- name (string)
- email (string)
- phone (string)
- message (string)

## Form Submission Logs

All form submissions are saved in the `form_submissions/` directory as JSON files with timestamps.

## Security Note

- Never commit your `.env` file to version control
- Use HTTPS in production
- Keep your Gmail App Password secure

## Credits

Form submission system built by Qoder AI Assistant for KUMBHARBAJAR.