# Restaurant Reservation System

## Project Overview
The **Restaurant Reservation System** is a single-page application that enables restaurant owners to configure and manage reservation settings across multiple locations (branches). This system integrates with the **Foodics API** to retrieve and update reservation details.

## Features
- List branches that accept reservations.
- Enable/disable reservations for branches.
- Configure reservation settings, including:
    - Reservation duration (in minutes).
    - Assigning tables for reservations.
    - Managing available time slots for each day (up to three per day).

## Tech Stack
- **Vue 2**
- **Npm** (for dependency management)
- **Vue Router** (for navigation)
- **Vuex** (for state management)
- **Axios** (for API requests)
- **Tailwind CSS** (for styling)

## Setup & Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://npmjs.com/)

### Installation Steps
```sh
git clone https://github.com/aahmedramy1/reservation_system.git
cd reservation_system
npm install
```

### Running the Development Server
```sh
npm run serve
```
The application will be available at `http://localhost:8080/`.

### Environment Variables
Create a `.env.local` file to store the API token:
```sh
VUE_APP_API_BASE_URL=https://api.foodics.dev/v5/
VUE_APP_AUTH_TOKEN=your_bearer_token
```

## Project Structure
```
├── src
│   ├── components
│   │   ├── AddBranchesDialog.vue
│   │   ├── BranchesList.vue
│   │   ├── BranchTimePicker.vue
│   │   ├── DisableReservationsDialog.vue
│   │   ├── EditBranchDialog.vue
│   │   ├── FBtn.vue
│   │   ├── FDialog.vue
│   │   ├── FSelect.vue
│   │   ├── Header.vue
│   ├── pages
│   │   ├── ReservationsPage.vue
│   ├── store
│   │   ├── branches
│   │   │   ├── actions.js
│   │   │   ├── getters.js
│   │   │   ├── mutations.js
│   │   │   ├── state.js
│   │   ├── tables
│   │   │   ├── actions.js
│   │   │   ├── getters.js
│   │   │   ├── mutations.js
│   │   │   ├── state.js
│   │   ├── index.js
│   ├── api
│   │   ├── axios.js
│   ├── assets
│   ├── App.vue
│   ├── main.js
```

## API Integration
All API calls are made using `axios` with a `Bearer Token` for authentication.
### Example API Call
```js
axios.get(`${process.env.VUE_APP_API_BASE_URL}/branches`, {
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_AUTH_TOKEN}`
  }
})
.then(response => {
  console.log(response.data);
});
```


## Deployment
To build the project for production:
```sh
npm run build
```
The output will be in the `dist/` directory.


