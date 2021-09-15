$(document).ready(function() {
  const textarea = document.getElementById("tweet-text");
  $(textarea).on("input", function () {
    //traversing the DOM and locating the output element 
    const output = $(this).siblings().children().last();
    //changing the value according to user input
    output.text(140 - this.value.length);
    //color red if exceeds 140
    if(this.value.length > 140) {
      $(output).css("color", "red");
    } else {
      $(output).css("color", "black");
    }
  });
});