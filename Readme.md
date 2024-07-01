# Classroom


## Classroom is a School Management System that focus on streamlining administrative tasks, improve communication, and enhance overall efficiency in educational institutions. 


## Table of Contents
* [Technologies Used](https://github.com/Ratangulati/Classroom?tab=readme-ov-file#technologies-used)
* [Features](https://github.com/Ratangulati/Classroom?tab=readme-ov-file#features)
* [Getting Started](https://github.com/Ratangulati/Classroom?tab=readme-ov-file#getting-started)
    * [Pre-requisites](https://github.com/Ratangulati/Classroom?tab=readme-ov-file#prerequisites)
    * [Installation](https://github.com/Ratangulati/Classroom?tab=readme-ov-file#installation)
* [How to Contribute?](https://github.com/Ratangulati/Classroom?tab=readme-ov-file#how-to-contribute)


## Technologies Used

- **Frontend:**
    - React
    - Javascript
    - Tailwind CSS

- **Backend:** 
    - Node.js
    - Express.js



## Features

- **Student Information Management:** Users can collaborate in real-time, making it easy to work together on student profiles, academic records, and other relevant information.

- **Attendance Tracking:** The system allows for efficient tracking and management of student attendance.

- **Teacher and Student Management:** It is a comprehensive management of teacher and student profiles, including personal information and academic history.

- **Library Management:** Integrated google books API to fetch and read books needed by the user.

- **Communication Tools:** Facilitates communication between admin, teachers and students through integrated messaging systems, announcements, and notifications.

- **Class Management:** Applied CRUD function on classes making it easy for admin to edit or upload data.

- **Assignment Scheduling:** This feature make it easy for teachers to send assignment to the students with a schedular.



## Getting Started
### Prerequisites

- Node.js and npm installed on your machine.

### Installation

#### With Docker Compose
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/Classroom
    ``` 

2. Navigate to the project directory:
    ```bash
    cd Classroom
    ```
   
3. Run Docker Compose:
    ```bash
    docker-compose up
    ```
    The app should now be running at [http://localhost:5173](http://localhost:5173).

#### With Docker

##### Frontend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/Classroom
    ``` 

2. Navigate to the project frontend directory:
    ```bash
    cd Classroom/frontend/ 
    ```
   
3. Build docker image:
    ```bash
    docker build -t <your-image-name> .     
    ```

4. Run docker image:
    ```bash
    docker run -p 5173:5173 <your-image-name>
    ```
    The app should now be running at [http://localhost:5173](http://localhost:5173).

##### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/Classroom
    ``` 

2. Navigate to the project frontend directory:
    ```bash
    cd Classroom/backend/ 
    ```
   
3. Build docker image:
    ```bash
    docker build -t <your-image-name> .     
    ```

4. Run docker image:
    ```bash
    docker run -p 3000:3000 <your-image-name>
    ```
    The app should now be running at [http://localhost:3000](http://localhost:3000).

#### Without Docker

##### Frontend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/Classroom
    ``` 

2. Navigate to the project frontend directory:
    ```bash
    cd Classroom/frontend
    ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
    ```bash
    npm run dev
    ```
    The app should now be running at [http://localhost:5173](http://localhost:5173).


##### Backend
1. Clone the repository:
    ```bash
    git clone https://github.com/Ratangulati/Classroom
    ``` 

2. Navigate to the project backend directory:
    ```bash
    cd Classroom/backend/
    ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
    ```bash
    npm start
    ```
    The app should now be running at [http://localhost:3000](http://localhost:3000).

6. Example config/config.env You can use in your backend
    ```
    PORT=3000

    MONGO_URL=your-mongo-url 

    FRONTEND_URL=your-frontend-url
    ```

## How to Contribute 

To know how to contribute to the project visit [CONTRIBUTING.md](CONTRIBUTING.md).