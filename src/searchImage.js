import axios from 'axios';
const BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '25303063-e3dfa67f3227afe1b77421770';
export default class Feach {
  constructor() {
    this.page = 1;
    this.inputEl = '';
  }

  async searchImage() {
    try {
      const rFetch = await axios.get(
        `${BASIC_URL}?key=${API_KEY}&q=${this.inputEl}&image_type=photo&orientation=horizontal&safesearch=true
        &per_page=40&page=${this.page}
        `,
      );
      console.log(rFetch);
      const neededFiles = rFetch.data;
      return neededFiles;
    } catch (err) {
      console.log(err);
    }
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
    return this.page;
  }
  set pages(newPage) {
    this.pages = newPage;
  }
}
