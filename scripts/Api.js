'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mathew/bookmarks';

  const getItems = function( callback ){
    $.getJSON(BASE_URL, callback)
  };

  const createItem = function(name, onSuccess, onError) {
    const newItem = name;
    console.log(newItem)
    
    $.ajax({
      url: BASE_URL,
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: onSuccess,
      error: onError
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: BASE_URL+ '/' + id,
      method: 'DELETE',
      success: callback
    });
  };

  const updateItem = function(itemData, onSuccess, onError) {
    const updatedItem = itemData;
    console.log('itemData from api.updateItem is ' + itemData)
    console.log('store.editingBookmark from api.updateItem is ' + store.editingBookmark)

    $.ajax({
      url: BASE_URL + '/' + store.editingBookmark,
      method: 'PATCH',
      contentType: 'application/json',
      data: updatedItem,
      success: onSuccess,
      error: onError
    });
  };

  return {
    createItem,
    getItems,
    deleteItem,
    updateItem
  };


}());