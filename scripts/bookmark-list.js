/* global store, api */
'use strict';
// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function generateItemElement(item) {

    console.log(item)
    let itemTitle = `${item.name}`;
    // if (!item.checked) {
    //   itemTitle = `
    //     <form class="js-edit-item">
    //       <input class="shopping-item type="text" value="${item.name}" />
    //     </form>
    //   `;
    // }


    const ratingString = generateRatingStars(item.rating);

    return `
    <div class='bookmark js-bookmark-element data-item-id=${item.id}'>${item.title}
    <span class='stars'>${ratingString}</span></div>
    `;
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
    // if (store.error) {
    //   const el = generateError(store.error);
    //   $('.error-container').html(el);
    // } else {
    //   $('.error-container').empty();
    // }

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

  function bindEventListeners() {
    console.log('Bind Event Listeners')
  }

  return {
    render,
    bindEventListeners
  }

}());