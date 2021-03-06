import Repository from './pages/repository';
import PullRequest from './pages/pull-request';
import Issue from './pages/issue';
import CreatePullRequest from './pages/create-pull-request';

const pages = [
  Repository,
  PullRequest,
  Issue,
  CreatePullRequest
];

class State {
  constructor() {
  }

  init() {
    this.state = {
      page: this.detectPage()
    };
  }

  detectPage() {
    const path = window.location.pathname;

    for (var page of pages) {
      if (page.detect(path)) {
        return new page();
      }
    }

    return null;
  }

  get page() {
    return this.state.page;
  }
}

export default State;
