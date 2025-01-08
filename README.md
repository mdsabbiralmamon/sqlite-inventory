# SQLite Inventory Management System

## Project Overview

This project is an Inventory Management System built using SQLite. It allows users to manage and track inventory items effectively by providing features such as adding, updating, deleting, and viewing inventory items. After clean installation in databse there will be default admin email and password by default which are :

```bash
Email: admin@mail.com
Password: 12345
```

NB: Remeber to delete and create your own admin account after successful installation.


## Features
- Items:
    - Add new items to the inventory
    - Update details of existing items
    - Delete items from the inventory
    - View all inventory items

- Users:
    - Create User
    - Delete User
    - Update User information

- Routes:
    - Public and Private Route
    - Secured Route distribution via middleware

- Authentication:
    - Next Auth based Authentication
    - Automatic Login for logged in users
    - Role based authentication system

## Technologies Used

- **Frontend**: 
  - React
  - Next.js
  - Tailwind CSS (for styling)
  - React Toastify (for notifications)
  
- **Backend**:
  - Node.js
  - SQLite (for data storage)
  - bcrypt (for hashing passwords)

## Requirements

- Node.js (for backend)
- SQLite3 (for database management)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/mdsabbiralmamon/sqlite-inventory.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. setup <code>.env </code> file
    make sure your env file contains these fields:
    ```bash
    JWT_SECRET= "Your_JWT_Secret"
    SESSION_SECRET="Your_Session_Secret"
    NEXTAUTH_SECRET="Your_Auth_Secret"
    NEXTAUTH_URL="Your_Localhost_Url"
    ```
3. Set up the SQLite database:
    - Stay in project directory porobably looks like this:
      ```bash
      /d/directory/name/sqlite-inventory
      ```
    - Then run this command:
      ```bash
      $ node src/database/setupDatabase.js
      ```
    NB: Based on file directory you might face some errors, don't panic just correct the directory location and your databased will start working fine.<br> <br>

4. Run the application (dev mode):
    ```bash
    $ npm run dev
    ```
5. Run the application (build mode):
    ```bash
    $ npm run dev
    ```
5. Run the application (Production mode):
    ```bash
    $ npm start
    ```


## Usage

After installing running this app, this will normally run on localhost port 3000 unless that port is busy. Keep an eye on terminal when you use <code> npm run dev </code> it will drop the port and url it's runnig on. If the url is like this: 

```bash
localhost:3000
```
then:

- Navigate to Home page:
```bash
http://localhost:3000
```
- Navigate to login

This will redirect you to login page. Here you need to use default user and password which will be genarated while seeding databse. If you do not change the code these login information will be :
```bash
Email: admin@mail.com
Password: 12345
```
- Navigate to User Management

Now use these information to login admin panel. After successful login you will redirect to dashboard. Makesure you delete the default login info and create your own. or change the password by clicking on update.

- Navigate to Dashboard

Now you can simply go to dashboard and start creating and managing inventory items from <code>Add Item</code> and <code>View Item<code>.


For any inquiries, feel free to reach out to [md.sabbiralmamon@gmail.com].

