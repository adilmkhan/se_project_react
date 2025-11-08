# Weather Wardrobe App

A React-based clothing suggestion application that displays weather information and allows users to view and manage clothing items. The interface updates based on real-time weather data and user interaction with item cards and modals.

## Features

- Displays current weather data using a weather API.
- Temperature shown in **Fahrenheit**.
- Weather changes dynamically influence suggested clothing items.
- View all clothing items as cards.
- Click an item to open a modal with its image and details.
- Open a form modal to add user clothing items (structure prepared).
- Responsive layout built using modular components.

## Technologies Used

- React (Functional Components)
- Vite
- JavaScript (ES6+)
- CSS (component-scoped styling)
- Weather API integration
- Prettier (code formatting)
- Normalize.css and custom fonts

## Component Behavior Summary

**App.jsx**

- Fetches weather data once on mount.
- Stores weather and clothing items in state.
- Renders Header, Main, Footer, and modal components.

**Header.jsx**

- Displays current date.

**Main.jsx**

- Displays WeatherCard and a list of ItemCard components.

**WeatherCard.jsx**

- Shows the current temperature in Fahrenheit.

**ItemCard.jsx**

- Displays an image and name for each item.
- Click opens `ItemModal`.

**ItemModal.jsx**

- Shows selected item details.

**ModalWithForm.jsx**

- Displays form modal UI for adding items.

**Utils**

- Contains:
  - Default clothing items
  - Coordinates for weather API
  - API key storage
  - Weather fetching + temperature logic

## Future Improvements

- Ability to save user-added items permanently
- User profiles
- Toggle between Fahrenheit and Celsius

### Click **[here](https://adilmkhan.github.io/se_project_react/)** to view the webpage on Github.
