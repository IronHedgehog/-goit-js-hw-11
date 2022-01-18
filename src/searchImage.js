import axios from 'axios';

export default class Feach {
  constructor() {
    this.page = 1;
    this.inputEl = '';
  }

  searchImage() {
    return fetch(
      `https://pixabay.com/api/?key=25274057-dba1b364b326199f79c25f588&q=${this.inputEl}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    ).then(response => {
      return response.json();
    });
  }

  increment() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get inputValue() {
    return (this.inputEl = '');
  }

  set inputValue(newValue) {
    this.inputEl = newValue;
  }

  get pages() {
    return (this.page = 1);
  }
}
