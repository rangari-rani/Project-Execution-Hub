# Project Execution Hub

The Project Execution Hub is a comprehensive platform designed to streamline project management by enabling efficient task tracking, team collaboration, and goal achievement.

## Demo:

![Project-List](https://github.com/rangari-rani/Project-Execution-Hub/blob/4d182f6b44dc3fdc36df4e25a48a892cd747d422/project1.png)

![Kanban-Board](https://github.com/rangari-rani/Project-Execution-Hub/blob/4d182f6b44dc3fdc36df4e25a48a892cd747d422/project2.png)

## Tech Stack:

Some of the technologies used in the development of this web application are as follows:

- **[React.js](https://reactjs.org/)**: A JavaScript library for building dynamic and responsive user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for creating custom, responsive designs quickly.
- **[Spring Boot](https://spring.io/projects/spring-boot)**: A robust Java framework for developing scalable and production-ready backend services.
- **[JWT (JSON Web Tokens)](https://jwt.io/)**: A standard for securely authenticating HTTP requests.
- **[MySQL](https://www.mysql.com/)**: A widely-used, open-source relational database management system for efficiently storing and managing structured data.
- **[Vercel](https://vercel.com/)**: A platform for deploying and hosting modern web applications.

## Features

### Authentication & Authorization:

- **Registration & Validation**: User details are validated using Yup, and an OTP is generated using Formic during registration.
- **Email Verification**: OTP is sent via Java Mail Sender for account verification.
- **JWT Token Authentication**: Issued after email verification for secure login.
- **Role-based Authentication**: Ensures users, team members and admins have appropriate access.

  ### User Features:

1. **Project Management**:

- **Fetch project list** : Users can browse through available projects.
- **Search & Filter** : search projects by keywords and filter them by categories
- **Pagination** : Display products in multiple pages.
- **Project Details** : View detailed information about specific project.

2. **Task Management**:

   - **Create new task** : Add new task and assign them.
   - **Task Priority**: Set priority levels for tasks (High, Medium, Low).
   - **Kanban Board** : Allow users to drag task cards between different stages (Pending, In Progress, Completed).

3. **Team Management**:
   - **Add Members** : Share invite link on email to add team members.
   - **Reviews** : Share their reviews about project.

### Admin Features:

1. **Dashboard**: keep track of users registered.
2. **Payment & Transactions**: Monitor incoming payments for upgrade projects.

### License

[MIT License](LICENSE)
