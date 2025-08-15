# Momentum App

This is a React Native + Expo application built with best practices in mind.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd momentum-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Run the application:**

    To run the app on your local machine, use one of the following commands:
    - **iOS:**

      ```bash
      npm run ios
      ```

    - **Android:**

      ```bash
      npm run android
      ```

    - **Web:**

      ```bash
      npm run web
      ```

## Project Structure

The project follows a feature-based directory structure, as outlined in the `GEMINI.md` file. All application code resides in the `src/` directory.

## Key Technologies

- **React Native & Expo:** For building the cross-platform application.
- **TypeScript:** For type safety and improved developer experience.
- **React Navigation:** For handling navigation between screens.
- **TanStack Query:** For data fetching and caching.
- **Zustand:** For global state management.
- **Expo Secure Store:** For securely storing sensitive data.

## Scripts

- `npm start`: Starts the Expo development server.
- `npm run ios`: Runs the app on the iOS simulator.
- `npm run android`: Runs the app on the Android emulator.
- `npm run web`: Runs the app in a web browser.
