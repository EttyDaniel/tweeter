/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {


/*
a function that takes in a tweet object and is responsible
for returning a tweet <article> element containing the entire HTML structure 
of the tweet.
*/
const createTweetElement = function(tweetObj) {
  const $tweet = $(`<article class="tweet">
  <div id="user">
    <h3 id="name">${tweetObj.user.name}</h3>
    <img src=${tweetObj.user.avatars}>
    <h4 id="handle">${tweetObj.user.handle}</h4>
  </div>
  <div id="tweet-info">
    <div>${tweetObj.content.text}</div>
    <div class="linebreak"></div>
    <footer>
      <div>${timeago.format(tweetObj.created_at)}</div>
      <div class="footer-icons">
        <i class="fa fa-flag"></i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
      </div>
    </footer>
  </div>
</article>`);
  return $tweet;
};

/*
loops through tweets
calls createTweetElement for each tweet
takes return value and appends it to the tweets container
*/
const renderTweets = function(tweets) {
  $container = $('.tweets-container');
  $container.empty();
  for (let tweet of tweets ) {
    const $tweet = createTweetElement(tweet);
    $('.tweets-container').prepend($tweet);
  }
};

//helper function should be transffered
//this function validates that the text is not empty 
//nor it is not longer than 140 characters
// const validateForm = function(obj) {
//   return true;
// }

const form = $('.tweet-form');
form.on('submit', function(event) {
  event.preventDefault();
  
  console.log(this);
  const serializedData = $(this).serialize();
  $.post('/tweets', serializedData)
  .then((resp) => {
    console.log(resp);
    loadtweets();
  })
  form.reset();
});

  
  const loadtweets = () => {$.ajax({
    url: '/tweets',
    method: "GET",
    dataType: "json",
    success: (tweets) => {
        //console.log(tweets);
        renderTweets(tweets);
    },
    error : (error) => {
        console.log(error);
    }
  })}

  loadtweets();
});//End of document ready