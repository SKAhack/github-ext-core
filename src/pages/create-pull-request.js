import $ from 'jQuery';
import Page from './page';

const pathRegex = /^[\/]([^\/]*?)\/([^\/]*?)\/compare\/.+$/;

class CreatePullRequest extends Page {
  constructor() {
    super();

    const path = window.location.pathname;
    const matches = pathRegex.exec(path);

    this.selectors = {};

    const self = this;
    this.pageObj = {
      org: matches[1],
      repo: matches[2]
    };
  }

  get name() {
    return 'CreatePullRequest';
  }

  get orgName() {
    return this.pageObj.org;
  }

  get repoName() {
    return this.pageObj.repo;
  }

  get $pullRequestBody() {
    this.selectors.$pullRequestBody =
      this.selectors.$pullRequestBody || $('#pull_request_body');
    return this.selectors.$pullRequestBody;
  }

  get isAvailableForm() {
    return this.$pullRequestBody.length > 0;
  }

  get pullRequestBody() {
    return this.$pullRequestBody.text();
  }

  set pullRequestBody(text) {
    return this.$pullRequestBody.text(text);
  }
}

CreatePullRequest.detect = function(path) {
  return pathRegex.test(path);
};

export default CreatePullRequest;
