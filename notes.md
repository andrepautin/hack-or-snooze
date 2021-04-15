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



API Use           

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


FILE Use
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


