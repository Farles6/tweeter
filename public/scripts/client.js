/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweetData) => {
  const safeHTML = escape(tweetData.content.text);
  let timeCreated = tweetData.created_at;
  let time = timeago.format(timeCreated);
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
        ${safeHTML}</p>
        <footer class="tweets-footer">
          ${time}
          <div>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>`;
  $('.tweets-container').prepend(tweet);
};

const renderTweets = (data) => {
  for (let tweets of data) {
    createTweetElement(tweets);
  }
};



$(function() {
  $('.error-text').hide()
  
  const loadTweets = () => {
    $.get('/tweets', {method: 'Get'})
    .then(function(tweets){
      renderTweets(tweets);
    })
  };
  
  loadTweets();
  
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetText = $(this).children('#tweet-text').val();
    
    $('.error-text').slideUp();

    if (tweetText === ''){
      $('.error-text').html('⚠️ Need to enter some text before submitting. ⚠️')
      $('.error-text').slideDown()
      return;
    } 
    else if (tweetText.length > 140){
      $('.error-text').html('⚠️ Tweet must be less than 140 characters. ⚠️');
      $('.error-text').slideDown();
      return;
    }
    const tweetString = $(this).serialize();
    
    $.post('/tweets', tweetString)
    .done(function() {
      console.log('Success', tweetString)
      $('#tweet-text').val('');
      $('.counter').text(140);
      loadTweets();
    })
    
  });


  
 
  

});