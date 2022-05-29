## Favorite Anime
* You want to search up the anime and leave a comment on the page so other people can review it? Use this website where you can search up animes, and see what other people have commented about it!

## ERD
![ERD](wireframe.png)

sequelize model:create --name comment --attributes comment:text,userId:integer,animeId:integer

sequelize model:create --name userAnime --attributes userId:integer,animeId:integer,favorite:string

sequelize model:create --name anime --attributes title:string,name:string,userId:integer,animeId:integer







## API
* https://api.jikan.moe/v4/anime?q=boruto


| VERB | URL pattern | Action \(CRUD\) | Description |
| :--- | :--- | :--- | :--- |
| GET | / | Index \(Read\) | login site |
| POST | / | CREATE \(CREATE\) | Create/Find the login |
| GET | /signup | New \(Read\) | where you can sign up |
| POST | /profile | Create \(Create\) | create your account and redirects to profile |
| GET | /Search | New \(Read\) | a place where you can search your anime |
| GET | /anime | Show \(Read\) | list of the movies |
| PUT | /anime/:id | Update \(Update\) | the specific type of anime after you click one of the list |
| DELETE | /profile | Destroy \(Delete\) | Deletes the anime that you have saved |

## User Views
![UserViews](FrontPage.png)
![ProfileView](profile.png)
![details](details.png)
![detailsMovie](detailsmovie.png)
![search](search.png)

## User Stories
* As a user, I would want to be able to log in and be directed to the home page where I can search up the animes
* As a user, I would want to be able to comment on the animes that I am searching up so other people who are searching the same animes, can see my comments
* As a user, I would want to have a profile page and within that page, I would want to see the anime that I have saved

## MVP 
* Created a login page area and a signup area and log out
* Create a profile page
* Create a search engine where people can search their anime
* Create a page of the anime, and their details and a comment section on that anime page where people can leave their comments about the anime
* A favorite/save option where it would saved on to their profile page

## Stretch
* Create a section where people can like/comment on their profile page
* Create where people can follow other people's profile
* A way to like a anime or downvote the anime.