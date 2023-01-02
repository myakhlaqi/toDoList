
<h1 align="center">ToDo list</h1>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> A simple web app to store toDo items
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [TODO](../TODO.md)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

This is a simple web application based on MEAN stack to store toDo list items for multiple lists. It uses the MongoDB Atlas to store the todo list and list items.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

The following software must be installed before starting the project:

```
1- git
2- nodejs
3- mongodb (local) or mongodb atlas (on the cloud)
```
Clone the project by this command:
```
git clone https://github.com/myakhlaqi/toDoList.git
```
### Installing dependency

This project required the following nodejs dependencies:


```
    "body-parser": "^1.20.1",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "moment": "^2.29.4",
    "mongoose": "^6.8.0",
    "request": "^2.88.2"
```
To install all dependencies run following command on the project root
```
npm install 
```
To configure the MongoDB connection string create a .env file and replace your connection string. The sample .env file content presented here:
```
MONGODB_URI="mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true"
PORT=3000
```
PORT refers to the nodejs server port on the server side.


## 🔧 Running <a name = "tests"></a>

After configuring everything in previous step you are ready to run the application locally.

To run the application locally you type:

```
npm run start
or
node index.js
```
Open following link to see the web application:
```
http://localhost:3000/
```
The online version of the application is up and running at this URL:
```
https://todolist-1m63.onrender.com/
```


## 🎈 Usage <a name="usage"></a>

By default a new list will be created for every new day with the name of current date with default values.
To create a new list just add the list name to the url. For example to create a toDoList for your Home activity this url:

```
http://localhost:3000/home
or
https://todolist-1m63.onrender.com/home

```

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Bootstrap](https://bootstrapjs.com/js/bootstrap.min) -Frontend framework

## ✍️ Authors <a name = "authors"></a>

- [@myakhlaqi](https://github.com/myakhlaqi) 

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Thanks to [Dr. Angela](https://www.udemy.com/user/4b4368a3-b5c8-4529-aa65-2056ec31f37e/)
- This project is inspired from [*The Complete 2023 Web Development Bootcamp* ](https://www.udemy.com/course/the-complete-web-development-bootcamp/) at Udemy.com
