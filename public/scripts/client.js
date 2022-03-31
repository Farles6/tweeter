
//Runs after the page is loaded
$(function() {


//Prevents people from submitting malicious tweets
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * creates the html for new tweets
 * @param {object} tweetData  obj database
 */
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

/**
 * loops through array to gather object info
 * @param {arr} data array with objects inside
 */
const renderTweets = (data) => {
  for (let tweets of data) {
    createTweetElement(tweets);
  }
};




  $('.error-text').hide();

  /**
   * get the all the info from the /tweets page and renders it into html
   */
  const loadTweets = () => {
    $.get('/tweets', { method: 'Get' })
      .then(function(tweets) {
        renderTweets(tweets);
      })
  };

  loadTweets();

  //prevents the page from loading into its default setting
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    const tweetText = $(this).children('#tweet-text').val();

    $('.error-text').slideUp();

    if (tweetText === '') {
      $('.error-text').html('⚠️ Need to enter some text before submitting. ⚠️');
      $('.error-text').slideDown();
      return;
    }
    else if (tweetText.length > 140) {
      $('.error-text').html('⚠️ Tweet must be 140 characters or less. ⚠️');
      $('.error-text').slideDown();
      return;
    }

    //Encodes a form element as a string for submission
    const tweetString = $(this).serialize();

    //Sends a POST request when text is input and clears textarea as well as resetting counter back to 140
    $.post('/tweets', tweetString)
      .done(function() {
        console.log('Success', tweetString)
        $('#tweet-text').val('');
        $('.counter').text(140);
        loadTweets();
      });
  });

  //hides/shows compose tweet section when clicked
  $('.newTweet').click(() => {
    $('.new-tweet').slideToggle('100', () => {
      $('#tweet-text').focus();
    })
  });

});