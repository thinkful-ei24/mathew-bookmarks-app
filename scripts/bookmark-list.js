/* global store, api */
'use strict';
// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {

  function generateAddBookmarkHtml() {
    if (store.addingBookmark === true) {
      const htmlText = `<div class="bookmark addbookmark">
              <form class="1form-bookmark">Add Bookmark
              <fieldset class='titleLink'>
              <label for="title">Title</label>
              <input type="text" name='title' id='bookmark-title' />
              
              <label for="link">Link</label>
              <input type="text" name='url' id='bookmark-link' />
            </fieldset>
            <fieldset class="form-description">
              <label for="description">Description</label>
              <input type="textarea" name='desc' id='bookmark-description' />
            </fieldset>
              <fieldset class='ratingarea'>
                  <legend>Your Rating</legend>
          
                  <input type="radio" id="bookmark-5stars" name="rating" value="5" checked />
                      <label for="bookmark-5stars">5 Stars</label>
                  
                      <input type="radio" id="bookmark-4stars" name="rating" value="4" />
                      <label for="bookmark-4stars">4 Stars</label>
                  
                      <input type="radio" id="bookmark-3stars" name="rating" value="3" />
                      <label for="bookmark-3stars">3 Stars</label>
                  
                      <input type="radio" id="bookmark-2stars" name="rating" value="2" />
                      <label for="bookmark-2stars">2 Stars</label>
                  
                      <input type="radio" id="bookmark-1stars" name="rating" value="1" />
                      <label for="bookmark-1stars">1 Stars</label>
                  </fieldset>
                  <input type="button" name="CancelBookmark" id='bookmark-cancel' class='formBtn button' value="Cancel Bookmark" />
                  <input type="button" name="SaveBookmark" id='bookmark-save' class='formBtn button' value="Save Bookmark" />
                  
            </form>
        </div>`;
      return htmlText;
    };
  }

  function generateItemElement(item) {
    let htmlText = '';
    const ratingString = generateRatingStars(item.rating);
    
    let htmlTitle = `<div class='bookmark js-bookmark-element' data-item-id="${item.id}"><p class='js-title-area'>${item.title}
    <span class='stars'>${ratingString}</span></p>`;
    
    if (item.expanded === true) {
      htmlText = htmlTitle + `
      <p class="bookmark-drop-down">${item.desc}</p>
      <p>
      <p class="go-to-site"><a href="${item.url}" target="_blank">Go to Site</a></button></p>
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

    for (let i=0; i < ratingLevel; i++) {
      starString += '&#9733;';
    }
    return starString;
  }

  function generateBookmarkItemsString(bookmarks) {
    let items = [];
    items = bookmarks.map((item) => generateItemElement(item));
    items.unshift(generateAddBookmarkHtml());
    return items.join('');
  }

  function render() {
    // Filter item list if store prop is true by item.checked === false
    let items = store.items;

    if (store.error) {
      const el = generateError(store.error);
      $('.error-div').html(el);
    } else {
      $('.error-div').empty();
    }

    // if (store.hideCheckedItems) {
    //   items = store.items.filter(item => !item.checked);
    // }

    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateBookmarkItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-items').html(shoppingListItemsString);
    
  }

  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  function handleAddBookmarkButton() {
    console.log('handle entered');

    $('.addBtn').on('click', event => {
      event.preventDefault();
      
      //get user data --> Done by click

      //update store
      store.addingBookmark = !store.addingBookmark;

      //render()
      render();
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .parent('.js-bookmark-element')
      .data('item-id');
  }

  function handleClickTitleToExpand() {
    $('.js-items').on('click', '.js-title-area', event => {
      //get user data
      const id = getItemIdFromElement(event.target);
      const item = store.findById(id);

      //update store
      store.findAndUpdate(id, { expanded: !item.expanded });
      
      //render
      render();
    });
  }

  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error-message">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function handleAddBookmarkSaveButton() {
    $('.js-items').on('click', '#bookmark-save', event => {
      event.preventDefault();
      console.log('Save pressed')

      //get data from user
      const jsonFormData = $('.1form-bookmark').serializeJson();
      const newItem = '';

      api.createItem(jsonFormData,
        (newItem) => {
          //change the store
          store.addItem(newItem);
          //render
          render();
        },
        (err) => {
          //change the store
          store.setError(err);
          //render
          render();
        }
      );
    });
  }

  function handleCloseError() {
    $('.error-div').on('click', '#cancel-error', () => {
      store.setError(null);
      render();
    });
  }

  function bindEventListeners() {
    console.log('Bind Event Listeners')
    handleAddBookmarkButton();
    handleClickTitleToExpand();
    handleAddBookmarkSaveButton();
    handleCloseError();
  }

  return {
    render,
    bindEventListeners
  }

}());