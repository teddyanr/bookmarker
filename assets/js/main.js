document.getElementById('myform').addEventListener('submit', saveBookmark);

// Save bookmarks
function saveBookmark(e) {

  //Get form values
  var sitename =document.getElementById('sitename').value;
  var siteurl =document.getElementById('siteurl').value;

  if (!falidateform(sitename, siteurl)) {
    return false;
  }

  // Make variable for form
  var bookmark = {
    name: sitename,
    url: siteurl
  }

  // Test bookmarks if null
  if(localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    //Set localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myform').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form submitting
  e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // function loop for bookmarks
  for (var i =0;i < bookmarks.length;i++) {
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');
  // Output bookmarkers
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary" target="_blank" href="'+addhttp(url)+'">Visit</a>' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';
  }
}

// Validate form
function falidateform (sitename, siteurl){  

  if (!sitename || !siteurl) {
    alert('Please fill the form!');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteurl.match(regex)) {
    alert('Please use valid URL');
    return false;
  }

  return true;
}

function addhttp(url) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
      url = "http://" + url;
  }
  return url;
}