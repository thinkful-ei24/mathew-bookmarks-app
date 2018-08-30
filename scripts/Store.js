// eslint-disable-next-line no-unused-vars
'use strict';

const store = (function() {
  //CONFUSION: What does this do??
  const setError = function(error) {
    this.error = error;
  }

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
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
    items: [],
    error: null,
    addingBookmark: false,
    editingBookmark: false,
    minRatingShown: 0,

    addItem,
    findById,
    findAndUpdate,
    setError,
    //findById,
    //findAndDelete,
    //findAndUpdate,
    //setMinRating
  }

}());