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
  const safeText = $("<div>").text(tweetObj.content.text).html();
  console.log("This is the content: ", tweetObj.content.text);
  console.log("This is what happend after safetext: ", safeText);
  const $tweet = 
  $(`<article class="tweet">
      <div class="user">
        <div class="user-details"><img class="avatar" src=${tweetObj.user.avatars}>
        <h3 class="name">${tweetObj.user.name}</h3></div>
        <h4 class="handle">${tweetObj.user.handle}</h4>
      </div>
      <div class="tweet-info">
        <div>${safeText}</div>
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
  console.log($tweet);
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
const validateForm = function(text) {
  let err = null;
  if (!text) {
    err = "text can not be empty";
  } else if (text.length > 140) {
    err = "text can not exceed 140 characters";
  }
  return err;
}

const form = $('.tweet-form');


form.on('submit', function(event) {
  event.preventDefault();
  const $textareaContainer = $("textarea");
  const textValue = $textareaContainer.val();
  const $counterContainer = form.find('.counter');
  console.log('__________', textValue);

  const err = validateForm(textValue);
  if(err) {
    alert(err);
    return;
  }
  console.log("validation successful");
  const serializedData = $(this).serialize();
  $.post('/tweets', serializedData)
  .then((resp) => {
    $textareaContainer.val("");
    const $counterContainer = form.find('.counter');
    $counterContainer.text(140);
    loadtweets();
  })
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