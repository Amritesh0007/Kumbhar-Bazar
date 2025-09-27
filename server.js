const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create submissions directory if it doesn't exist
const submissionsDir = path.join(__dirname, 'form_submissions');
if (!fs.existsSync(submissionsDir)) {
    fs.mkdirSync(submissionsDir);
}

// Email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper function to log form submissions
function logSubmission(data) {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const filename = path.join(submissionsDir, `submission_${timestamp}.json`);
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

// Helper function to send email
async function sendEmail(to, subject, html) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        };
        
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// Form submission endpoint
app.post('/api/contact', (req, res) => {
    try {
        // Extract form data
        const { name, email, phone, message } = req.body;
        
        // Basic validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false,
                message: 'Please enter a valid email address'
            });
        }
        
        // Phone validation (Indian phone number format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            return res.status(400).json({ 
                success: false,
                message: 'Please enter a valid Indian phone number'
            });
        }
        
        // Message validation (minimum length)
        if (message.length < 10) {
            return res.status(400).json({ 
                success: false,
                message: 'Message must be at least 10 characters long'
            });
        }
        
        // Log submission to local JSON file
        logSubmission(req.body);
        
        // Prepare email content for admin
        const adminEmailHtml = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong> ${message}</p>
        `;
        
        // Send email to admin
        const adminEmailSent = await sendEmail(process.env.EMAIL_USER, `New Contact Form Submission from ${name}`, adminEmailHtml);
        
        // Prepare and send confirmation email to user
        const userEmailHtml = `
            <h2>Thank You for Contacting KUMBHARBAJAR!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br>KUMBHARBAJAR Team</p>
        `;
        
        const userEmailSent = await sendEmail(email, 'Thank You for Contacting Us', userEmailHtml);
        
        // Return response
        if (adminEmailSent) {
            res.json({ 
                success: true,
                message: 'Your message has been sent successfully! We will contact you soon.'
            });
        } else {
            res.status(500).json({ 
                success: false,
                message: 'There was an issue sending your message. Please try again later.'
            });
        }
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ 
            success: false,
            message: 'An unexpected error occurred. Please try again later.'
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});