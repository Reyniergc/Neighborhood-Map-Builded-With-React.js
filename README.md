# Neighborhood-Map-Builded-With-React.js
Project realized during the Udacity Front-End Nano Degree course.

**__Main goal of the project Neighborhood Map.__**

The main goal of this project is to learn to use Google Maps Api using React.js. The application shows the map of
Malta island with seven markers on the map that display util information about the places such as the name of the place, country, city, address, postal code and geographical coordinates.
Also this project uses a **__Service Worker__** that allows the user to use the application while offline without having a network connection.

**__PLEASE NOTE:__** The service workers for this app will only cache the site when it is in production mode.
As the current application is running in development mode, if you want you can change the enviroment to **production mode** and for do this you should execute the following command:

- **npm run build**

**__Requeriments to run the aplication:__**
- Download and install node.js
- Open the command line in the folder of your project and execute the followings commands:
  - **npm install**. That will install the node dependencies
  - Install all dependencies directly => **npm install google-maps-react bootstrap jquery popper.js react-icons --save**
  
  Or install the dependencies one by one:
  - **npm install --save google-maps-react**. This command will install the node module Google Maps that will made the aplication able to work with react.js
  - **npm install --save bootstrap**. As the application uses BootStrap Modal we need to install BootStrap.
  - **npm install jquery**. This command will install jquery that is used by **BootStrap**.
  - **npm install popper.js --save**. Also we need to install the popper module that is used by Jquery.
  - **npm install react-icons --save**. To install react icons used inside the modal.
  - Now start the server -> **npm start**
- To run the aplication use the link http://localhost:3000


**References:**

- [React Google Maps Module](https://www.npmjs.com/package/google-maps-react)

- [React Icons Module](http://gorangajic.github.io/react-icons/)

- [Four Square](https://developer.foursquare.com/)

- [React Official Documentation](https://reactjs.org)

- [Twiteer BootStrap Official Documentation](https://getbootstrap.com/)

- [Service Worker Documentation](https://www.sitepoint.com/getting-started-with-service-workers/)

- [Aria Documentation](https://www.w3.org/TR/wai-aria/)