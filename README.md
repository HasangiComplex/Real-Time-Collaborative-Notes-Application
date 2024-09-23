
# Real-Time Collaborative Notes Application
A web application allowing multiple users to create, edit, and share notes in real time. This project implements advanced Angular concepts, real-time data synchronization, user authentication, and state management.

## Table of Contents
   1. Project Overview
   2. Features
   3. Technical Requirements
   4. Installation
   5. Usage
   6. File Structure
   7. Services
   8. State Management
   9. Real-Time Updates
   10. Styling
   11. Testing
   12. Contributing
   13. License

## Project Overview
The Real-Time Collaborative Notes Application is built using Angular 15 and Firebase Realtime Database to provide a responsive and seamless collaborative note-taking experience. It supports multiple users working on the same note simultaneously, with real-time updates. The project also features a tagging system for better organization of notes, user authentication, and state management using NgRx.

## Features
  * User Authentication: Login and registration functionalities using Firebase Authentication.
  * Real-Time Collaboration: Multiple users can edit notes simultaneously with real-time updates.
  * Note Management: CRUD (Create, Read, Update, Delete) functionality for notes.
  * Tagging System: Categorize notes using tags for easy filtering and searching.
  * Responsive UI: Built with Angular Material for a clean, responsive interface.
  * State Management: Application state managed using NgRx for predictable state transitions.

## Technical Requirements
  * Angular CLI: v15.x.x
  * Node.js: v18.x.x or higher
  * Firebase Realtime Database
  * NgRx: v15.x.x for state management
  * Angular Material: v15.x.x for UI components
  * Firebase: For real-time data synchronization 


## Installation
To set up the project locally:

 1. Clone the repository:

    bash
    Copy code
    git clone https://github.com/your-username/collaborative-notes.git
    cd collaborative-notes

 2. Install dependencies:
    bash
    Copy code
    npm install

 3. Set up Firebase:
    * Create a Firebase project on Firebase Console.
    * Enable Firebase Realtime Database and Firebase Authentication.
    * Copy your Firebase configuration details into src/environments/environment.ts.

    Example:

    export const environment = {
    firebaseConfig: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-app.firebaseapp.com',
    databaseURL: 'https://your-app.firebaseio.com',
    projectId: 'your-app-id',
    storageBucket: 'your-app.appspot.com',
    messagingSenderId: 'your-messaging-id',
    appId: 'your-app-id',
    }
    };

 4. Run the development server:
    bash
    Copy code
    ng serve

    Navigate to http://localhost:4200/.

## Usage

### Authentication

  * Login/Register: Users can register and log in using the form provided on the authentication page.
  * Mock Authentication: For testing, mock authentication can be used without Firebase by setting up mock data within the AuthService.

### Note Management
  * Create/Edit/Delete Notes: Users can create, edit, and delete notes via the note editor.
  * Share Notes: Users can share notes with other collaborators by providing the email of the collaborator.
  * Tag Management: Tags can be added to notes and are displayed in a mat-chip-grid.
  * 
###  Real-Time Collaboration
  *   Notes are updated in real time for all collaborators using Firebase Realtime Database, so everyone sees the latest changes instantly.


## File Structure
  bash
  Copy code
  src/
  │
  ├── app/
  │   ├── auth/                # Authentication component
  │   ├── note-list/           # Note list component
  │   ├── note-editor/         # Note editor component
  │   ├── note-viewer/         # Note viewer component
  │   ├── services/            # Services for notes, authentication, etc.
  │   └── store/               # NgRx store configuration
  ├── environments/            # Environment configuration files (Firebase settings)
  └── assets/                  # Static assets 

## Services
 1.   Authentication Service (AuthService):
   * Manages user login, registration, and session management using Firebase Authentication.

 2.   Note Service (NoteService):
   * Handles CRUD operations for notes and updates note data in Firebase Realtime Database.

 3.   Tag Management:
   * Allows users to add, edit, and remove tags from notes in real time.

## State Management
State management is implemented using NgRx to ensure consistency across different parts of the application. The store is used to manage authentication state, notes, and real-time data updates.

  * Actions: Define the actions (e.g., LOAD_NOTES, CREATE_NOTE, UPDATE_NOTE) that trigger changes in state.
  * Reducers: Handle state changes based on the actions dispatched.
  * Effects: Manage side effects such as API calls for notes and user authentication.
  * 
## Real-Time Updates
  Real-time collaboration is powered by Firebase Realtime Database, which listens for changes in the database and updates the UI for all connected users. Any modifications to a note are instantly reflected for all users working on the same note.

## Styling
  * Angular Material is used for all UI components, ensuring a consistent and responsive design.
  * Components include material dialogs for editing tags, form fields, and responsive grids.
## Testing
    *   Unit tests are written for all services and components using Jasmine and Karma.
    *   Run the tests using:

    bash
    Copy code
    ng test
    E2E testing can be done using Protractor to verify the complete user flows.

## Contributing
If you'd like to contribute, feel free to create a pull request or open an issue. Contributions are welcome in the form of code improvements, bug fixes, or feature requests.

## License
This project is licensed under the MIT License.

