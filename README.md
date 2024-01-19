# Receipe CRUD with NextJs and Node with Postgresql

<br/>

# RESTFul api with swigger documentation

<br/>

### [api documentation link](https://recipe-apo.onrender.com/api-docs/)

<br/>

<p align="center">
<img src="images/swagger.png" alt="Receipe SWIGGER App">
</p>

### [demo link](https://recipe-repo.vercel.app/)

<br/>
<p align="center">
<img src="images/website.png" alt="Receipe App">
</p>

## Table of Contents

- [Recipe UI](#search-ui)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

To install the project, you'll need to have Node.js and Yarn installed on your machine. Once you have those installed, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/konyan/recipe-app
   ```

2. Install the dependencies:

   ```
   cd recipe-repo
    cd recipe-frontend
    yarn install
    cd recipe-server
    yarn install
   ```

3. setup the envrionment:
   Add Envrionment for Api end point

   ```
   cd recipe-frontend
   touch .env
   ```

   ```
   NEXT_PUBLIC_API_ENDPOINT=
   ```

   Add Envrionment for server end point

   ```
   cd recipe-server
   touch .env
   ```

   ```
   DATABASE_URL=
   ```

## Usage

To start the development server, you need to setup postgres db url first and then run the following command:

```
yarn start
```

To start client project, you need to go to client folder and then run commend:

```
yarn dev
```
