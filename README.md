Next.js Frontend Setup Guide

Prerequisites

Ensure you have Node.js installed on your system. Node.js is required to run Next.js applications.

Install Node.js

Download and install Node.js from the official website:
Node.js Official Website

Project Installation

1. Clone the Repository

git clone <repository-url>

Replace <repository-url> with your actual GitHub repository URL.

2. Navigate to the Project Directory

cd <project-folder>

Replace <project-folder> with your project's actual folder name.

3. Install Dependencies

npm install

This will install all required packages listed in package.json.

4. Start the Development Server

npm run dev

This will start the Next.js development server, usually running on http://localhost:3000/.

Environment Configuration

5. Create an Environment File

Inside the project folder, create a .env.local file:

nano .env.local
NEXT_PUBLIC_API_URL=your backend url
Add the necessary environment variables as per your project setup.

You're all set!

Your Next.js frontend is now up and running. 🚀

# ultravox-frontend
