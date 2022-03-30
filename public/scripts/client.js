/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = (tweetData) => {
  let tweet = `
  <article class="tweet">
        <header class="tweets-header">
          <div class="name">
            <img src="${tweetData.user.avatars}">
            ${tweetData.user.name}
          </div>
          <div class="username">
            ${tweetData.user.handle}
          </div>
        </header>
        <p class="text">
        ${tweetData.content.text}</p>
        <footer class="tweets-footer">
          ${tweetData.created_at}
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`
  $('.tweets-container').append(tweet);
};

const renderTweets = (data) => {
  for (let tweets of data){
    createTweetElement(tweets)
  }
};


$(() => {
  $('.tweets-container').on('submit', (event) => {
    event.preventDefault();
  });
  
  
  renderTweets(data);
});