# Welcome to my Movie Review App

This is an app were the user can search for movies and make comments and favoites of those movies. 

## Languages Used
The app was created using HTML, CSS, JSX, Express, Liquid, Node.js, JavaScript, mongoDB, Mongoose ODM. The app is deployed using the mongoDB Atlas cloud tool, and hosted with Heroku.

## API Information
I used the Open Movie Database, OMDb API to search through movies. You can find more documentation at: https://www.omdbapi.com/

## User Stories 
* As a user, I want to be able to create an account.
* As a user, I want to be able to sign in.
* As a user, I want to be able to sign out.
* As a user, I want to be able to change my password.
* As a user, I want to be able to search for movies
* As a user, I want to be able to add a movie to my favorites
* As a user, I want to be able to update my favorites.
* As a user, I want to be able to delete a specific favorite.
* As a user, I want to be able to add a comment.
* As a user, I want to be able to delete a comment


## Views

### User Views
| Route | Description |
| :----- | :----------- |
| /signup | allows users to create a new account |
| /login | allows users to sign into their account |

### Favorite movies Views
|Route: |Description |
| :--- | :---|
| /favmovies | homepage, allows user to search for a movie by title |
| /search_results | search results show page |
| /mine | shows looged in users favorite movies list |
 
# Entity Relationship Diagram (ERD)
![](prework/movie_tracker_ERD.png)