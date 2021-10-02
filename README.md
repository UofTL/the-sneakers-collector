# the sneakers-collector

Live URL:https://stormy-wave-68711.herokuapp.com/
Repo URL:https://github.com/UofTL/the-sneakers-collector.git

This CMS-style site is similar to a Wordpress site. It give opportunity to user to publish their sneakers collection, posts, and comment on vote on users' collection as well. 
## Test
* ![markdown-preview-image](./video/test.gif)

## Screen Shots

![image](https://user-images.githubusercontent.com/84641285/135176803-0815b0bf-44db-49e1-8570-d4a5766758d9.png)
![image](https://user-images.githubusercontent.com/84641285/135176865-90075ef5-6ca5-4732-a160-8a5941153464.png)
![image](https://user-images.githubusercontent.com/84641285/135176982-84455d6f-d34e-4dbb-b5e0-61a3b130ae73.png)

## User Story
```md
AS A sneakers collector who is passioned with very expensive sneakers
I WANT a CMS-style app site
SO THAT I can display my collection, and other's  user can vote on my collection
```

## Acceptance Criteria

```md
GIVEN a CMS-style sneakers collector app
WHEN I visit the site for the first time
THEN I am presented with the homepage, navigation links for the homepage and the option to log in
WHEN I click on the homepage option
THEN I am taken to the homepage
WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or login
WHEN I choose to sign up
THEN I am prompted to create a username and password
WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site
WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password
WHEN I am signed in to the site
THEN I see navigation links for the homepage, collection, and the option to log out
WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing user's sneakers collection that include sneakers name, sneakers picture, owner, paid price, resell price sneakers' size and the user' note
WHEN I click on an existing collection
THEN I am presented with my user sneakers collection 
WHEN I click on add
THEN I am presented with a pop-in screen with a dropdown menu to select the sneakers' name, size, paid price, resell price and note
WHEN I click on the save changes button
THEN all the change are saved 
WHEN I click on the close button
THEN all the change are disregarded
WHEN I click on the logout option in the navigation
THEN I am signed out of the site
WHEN I am idle on the site for more than a set time
THEN I am able to view comments but I am prompted to log in again before I can add, update, or delete comments
```
## Build With
- Discord
- CSS
- GitBash
- GitHub
- Google Meet
- Handlebars
- Heroku
- Insomnia
- JavaScript
- JawsDB MySQL
- Powerpoint
- Screencastify 
- SQL
- Word
- Zoom
- Node.js
  - bcrypt 
  - Bulma
  - Chai
  - connect-session-sequelize
  - dotenv
  - Express
  - express-handlebars
  - express-session
  - Jest
  - Lodash
  - Mocha
  - MySQL2
  - Nodemon
  - Sequelize

## Install

Clone project.
Run the following line of code in your terminal to install all the needed packages: 
```
npm i
```
## Usage
- Once all the packages have been installed, open terminal and run the following code in command line : 
  - mysql -u root -p
  - source db/schema.sql
  - quit
  - cd ./seeds
  - node index.js
  - cd ../
  - npm start

```
