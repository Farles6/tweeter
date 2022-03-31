$(document).ready(function() {

  $('#tweet-text').keyup(function() {
    const tweetText = $(this).val();
    const totalRemaining = 140 - tweetText.length;
    const counter = $('.counter');

    counter.html(totalRemaining);

    if (totalRemaining < 0) {
      if (!counter.hasClass('overTotal')) {
        counter.addClass('overTotal')
      }
    } else {
      counter.removeClass('overTotal')
    }
  });


}); 
