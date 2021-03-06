/* global store, api */
'use strict';
// eslint-disable-next-line no-unused-vars

const bookmarkList = (function() {
 
  $.fn.extend({
    serializeJson: function() {
      const formData = new FormData(this[0]);
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }
  });

  function generateBookmarkHtml() {
    if (store.addingBookmark) {
      return generateAddBookmarkHtml();
    } else if (store.editingBookmark !== false) {
      return generateEditBookmarkHtml();
    }
  }

  function generateAddBookmarkHtml() {
    const htmlText = `
    <section class="bookmark addbookmark" role="region">
      <form class="1form-bookmark">Add Bookmark
        <fieldset class='titleLink'>
          <label for="title">Title</label>
          <input type="text" name='title' id='bookmark-title' placeholder='eg., Cats and Stuff' />
            
          <label for="link">Link</label>
          <input type="text" name='url' id='bookmark-link' placeholder='eg., http://www.google.com' />
        </fieldset>
        <fieldset class="form-description">
          <label for="description">Description</label>
          <textarea type="textarea" name='desc' id='bookmark-description' placeholder='eg., A webpage about cats'></textarea>
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
                
        <input type="button" name="CancelBookmark" id='bookmark-cancel' class='formBtn button' value="Cancel" />
        <input type="button" name="SaveBookmark" id='add-bookmark-save' class='formBtn button' value="Save" />
                
      </form>
    </section>`;
  return htmlText;
  }

  function generateEditBookmarkHtml() {
    const item = store.findById(store.editingBookmark);
    let ratingHTML = '';
    console.log(item)
    
    for(let i=1; i <= 5; i++ ) {
      if ( i === item.rating) {
        ratingHTML += `
        <input type="radio" id="bookmark-${i}stars" name="rating" value="${i}" checked />
        <label for="bookmark-${i}stars">${i} Stars</label>
        `;
      } else {
        ratingHTML += `
          <input type="radio" id="bookmark-${i}stars" name="rating" value="${i}" />
          <label for="bookmark-${i}stars">${i} Stars</label>`;
      }
    }

    const htmlText = `
    <section class="bookmark addbookmark" role="region">
      <form class="1form-bookmark">Edit Bookmark
        <fieldset class='titleLink'>
          <label for="title">Title</label>
          <input type="text" name='title' id='bookmark-title' placeholder='eg., Cats and Stuff' value='${item.title}' />
            
          <label for="link">Link</label>
          <input type="text" name='url' id='bookmark-link' placeholder='eg., http://www.google.com' value='${item.url}' />
        </fieldset>
        <fieldset class="form-description">
          <label for="description">Description</label>
          <textarea type="textarea" name='desc' id='bookmark-description' placeholder='eg., A webpage about cats'>${item.desc}</textarea>
        </fieldset>
        <input type="button" name="CancelBookmark" id='bookmark-cancel' class='formBtn button' value="Cancel" />
        <fieldset class='ratingarea'>
          <legend>Your Rating</legend>
        
          ${ratingHTML}
        </fieldset>
                
        <input type="button" name="SaveBookmark" id='edit-bookmark-save' class='formBtn button' value="Save" />
                
      </form>
    </section>`;
    return htmlText;
    
  }

  function generateItemElement(item) {
    let htmlText = '';
    const ratingString = generateRatingStars(item.rating);
    
    let htmlTitle = `<section class='bookmark'>
    <button role='button' class='title-button js-bookmark-element' data-item-id="${item.id}">
    <p class='js-title-area'>${item.title}<span class='stars'>${ratingString}</span></p></button>`;
    
    if (item.expanded === true) {
      htmlText = htmlTitle + generateExpandedBookmarkHtml(item);
      return htmlText + '</section>';
    }

    return htmlTitle + '</section>';
  }

  function generateExpandedBookmarkHtml(item) {
    return `
    <p class="bookmark-drop-down">${item.desc}</p>
    <p class="go-to-site"><a href="${item.url}" target="_blank">Visit Site</a></p>
    <button class="js-item-edit button">Edit</button>
    <button class="js-item-delete button">Delete</button>
    `;
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
    if (store.addingBookmark || store.editingBookmark) {
      items.unshift(generateBookmarkHtml());
    }
    
    return items.join('');
  }

  function generateError(err) {
    let message = '';
    if (err.responseJSON && err.responseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }

    return `
      <section class="error-message" role="region">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function getItemIdFromElement(item) {
    return $(item)
      .siblings('.js-bookmark-element')
      .data('item-id');
  }

  function render() {
    //Code for MinValueFilter
    //  Get MinValue from store
    //  Filter items using minValueFilter number
    //  Show items
    //  Reset MinValue store value = store.resetMinValue()
    //  Reset MinValue select box
    let items = store.items;

    if (store.error) {
      const el = generateError(store.error);
      $('.error-div').html(el);
    } else {
      $('.error-div').empty();
    }

    items = items.filter( item => {
      if ( store.minRatingShown === 'showAll') {
        return item;
      } else if ( item.rating >= store.minRatingShown ) {
        return item;
      }
    });

    // render the shopping list in the DOM
    console.log('`render` ran');
    const shoppingListItemsString = generateBookmarkItemsString(items);
  
    // insert that HTML into the DOM
    $('.js-items').html(shoppingListItemsString);
    
  }

  function handleAddBookmarkButton() {
    $('.addBtn').on('click', event => {
      event.preventDefault();
      
      //get user data --> Done by click

      //update store
      store.addingBookmark = !store.addingBookmark;

      //render()
      render();
    });
  }

  function handleClickTitleToExpand() {
    $('.js-items').on('click', '.js-bookmark-element', event => {
      //event.preventDefault();
      //get user data
      const id = $(event.currentTarget).data('item-id');
      const item = store.findById(id);

      //update store
      store.findAndUpdate(id, { expanded: !item.expanded });

      //render
      render();
    });
  }

  function handleAddBookmarkSaveButton() {
    $('.js-items').on('click', '#add-bookmark-save', event => {
      event.preventDefault();
      
      //get data from user
      const jsonFormData = $('.1form-bookmark').serializeJson();
      const newItem = '';

      api.createItem(jsonFormData,
        (newItem) => {
          //change the store
          store.addItem(newItem);
          //render
          render();
          store.addingBookmark = false;
          //CONFUSION: I want Add Bookmark to run, then close once save is hit.
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

  function handleDeleteItemClicked() {
    $('.js-items').on('click', '.js-item-delete', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      api.deleteItem(id, () => {
        store.findAndDelete(id);
        //Bug fix: If this is not here, and someone edits a bookmark then deletes it, a TypeError is thrown
        store.addingBookmark = false;
        store.editingBookmark = false;
        
        render();

        
      })
    });
  }

  function handleEditBookmarkButton() {
    $('.js-items').on('click', '.js-item-edit', event => {
      event.preventDefault();
      
      //get user data --> Done by click
      const id = getItemIdFromElement(event.currentTarget);
      
      //change the store
      store.editingBookmark = id;

      //render()
      render();
      
    });
  }

  function handleEditBookmarkSaveButton() {
    $('.js-items').on('click', '#edit-bookmark-save', event => {
      event.preventDefault();
      
      //get data from user
      const jsonFormData = $('.1form-bookmark').serializeJson();
      console.log($('.1form-bookmark'))
      const newItem = '';


      api.updateItem(jsonFormData,
        (foo) => {
          //change the store
          store.findAndUpdate(store.editingBookmark, JSON.parse(jsonFormData));
          store.editingBookmark = false;

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

  function handleCancelButton() {
    $('.js-items').on('click', '#bookmark-cancel', event => {
      store.editingBookmark = false;
      store.addingBookmark = false;
      render();
    });
  }

  function handleMinRatingChooser() {
    $('.minimum_rating_box').change(event => {
      //get data from user
      const minRatingValue = $(event.target).val();

      //update state
      store.minRatingShown = minRatingValue;

      //render
      render();
    });
  }

  function bindEventListeners() {
    console.log('Bind Event Listeners')
    handleAddBookmarkButton();
    handleClickTitleToExpand();
    handleAddBookmarkSaveButton();
    handleCloseError();
    handleDeleteItemClicked();
    handleEditBookmarkButton();
    handleEditBookmarkSaveButton();
    handleCancelButton();
    handleMinRatingChooser();
  }

  return {
    render,
    bindEventListeners
  }

}());