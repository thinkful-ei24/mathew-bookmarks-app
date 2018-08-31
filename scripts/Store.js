// eslint-disable-next-line no-unused-vars
'use strict';

const store = (function() {
  const setError = function(error) {
    this.error = error;
  }

  const addItem = function(item) {
    this.items.push(item);
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  //bookmarks: [{id: afhahfadf, title: 'Title goes here',
  //             url: 'http://fakfjkajfkj', desc: 'fdkajfkajf',
  //             rating: 2, expanded: false}]

  //Example return data: {
  //    "id": "8sdfbvbs65sd",
  //    "title": "Google",
  //    "url": "http://google.com",
  //    "desc": "An indie search engine startup",
  //    "rating": 4
  //  },

  //TODO: editingBookmark: id or false? remember strings are true

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
    findAndDelete,
    //findAndUpdate,
    //setMinRating
  }

}());