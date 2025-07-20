# Full-Stack Feedback Collection Platform

A robust, full-stack web application designed for businesses to create custom feedback forms and analyze customer responses in a dedicated, secure dashboard. This project demonstrates a complete product lifecycle, from architectural design and backend API development to a responsive, dynamic frontend user interface.

**[Live Demo Link - Frontend](https://feedback-pro-theta.vercel.app/)** • **[Live Demo Link - API](https://myfeedback-pro-api.onrender.com)**

---

## Features

This platform is built with two distinct user roles, providing a seamless experience for both administrators and their customers.

### Admin / Business Features
*   **Secure Authentication:** Admins can register and log in via a secure, JWT-based authentication system with automatic token refresh for a seamless session experience.
*   **Custom Form Builder:** Create dynamic feedback forms with a custom title and up to five questions.
*   **Multiple Question Types:** Choose from different question types for more effective feedback:
    *   Single Line Text
    *   Multi-line Text
    *   Number
    *   Multiple Choice
*   **Unique Shareable Links:** Each form generates a unique, non-sequential public URL (using UUIDs) for secure sharing.
*   **Custom Admin Dashboard:** A private, dynamic dashboard that lists all created forms and provides access to their responses.
*   **Response Analysis:**
    *   **Tabular View:** View all raw responses for a specific form in a clean, responsive table.
    *   **Summary View:** Instantly visualize feedback for multiple-choice questions with auto-generated pie charts.
    *   **Real-time Updates:** The response page automatically polls for new submissions every few seconds, providing a near real-time view without needing a page refresh.
*   **CSV Export:** Export all responses for a form to a CSV file with a single click.

### Customer / User Features
*   **Simple Access:** Users can access any feedback form directly via its public URL without needing to log in.
*   **Intuitive Form Submission:** A clean, responsive, and easy-to-use interface for filling out and submitting feedback.

---

## Tech Stack & Architecture

This project is built on a modern, decoupled architecture, using specialized tools for each part of the stack to ensure performance, security, and scalability.

| Category      | Technology                                                                                                  |
| :------------ | :---------------------------------------------------------------------------------------------------------- |
| **Frontend**  | `React.js (Vite)`, `Tailwind CSS`, `React Router`, `Axios`, `Chart.js`, `Papaparse`                          |
| **Backend**   | `Python`, `Django`, `Django REST Framework`, `Simple JWT` (for Authentication)                                |
| **Database**  | `PostgreSQL` (Production), `SQLite3` (Development)                                                          |
| **Deployment**| **Vercel** (Frontend Hosting) & **Render** (Backend Hosting & Database)                                         |

---

## Getting Started: Running Locally

To run this project on your local machine, please follow these steps.

### Prerequisites
*   Node.js (v18.x or later)
*   Python (v3.8 or later)
*   Git

### 1. Backend Setup (Django)

First, let's get the server running.

```bash
# 1. Clone the repository
git clone https://github.com/DivyaMeghanaMamidipalli/Feedback-Pro.git
cd Feedback-Pro

# 2. Navigate to the backend directory
cd feedback-backend

# 3. Create and activate a Python virtual environment
# On Windows:
python -m venv venv
.\venv\Scripts\activate
# On macOS/Linux:
python3 -m venv venv
source venv/bin/activate

# 4. Install all required packages
pip install -r requirements.txt

# 5. Apply database migrations
python manage.py migrate

# 6. Create an admin account for yourself
python manage.py createsuperuser

# 7. Start the Django development server
python manage.py runserver```
 Your Django backend should now be running at `http://127.0.0.1:8000`.

### 2. Frontend Setup (React + Vite)

Now, let's get the user interface running in a new terminal.

```bash
# 1. Navigate to the frontend directory from the root folder
cd feedback-app

# 2. Install all required npm packages
npm install

# 3. Create a local environment file
# This file will tell your frontend where to find the backend API.
# Simply copy the example file.
# On Windows:
copy .env.example .env.local
# On macOS/Linux:
cp .env.example .env.local

# 4. Start the React development server
npm run dev
