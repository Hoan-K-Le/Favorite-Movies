<h1> TO DO: LIST</h1>

<h1>MVPS</h1>

## Front Page // Functionality
* A home page where people can log in/ or sign up
* Give them guest ID/password 
* A instruction area or what the website is about
* Can not see the password

## Sign up Page // Functionality
* A page where people can sign up for the website
* After signing up, have it redirect you to the profile page
* make sure you can not reuse the same email

## Profile Page // Functionality
* Where you can see all the name of the anime's that you like
* A nav bar link that'll direct you to the details page when you click on that name
* Have a delete button where you can delete the favorite anime


## Home Page // Functionality
* Where you can search up the the name of the anime
* Have it direct to the results page of your search
* About section

## Results Page // Functionality
* List of the names of the animes you are searching for
* Able to click on the anime which will then redirect you to the details page

## Results/details Page // Functionality
* Able to see the details of the anime, img
* Able to leave a comment and maybe a review rating?(1-5)
* Able to Save the Movie to your profile 


## Front Page // CSS
* Background Image
* center box where you login/ signup button

## Sign up Page // CSS
* An animation where you can sign up

## Profile Page // CSS
* A section with the user name, and underneath will be a list of the favorite animes

## Home Page // CSS
* Search bar    
* background images 
* About section area


## layout 
 <nav>
    <ul>
      <% if (user) {%>
        <!-- if the user is logged in -->
        <li>
          <a href="/users/profile">Profile</a>
        </li>
        <li>
          <a href="/users/logout">LogOut</a>
        </li>
     <% } else {%>
      <!-- if the user is not logged in -->
      <li>
        <a href="/users/new">Sign up</a>
      </li>
      <li>
        <a href="/users/login">Log in</a>
      </li>
     <% }%>


    </ul>
  </nav>