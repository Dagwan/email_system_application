# London Graduate School Email System

The **London Graduate School Email System** is an advanced email-sending application designed to automate and streamline communication processes. Built with a robust stack of modern web technologies, this system provides an easy-to-use interface for sending customized emails, complete with dynamic content, rich templates, and attachments. This solution is ideal for use cases like client engagement, event invitations, newsletters, and more. It offers seamless integration with user data, ensuring personalized email communication that improves user engagement and operational efficiency.

---

## Overview

This email system is built to enhance communication by providing flexible, dynamic, and automated email functionality. It caters to a wide range of use cases at the **London Graduate School** and beyond, including automated student communications, faculty updates, event promotions, and important institutional announcements. By incorporating a user-friendly interface, the system ensures that even non-technical staff can easily design, schedule, and send emails without the need for advanced technical knowledge.

### Key Features:
- **Dynamic Templates:** Personalize email content using EJS templates. Replace placeholders with user-specific data, such as names or events.
- **File Attachments:** Attach important documents, images, or multimedia files to your emails.
- **Automation-Friendly:** Easily integrate with events and triggers to send emails programmatically.
- **Scalable Architecture:** The system is designed to handle various scales, from a few emails to large campaigns.

---

## Features

- **Customizable Content:** Use dynamic templates for tailored messaging.
- **Error Logging:** Built-in logging ensures smooth operation and simplifies debugging.
- **Responsive Design:** Email templates are designed to render beautifully across devices.
- **Bulk Email Capability:** Planned future support for sending to multiple recipients in a single request.
- **File Attachments:** Send multimedia files like PDFs, images, or documents.
- **User-Friendly:** A well-structured API makes integration simple for developers.

---

## Project Structure

This project is organized into several key components:

### 1. **Email Templates:**
- Located in `views/emailTemplates`.
- Templates are written using EJS, enabling dynamic and reusable content.

### 2. **Controllers:**
- Core logic is implemented in `controllers/emailController.js`.
- Handles the preparation, validation, and sending of emails.

### 3. **Routes:**
- API endpoints are defined in `routes/emailRoutes.js`.
- Includes a dedicated endpoint for sending invitation emails.

### 4. **Static Assets:**
- Images and other static files are located in the `public` directory.

---

## Installation

Follow these steps to set up the system locally:

1. Clone the repository to your local machine.
2. Navigate to the project directory using a terminal or command prompt.
3. Install dependencies by running:
- npm install
4. Create a .env file to store environment variables like your SMTP credentials.

## Usage
To run the application, execute the following commands:
1. Start the server:
- npm start
- The server will be accessible locally at http://localhost:3000.
2. Send an Email: Use the provided API endpoint to send an email with the required data.
3. Test the API: Open the Swagger UI interface to test endpoints interactively: [API Documentation](https://send-email-517z.onrender.com/send-invitation-email/api-docs).

## API Documentation
### Swagger UI
The API includes a detailed Swagger documentation for easy testing and understanding of endpoints. Access the Swagger documentation at: API Documentation.

### Key Endpoint:
- POST `/send-invitation-email`: Endpoint for sending emails. Accepts JSON data with the email content, recipient information, and template details.

### Example Request:
Refer github and locate the `routes.rest`, then to the Swagger interface for request body examples and responses.

## Development Environment
- **Node.js**: The core JavaScript runtime used for building the backend.
- **Express.js**: A framework that simplifies building APIs and web applications.
- **Nodemailer**: Used for creating and sending emails.
- **EJS (Embedded JavaScript)**: Handles dynamic email templates.

## Error Handling
The system includes robust error-handling mechanisms:
- **Validation Errors**: If required fields are missing, the API returns meaningful error messages.
- **SMTP Errors**: Errors during email transmission are logged for debugging.
- **Graceful Failure**: The application ensures that even if one email fails, the process does not halt.

Logs are stored in a central location for monitoring and debugging purposes.

## Future Work
Future improvements to the system include:
1. **Scheduling Emails**: Add functionality to schedule emails for specific dates and times.
2. **Bulk Emailing**: Support for sending to multiple recipients in a single API call.
4. **Template Previews**: Allow users to preview templates before sending.
3. **Enhanced Error Reporting**: Provide detailed reports for debugging SMTP and system issues.

## Useful Resources
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [EJS Documentation](https://ejs.co/)

## Contribution
Contributions to the project are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Make changes in a feature branch.
3. Create a pull request with a clear description of the changes.

## License
This project is licensed under the MIT License - see the [LICENSE](/docs/LICENSE) file for details.