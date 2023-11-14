# CollabCart

## Project Overview

This project is a real-time shopping list application that allows users to create, share, and manage shopping lists collaboratively. It leverages Firebase's real-time database functionality to ensure seamless and synchronized updates across multiple users.

## Features

- **Create and Share Lists:** Users can create new shopping lists, and each list has a unique URL that can be shared without requiring user accounts.

- **Real-Time Updates:** Changes made to a list are immediately reflected for all connected users, providing a seamless and collaborative experience.

- **Item Management:** Users can add and remove items from the list in real-time.

- **Quantity and Unit Tracking:** Each item can be associated with a quantity and unit, making it easier to plan and organize shopping.

- **Responsive Design:** The application is designed to work well on both desktop and mobile devices, ensuring a consistent user experience.



## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- Firebase project with Realtime Database set up

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/[your-username]/real-time-shopping-list.git
    ```

2.  Install dependencies:

    ```bash
    cd real-time-shopping-list
    npm install
    ```

3.  Configure Firebase:

    - Create a new Firebase project.
    - Enable Realtime Database.
    - Copy the Firebase configuration object from the Firebase Console into `src/firebase.ts`.

4.  Configure the env file: 
    1. Copy the `.env.example` file to `.env`:

        ```bash
        cp .env.example .env
        ```

    2. Update the `.env` file with your Firebase project variable

        ```bash
        REACT_APP_FIREBASE_API_KEY: Your Firebase API key for authentication.
        REACT_APP_FIREBASE_AUTH_DOMAIN: Your Firebase authentication domain.
        REACT_APP_FIREBASE_DATABASE_URL: Your Firebase Realtime Database URL.
        REACT_APP_FIREBASE_PROJECT_ID: Your Firebase project ID.
        REACT_APP_FIREBASE_STORAGE_BUCKET: Your Firebase storage bucket.
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID: Your Firebase messaging sender ID.
        REACT_APP_FIREBASE_APP_ID: Your Firebase application ID.
        ```

### Usage

1. Start the development server:

   ```
   npm start
   ```

2. Open the application in your browser:

   ```
   http://localhost:3000
   ```

### Demo

You can access the live demo of the application [here](https://collab-cart-red.vercel.app/).

### Techniques Used
- React.js: Building the user interface and managing component-based structure.

- Firebase Realtime Database: Providing real-time synchronization for collaborative updates.

- Material-UI: Styling the components with a responsive and minimalistic design.

- React Router: Handling navigation within the application.

- Environment Variables (.env): Managing sensitive configuration details securely.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
