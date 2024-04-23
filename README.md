# Firebase Functions for User Management

This repository contains Firebase Cloud Functions designed to manage user data within a Firestore database. It offers functionalities to read and update user documents based on specific criteria, enhancing the application's ability to interact with user information efficiently.

## Setup

To get started with these functions, ensure you have Firebase CLI installed and your Firebase project set up. Follow the steps below to prepare your environment:

1. **Install Firebase CLI**: Run `npm install -g firebase-tools` to install Firebase CLI globally on your machine.
2. **Log in to Firebase**: Execute `firebase login` to log in via the browser and authenticate the Firebase CLI.
3. **Select Your Project**: Use `firebase use --add` and choose your project from the list to set the active project.

## Functions Overview

There are two main functions provided in this repository:

### `readItems`

- **Method**: GET
- **Purpose**: Fetches user documents from the `users` collection. Supports filtering by document `id` or `uid`.
- **Usage**:
  - Query by `id`: Append `?id=YOUR_DOCUMENT_ID` to the function URL.
  - Query by `uid`: Append `?uid=YOUR_USER_UID` to the function URL.

### `updateItem`

- **Method**: PUT
- **Purpose**: Updates a specific user document in the `users` collection.
- **Usage**:
  - Document `id` required as a query parameter: `?id=YOUR_DOCUMENT_ID`.
  - Send a JSON payload in the request body with the fields you wish to update.

## Deployment

To deploy these functions to your Firebase project, follow these steps:

1. **Navigate to your project directory** where your functions are located.
2. **Deploy Functions**: Execute `firebase deploy --only functions` to deploy your functions to Firebase.

## Using the Functions

Once deployed, you can invoke these functions through their respective HTTPS endpoints provided by Firebase. For detailed usage, refer to the Firebase documentation on executing HTTPS functions.

### Example Request

To update a user document, you might send a request like this:

curl -X PUT "https://us-central1-your-project-id.cloudfunctions.net/updateItem?id=user_document_id" -H "Content-Type: application/json" -d '{"fieldToUpdate": "newValue"}'

### Security Note
These functions utilize CORS to allow cross-origin requests. Ensure you configure CORS according to your application's security requirements.