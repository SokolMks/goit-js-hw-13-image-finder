import './sass/main.scss';
import '../node_modules/lodash.debounce';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import cardTemplate from './templates/card.hbs';
import searchResults from './js/apiService.js';


const showResult = document.querySelector('.gallery');
const submitInput = document.querySelector('.search-form');
const searchResult = new searchResults();
const scroll = document.querySelector('.scroll');
//const _ = require('lodash');

//userInput.addEventListener('input', _.debounce(searchForResult, 1500));
submitInput.addEventListener('submit', searchForResult);


function searchForResult(e) {
  e.preventDefault();
  console.log(e);
  console.log(e.currentTarget.elements.query.value);
  searchResult.query = e.currentTarget.elements.query.value;

  if (searchResult.query.trim() === '') {
    return alert("You need to input something first!");
  }

  searchResult.clearPage();
  clearHtml();
  searchResult.fetchResult().then(hits => {
    insertResult(hits);
    searchResult.incrementPage();
  });

  // seachResult.apiService(searchInput, pageNumber).then(data => {
  //   const templateList = createImagesList(data);
  //   insertResult(templateList);
  // });
}

function insertResult(item) {
  showResult.insertAdjacentHTML('beforeend', cardTemplate(item));
}

// function createCardsTemplate(item) {
//   return cardTemplate(item);
// }

function clearHtml() {
  showResult.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
      if (entry.isIntersecting && searchResult.query.trim() !== '') {
          searchResult.fetchResult().then(hits => {
              insertResult(hits);
              searchResult.incrementPage();
          });
      }
  });
};

const observer = new IntersectionObserver(onEntry, {
rootMargin: '150px',
});
observer.observe(scroll);