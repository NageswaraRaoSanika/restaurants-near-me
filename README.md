# restaurants-from-zomato

# Assumptions
    When user visits application https://restaurant-from-zomato.herokuapp.com/
    1. Functional
        - Selecting Preferred Location
            1. Initially he can see the modal box to select location for restaurants.
            2. When He Successfully Selects the location, Left side Filter Cuisine types will updated according to the selected location
            3. If user dismisses the modal , still user can select the location from left side filters.
        - View Restaturants
            1. After successful selection of location now he can browse the restaurants in tile view
            2. Each tile should show the summary of restaturant like name address votes and rating
            3. Each tile can be clickable to view the restaturant details
        - Filter Restaurants
            1. Left Side you can always filter restaurants using Location, Restaurant name and Cuisine Types
            2. You can also sort by rating and cost using top right select menu

    2. UI
        - Should be responsive, Filters can be viewed on clicking on menu icon in mobile view and exposed in desktop view

# Build & development
    - Cloning
        `git clone https://github.com/NageswaraRaoSanika/restaurants-near-me.git`
        `cd restaurants-near-me`

    - Install Dependencies
        `npm install`

    - Starting Server
        `npm start`
        
    - Build Static Files
        `npm run build`
            - check build folder for static resources

# Development Dependencies
    - React - latest
    - Material UI - latest
    - fetch api
    - react-scripts
    - react-autosuggest

# Future Improvements
    - Can use Redux for better state management
    - Adding more filters from zomato api search parameters
    - Automatic Deployments (dev & production) using flighplan or docker
