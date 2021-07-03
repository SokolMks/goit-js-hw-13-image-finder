// export default {
//   async apiService(searchQuery,pageNum) {
//     const request = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNum}&per_page=12&key=22314641-3a8c963c3e0001805b4ad30fd`);
//     const response = await request.json();
//     return response.hits;
//   }
// }

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.pageNum = 1;
  }

  async fetchResult() {
    const request = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNum}&per_page=12&key=22314641-3a8c963c3e0001805b4ad30fd`);
    const response = await request.json();
    return response.hits;
  }

  incrementPage() {
    this.pageNum +=1;
  }

  clearPage() {
    this.pageNum = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(userQuery) {
    this.searchQuery = userQuery;
  }
}