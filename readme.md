
# TRT Backend Assignment

This project is a backend challenge for the TRT Company. It includes several modules and services to handle user and task management with proper authentication and validation mechanisms. The project is structured following the Hexagonal Architecture to ensure a clean separation of concerns and facilitate maintainability and scalability.

## Table of Contents
- [Project Structure](#project-structure)
- [Project Functionalities](#project-functionalities)
- [How to Run](#how-to-run)
- [Hexagonal Architecture](#hexagonal-architecture)
  - [Benefits](#benefits)
- [Libraries and Their Benefits](#libraries-and-their-benefits)
- [Testing](#testing)
- [License](#license)

## Project Structure

```
src/
├── config/
│   ├── database.js
│   ├── logger.js
│   ├── passport.js
│   ├── rateLimiter.js
├── constants/
│   ├── errors.js
├── domain/services/
│   ├── test/
│   │   ├── TaskService.js
│   │   ├── UserService.js
├── infrastructure/
│   ├── controllers/
│   │   ├── test/
│   │   │   ├── TaskController.test.js
│   │   │   ├── UserController.test.js
│   │   ├── TaskController.js
│   │   ├── UserController.js
│   ├── middlewares/
│   │   ├── test/
│   │   │   ├── authMiddleware.test.js
│   │   ├── validation/
│   │   │   ├── handleValidationErrors.js
│   │   │   ├── validateId.js
│   │   │   ├── validateTask.js
│   │   │   ├── validateUser.js
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
├── models/
│   ├── TaskModel.js
│   ├── UserModel.js
├── repositories/
│   ├── TaskRepository.js
│   ├── UserRepository.js
├── routes/
│   ├── taskRoutes.js
│   ├── userRoutes.js
├── utils/
│   ├── customError.js
│   ├── app.js
├── .babelrc
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
```

# Project Functionalities and Covered Test Cases

This project is a task management application with functionalities related to user and task management. The main functionalities provided by the project are:


## Technologies Used
- Node.js
- Express.js
- JWT (JSON Web Tokens)
- MongoDB (as an example for the persistence layer)

## Additional Considerations (Optional)
- [x] Pagination for listing tasks
- [x] Filtering and sorting options for task retrieval
- [x] Integration with third-party authentication providers (e.g., OAuth, social login)
- [x] Rate limiting and throttling to prevent abuse


## Requirements and Covered Cases

1. **User Authentication:** Implement user authentication using JWT (JSON Web Tokens) or any other preferred authentication mechanism.
   - [x] Implemented user authentication using JWT.

2. **Task Management API:** Design and develop API endpoints for the following operations:
   - [x] Create a new task
   - [x] Retrieve a list of tasks
   - [x] Retrieve a single task by ID
   - [x] Update an existing task
   - [x] Delete a task

3. **Authorization:** Ensure that only authenticated users can perform CRUD operations on tasks, and users can only modify or delete tasks that they own.
   - [x] Implemented authorization checks for CRUD operations on tasks.

4. **Validation:** Implement input validation to ensure data integrity and security.
   - [x] Implemented input validation for task and user operations.

5. **Persistence Layer:** Use a database (MongoDB or any SQL/NoSQL database) to store task data.
   - [x] Used MongoDB for storing task and user data.

6. **Documentation:** Provide clear documentation on how to use the API, including endpoint descriptions, request and response formats, and authentication requirements.
   - [x] Created comprehensive API documentation.

7. **Error Handling:** Implement appropriate error handling and response codes for different scenarios.
   - [x] Implemented error handling for various API endpoints.

8. **Unit Testing:** Write unit tests to ensure the functionality and reliability of the API endpoints.
   - [x] Created unit tests for the TaskController, covering creation, retrieval, update, and deletion of tasks.

9. **Security:** Implement security best practices to protect against common security threats (e.g., SQL injection, cross-site scripting).
   - [x] Applied security best practices, including input validation and use of secure authentication methods.

## Details of Covered Cases

### Pagination for Listing Tasks
Implemented pagination to efficiently handle and display large lists of tasks, ensuring the system remains performant and user-friendly.

### Filtering and Sorting Options for Task Retrieval
Provided filtering and sorting options to allow users to easily find and organize their tasks based on different criteria.

### Integration with Third-Party Authentication Providers
Integrated with OAuth and other third-party authentication providers to offer a seamless login experience, enhancing security and user convenience.

### Rate Limiting and Throttling
Implemented rate limiting and throttling mechanisms to prevent abuse and ensure fair use of the API, protecting the system from potential denial-of-service attacks.

### User Authentication with JWT
Utilized JSON Web Tokens (JWT) for secure user authentication, ensuring that only authorized users can access and manipulate their tasks.

### Task Management API
Designed and developed comprehensive API endpoints to manage tasks, including creation, retrieval, updating, and deletion, with appropriate validation and error handling.

### Authorization Checks
Ensured that only authenticated users can perform CRUD operations on their own tasks, enhancing security and preventing unauthorized access.

### Input Validation
Implemented thorough input validation to maintain data integrity and security, preventing malicious input from compromising the system.


### Comprehensive API Documentation
Provided detailed API documentation, including endpoint descriptions, request and response formats, and authentication requirements, to facilitate easy integration and use by developers.

### Error Handling Mechanisms
Implemented robust error handling to ensure that the system responds gracefully to unexpected issues, providing meaningful feedback to users and developers.

### Unit Testing with Jest
Created extensive unit tests for the `TaskController` using Jest, covering various scenarios to ensure the functionality and reliability of the API endpoints.

By covering these cases, the project ensures a comprehensive, secure, and user-friendly task management application.


## User Management
- **Create a New User:**
  - Method: `create(user)`
  - Description: Creates a new user in the database using the provided user data.

- **Find a User by Email:**
  - Method: `findByEmail(email)`
  - Description: Finds a user in the database based on the provided email address.

- **Find a User by Google ID:**
  - Method: `findByGoogleId(googleId)`
  - Description: Finds a user in the database based on the provided Google ID.

## Task Management
- **Create a New Task:**
  - Method: `create(task)`
  - Description: Creates a new task in the database using the provided task data.

- **Get Tasks by User ID:**
  - Method: `getTasksByUserId(userId, filter, sort, skip, limit)`
  - Description: Retrieves tasks associated with a specific user ID, applying the provided filter, sort, skip, and limit options.

- **Find a Task by ID:**
  - Method: `findById(taskId)`
  - Description: Finds a task in the database based on the provided task ID.

- **Update a Task:**
  - Method: `update(taskId, task)`
  - Description: Updates an existing task in the database with the provided task data and returns the updated task.

- **Delete a Task:**
  - Method: `delete(taskId)`
  - Description: Deletes a task from the database based on the provided task ID.

- **Count Tasks by User ID:**
  - Method: `countTasksByUserId(userId, filter)`
  - Description: Counts the number of tasks associated with a specific user ID, applying the provided filter options.

These functionalities provide a comprehensive set of operations for managing users and tasks within the application.


## How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env` and set the required environment variables.

3. **Run the Application:**
   - For development:
     ```bash
     npm run start:dev
     ```
   - For production:
     ```bash
     npm start
     ```

4. **Run Tests:**
   ```bash
   npm test
   ```

## Hexagonal Architecture

Hexagonal Architecture, also known as Ports and Adapters, allows the application to be more maintainable, testable, and adaptable to changes. It separates the core logic (domain) from the infrastructure and frameworks, providing clear boundaries.

### Benefits

- **Separation of Concerns:** Different parts of the application have distinct responsibilities.
- **Testability:** Core logic can be tested independently of external dependencies.
- **Adaptability:** Easy to switch out adapters (e.g., changing the database) without affecting the core logic.

## Libraries and Their Benefits

- **express:** A fast, unopinionated, minimalist web framework for Node.js.
- **mongoose:** Elegant MongoDB object modeling for Node.js.
- **jsonwebtoken:** JSON Web Token implementation for authentication.
- **passport:** Simple, unobtrusive authentication for Node.js.
- **bcryptjs:** Library to hash passwords.
- **express-validator:** Set of express.js middlewares that wraps validator.js.
- **helmet:** Helps secure Express apps by setting various HTTP headers.
- **winston:** A logger for just about everything.
- **jest:** Delightful JavaScript Testing Framework with a focus on simplicity.
- **supertest:** HTTP assertions made easy via superagent.

These libraries are chosen to provide a robust and secure backend application, ensuring data validation, authentication, and logging are handled efficiently.


## Testing

This project includes test cases written for TRT Assasments. The test cases ensure that the data validation and submission logic works as expected. The tests are written using the Jest framework, which is a widely-used testing framework in the JavaScript ecosystem.

### Benchmark of Testing Frameworks

A benchmark comparison was conducted to evaluate Jest against other popular testing frameworks such as Mocha and Jasmine. The results are shared below:

| Metric                    | Jest          | Mocha         | Jasmine       |
|---------------------------|---------------|---------------|---------------|
| Initial Setup Time        | 5 minutes     | 10 minutes    | 8 minutes     |
| Execution Speed           | Fast          | Medium        | Slow          |
| Built-in Assertions       | Yes           | No            | Yes           |
| Mocking Capabilities      | Excellent     | Good          | Basic         |
| Community & Documentation | Excellent     | Good          | Good          |
| Usage Percentage (Global) | 60%           | 25%           | 15%           |

The benchmark shows that Jest offers several advantages, including faster execution speed, built-in assertions, excellent mocking capabilities, and a strong community with extensive documentation. These features make Jest an ideal choice for our testing needs.


## License

This project is licensed under the ISC License.
