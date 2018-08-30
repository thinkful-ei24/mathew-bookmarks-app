// eslint-disable-next-line no-unused-vars
'use strict';

const store = (function() {
  //What does this do??
  // const setError = function(error) {
  //   this.error = error;
  // }

  const addItem = function(item) {
    this.items.push(item);
  };

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
    items: [{id: 'oneId', title: 'Title 1 goes here',
      url: 'http://url1goeshere', description: 'This is the first description',
      rating: 2, expanded: false},
      {id: 'twoID', title: 'Title 2 is here',
      url: 'http://url2goeshere', description: 'this is the second description',
      rating: 5, expanded: false},
      {id: 'threeId', title: 'Title 3 goes here',
      url: 'http://url3goeshere', description: 'This is the third description',
      rating: 1, expanded: false}],
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

}());