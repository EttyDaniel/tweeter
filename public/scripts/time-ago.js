const elements = document.getElementsByClassName('timeago');
console.log(elements);
  for(let i = 0; i < elements.length; i++) {
    
    const timeAgoPosted = timeago.format(elements[i].dateTime);
    console.log(elements);
    elements[i].innerHTML = timeAgoPosted;
}