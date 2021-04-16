"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */
 
function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let favoriteStar;
  if(currentUser.favorites.find(s => s.storyId === story.storyId)) {
    favoriteStar = "<i class='fas fa-star'></i>";
  } else {
    favoriteStar = "<i class='far fa-star'></i>";
  }
  
  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <small class="story-favorite"> ${favoriteStar} </small>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
       
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// gets user input from story form to submit a new story and passes to addStory //handle submission of submit story form

async function submitNewStory(evt) {
  console.debug("submitstory", evt);
  evt.preventDefault();

  const author = $("#story-author").val();
  const title = $("#story-title").val();
  const url = $("#story-url").val();

  let newStory = await storyList.addStory(currentUser, {author, title, url}); // pass in destructuring object
  
  let $newStory = generateStoryMarkup(newStory);

  $allStoriesList.prepend($newStory);
  $submitForm.trigger("reset");
  $submitForm.hide();
}
$("#submit-story").on("submit", submitNewStory);

// toggles adding and removing story from favorites
async function toggleFavorite (e) {
  let $targetStory = $(e.target);
  let $closestLiId = $targetStory.closest('li').attr("id");
  
  let story = storyList.stories.find(s => s.storyId === $closestLiId);

  if($targetStory.hasClass('far')) {
    await currentUser.addFavorite(story);
  } else {
    await currentUser.removeFavorite(story);
  }

  $targetStory.toggleClass('far fas');
}

$allStoriesList.on("click",".fa-star", toggleFavorite)
