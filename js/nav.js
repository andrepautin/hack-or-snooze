"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

/** When a user clicks submit, updates DOM to show story form */

function navSubmitClick() {
  console.debug("navSubmitClick");
  $submitForm.slideToggle();
}
$("#nav-submit").on("click", navSubmitClick);

// calls putUserFavoriteStoriesOnPage when favorites link is clicked in nav
// function to handle when favorites clicked in navbar
// $("#nav-favorites").on("click", putUserFavoriteStoriesOnPage);

