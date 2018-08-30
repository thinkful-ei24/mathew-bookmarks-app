/* global store, api */
'use strict';
// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function generateItemElement(item) {
    let itemTitle = `<span class="shopping-item shopping-item__checked">${item.name}</span>`;
    // if (!item.checked) {
    //   itemTitle = `
    //     <form class="js-edit-item">
    //       <input class="shopping-item type="text" value="${item.name}" />
    //     </form>
    //   `;
    // }

    //code for number of stars in rating goes here
  
    return `
      <div class="js-bookmark-element" data-item-id="${item.id}">
      ${itemTitle} 
      <span class="stars">
      STARRATINGSGOHERE &#9733;&#9733;&#9733;&#9733;&#9733;
      </span></div>
      
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle}
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`;
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
    let items = store.bookmarks;
    // if (store.hideCheckedItems) {
    //   items = store.items.filter(item => !item.checked);
    // }

    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateBookmarkItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-items').html(shoppingListItemsString);
    
  }

  return {
    render,
    bindEventListeners
  }

}());