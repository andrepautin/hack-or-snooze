## Flow of Page / which functions are called

1. At Page Load
 start (main.js) 
    => CheckForRememberedUser (user.js) 
        => UpdateUIonUserLogin (user.js)
        => PutStoriesOnPage (stories.js) 
        => updateNavonLogin (nav.js)
        => generateUserProfile (user.js)
    => PutStoriesonPage (stories.js)
2. Home Button
    => navAllStories (nav.js)
        => PutStoriesOnPage (stories.js)
3. Submit Button
    => newSubmitStoryClick (nav.js)
        Submit Form Button => submitNewStory (stories.js) 
4. Favortites Button
    => newFavoritesClick (nav.js)
        => putFavortiesListOnPage (stories.js)
5. Favoriting / Unfavoriting
    => toggleStoryFavorite (stories.js)
6. My Stories Button
    => navMyStories (nav.js)
        => putUserStoriesOnPage (stories.js)
    => delete Button
        => deleteStory (stories.js)
            => putUserStoriesOnPage (stories.js)
7. SignUp Button
    => signup (user.js)
        => saveUserCredentialsInLocalStorage (user.js)
        => updateUIonUserLogin (user.js)
        => PutStoriesOnPage (user.js)
        => updateNavOnLogin (nav.js)
        => generateUserProfile (nav.js)


## API Use           

1. List of Stories 
    - Used for PutStoriesOnPage
    - Response :
        {
            "stories": [
            {
                "author": "Elie Schoppik",
                "createdAt": "2018-11-14T01:36:12.710Z",
                "storyId": "991b95a0-507f-472e-9f94-e3bd4b6fe882",
                "title": "Four Tips for Moving Faster as a Developer",
                "updatedAt": "2018-11-14T01:36:12.710Z",
                "url": "https://www.rithmschool.com/blog/developer-productivity",
                "username": "test"
            }
        ]
        }
2. Sign Up (POST)
    - Used for signup
    - Request: '{"user": {"name":"Test User","username":"test","password":"foo"}}'
    - Response: {
                    "token": "YOUR_TOKEN_SHOWS_UP_HERE",
                    "user": {
                        "createdAt": "2018-11-14T01:35:07.974Z",
                        "favorites": [],
                        "name": "Test User",
                        "stories": [],
                        "updatedAt": "2018-11-14T01:35:07.974Z",
                        "username": "test"
                    }
                }
3. Create a New Story (POST)
    - /stories
    - Used in submitNewStory
    - Request: {
                    "token":"PASTE_YOUR_TOKEN_HERE", 
                    "story": {
                        "author":"Elie Schoppik",
                        "title":"Four Tips for Moving Faster as a Developer", 
                        "url": "https://www.rithmschool.com/blog/developer-productivity"
                    } 
                }'
    - Response": {
                    "story": {
                        "author": "Elie Schoppik",
                        "createdAt": "2018-11-14T01:36:12.710Z",
                        "storyId": "991b95a0-507f-472e-9f94-e3bd4b6fe882",
                        "title": "Four Tips for Moving Faster as a Developer",
                        "updatedAt": "2018-11-14T01:36:12.710Z",
                        "url": "https://www.rithmschool.com/blog/developer-productivity",
                        "username": "test"
                    }
                }


## FILE Use
1. models.js
    => handles data/logic of site (NO UI)
    => has BASE_URL to add API at endpoint

    => class Story 
        => POST request to stories API: (author, title, url)
            => response from API: (storyID, title, author, url, username, createdAt)
                => passed to constructor to create instance of Story
        => getHostName 
            => extact protocol and just get "blahblah.com"

    => class StoryList
        => GET request to stories API 
            => response: array from API of JSON objects
                => create instances of Story objects and put into array of stories
                    => creates instance of StoryList using stories array
        => addStory() 
            => POST request a new story to API
            => need to access user token to add 
    => class User   
        => POST request to signup API: (username, password, name)
            => response: API 2 new User

2. stories.js
    => getAndShowStoriesOnStart() 
        => function call getStories from stories API    
            => removes loading message
            => putStoriesOnPage() called to append list of stories
    => putStoriesOnPage() 
        => empties current area for list of stories
        => generateStoryMarkUp called on each story in stories  
            => appended to page area for stories
            => generateStoryMarkUp()
                => formats story as HTML list item
            => shows whole story list after each story appended

3. User.js
    => login()
        => stores username and password from form
        => runs User.login from modals.js to check if login API finds user. If so, returns new User Instance as currentUser
        => resets login?
        => runs Save User Credentials
        => updates User UI
    => signup()
        => stores username, password, name
        => runs User.signup() from modals.js to register new user in API
        => returns that new User instance as currentUser
        => Runs Save User Credentials
        => Updates User UI
        => resets page?
    => logout()
        => clears localStorage credentials
        => reloads currents page
    => checkForRememberedUser()
        => checks local storage for token key and username
            => if found it runs User.loginViaStoredCredentials to get user data from User API
            => returns new User instance stored as currentUser
    => saveUserCrentials()
        => if currentUser exists => store token and username in local storage
    => updateUIOnUserLogin()
        => shows storiesList
        => runs updateNavOnLogin() to show navigation DOM elements

4. Nav.js
    => navAllStories()
        => calls hidePageComponents in main.js
        => calls putStoriesOnPage in stories.js
    => navLoginClick()
        => calls hidePageComponents in main.js
        => updates DOM to show login form / sign-up form
    => updateNavOnLogin() 
        => updates DOM to show links available to loged in user
        => hides elements for Login and shows elements for logout
        => adds text of username and then updates DOM to show userProfile

5. main.js
    => const global variables for main DOM elements
    => hidePageComponents()
        => hides stories, loginform, and signupform
    => start()
        => runs CheckedforRememberedUser()
        => runs showStories onStart from Stories API
        => if there is a current user then update Login Nav DOM

# WHAT WE NEED TO ADD / TODO

## PART 2A
    1. Write a function for addStory that is a POST request to the Story API and receives the response with added data
    2. Taking response from API to create new Story instance and add it to storiesList

    ex. let newStory = await storyList.addStory(currentUser,
        {title: "Test", author: "Me", url: "http://meow.com"});

        newStory instanceof Story;      // should be true!
        console.log(storyList);         // you should see your new story here!    



    
    



