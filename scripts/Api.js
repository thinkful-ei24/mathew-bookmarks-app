'use strict';

const api = (function() {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mathew/bookmarks';

  const getItems = function( callback ){
    $.getJSON(BASE_URL, callback)
  }

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
  }

  return {
    createItem,
    getItems,
  }


}());