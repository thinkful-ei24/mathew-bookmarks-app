/* global store, api */
'use strict';
// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function generateItemElement(item) {

    let htmlText = '';
    const ratingString = generateRatingStars(item.rating);
    
    let htmlTitle = `<div class='bookmark js-bookmark-element data-item-id=${item.id}'>${item.title}
    <span class='stars'>${ratingString}</span>`;
    
    if (item.expanded === true) {
      htmlText = htmlTitle + `
      <p class="bookmark-drop-down">${item.description}</p>
      <p>
      <p class="go-to-site"><a href="${item.url}">Go to Site</a></button></p>
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
                
       </p>
      </div>`;
      return htmlText;
    }

    return htmlTitle + '</div>';
  }

  function generateRatingStars(ratingLevel) {
    let starString = '';

    for (let i=0; i<ratingLevel; i++) {
      starString += '&#9733;';
    }
    return starString;
  }

  function generateBookmarkItemsString(bookmarks) {
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;

    // if (store.hideCheckedItems) {
    //   items = store.items.filter(item => !item.checked);
    // }

    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateBookmarkItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-items').html(shoppingListItemsString);
    
  }

  function handleAddBookmark() {
    console.log('handle entered');
    $('.addBtn').on('click', event => {
      event.preventDefault();
      console.log(event);
    });
  }

  function bindEventListeners() {
    console.log('Bind Event Listeners')
    handleAddBookmark();
  }

  return {
    render,
    bindEventListeners
  }

}());