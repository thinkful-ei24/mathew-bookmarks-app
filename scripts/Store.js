// eslint-disable-next-line no-unused-vars
'use strict';

const store = (function() {
  //What does this do??
  // const setError = function(error) {
  //   this.error = error;
  // }

  const addItem = function(item) {
    this.bookmarks.push(item);
  }

  //bookmarks: [{cuid: afhahfadf, title: 'Title goes here',
  //             url: 'http://fakfjkajfkj', description: 'fdkajfkajf',
  //             rating: 2, expanded: false}]

  //Example return data: {
  //    "id": "8sdfbvbs65sd",
  //    "title": "Google",
  //    "url": "http://google.com",
  //    "desc": "An indie search engine startup",
  //    "rating": 4
  //  },

  return {
    bookmarks: [{cuid: afhahfadf, title: 'Title goes here',
      url: 'http://fakfjkajfkj', description: 'fdkajfkajf',
      rating: 2, expanded: false}],
    error: null,
    addingBookmark: false,
    editingBookmark: false,
    minRatingShown: 0,

    addItem,
    //setError,
    //findById,
    //findAndDelete,
    //findAndUpdate,
    //setMinRating
  }

})