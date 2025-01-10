const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const port = 5000; // or any port you prefer

// Initialize Resend
const resend = new Resend('re_9vj6MD6t_HPHe3NFZoM8Li9Q4NwVbnHjw');

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.post('/api/send-email', async (req, res) => {
  try {
    const { firstName, lastName, phone, email, message } = req.body;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'shaikhsalif50@gmail.com', // Your email
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    console.log('Email sent successfully:', data);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});