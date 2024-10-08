# DoorAccessTester

**Project Description:**  
DoorAccessTester is a simple React-based web application designed to test door access control systems by simulating various access scenarios. The application provides a user-friendly interface where users can manually enter details such as `deviceLogId`, `cardNumber`, `branchName`, and `deviceLogType` to test the door access control API. The app also supports scenarios where access is attempted using a push button at the front desk, which does not require a card.

## Key Features:

- **Manual Data Entry:** Users can input specific values for `deviceLogId`, `cardNumber`, `branchName`, and `deviceLogType` to test different access control cases.
- **API Integration:** The app sends POST requests to a designated API endpoint, simulating real-world interactions with a door access system.
- **Push Button Simulation:** Allows testing of scenarios where a push button is used for access, automatically filling out certain fields as `null` to mimic the absence of a card.
- **Responsive Design:** Built using Tailwind CSS, the application is responsive and works well on various screen sizes.
- **Visual Feedback:** The app displays the server's response, allowing users to see whether access was granted or denied based on the input parameters.
- **React Icons:** Integrates React Icons for a more engaging and user-friendly interface.

## Technical Stack:

- **React.js:** The core framework for building the user interface.
- **Tailwind CSS:** A utility-first CSS framework used for styling the application.
- **Axios:** A promise-based HTTP client for sending requests to the backend API.
- **React Icons:** A library of icons used to enhance the visual appeal of the application.

## Usage:

DoorAccessTester is ideal for developers and QA engineers who need to test and validate door access control systems. By providing an easy way to simulate various access scenarios, this tool helps ensure that the access control API behaves correctly under different conditions.

## Potential Use Cases:

- Testing access control systems during development.
- Simulating real-world scenarios for quality assurance.
- Validating API behavior with different types of user inputs.
- Troubleshooting and debugging access control systems.

