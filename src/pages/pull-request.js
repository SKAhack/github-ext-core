import $ from 'jQuery';

const pathRegex = /^[\/]([^\/]*?)\/([^\/]*?)\/pull\/(\d+)$/;

class PullRequest {
  constructor() {
    const path = window.location.pathname;
    const matches = pathRegex.exec(path);

    this.selectors = {};

    const self = this;
    this.pageObj = {
      org: matches[1],
      repo: matches[2],
      number: matches[3]
    };
  }

  get name() {
    return 'PullRequest';
  }

  get $title() {
    this.selectors.$title = this.selectors.$title || $('.js-issue-title');
    return this.selectors.$title;
  }

  get title() {
    return this.$title.text();
  }

  get $milestone() {
    this.selectors.$milestone = this.selectors.$milestone || $('.sidebar-milestone');
    return this.selectors.$milestone;
  }

  get $label() {
    this.selectors.$label = this.selectors.$label || $('.sidebar-labels');
    return this.selectors.$label;
  }

  get $mergeButton() {
    this.selectors.$mergeButton = this.selectors.$mergeButton || $('.merge-message > .btn');
    return this.selectors.$mergeButton;
  }

  get $deleteButton() {
    this.selectors.$deleteButton = this.selectors.$deleteButton || $('.post-merge-message button');
    return this.selectors.$deleteButton;
  }

  get baseBranchName() {
    this.pageObj.baseBranchName = this.pageObj.baseBranchName || $('.gh-header-meta .commit-ref').eq(0).text();
    return this.pageObj.baseBranchName;
  }

  get currentBranchName() {
    this.pageObj.currentBranchName = this.pageObj.currentBranchName || $('.gh-header-meta .commit-ref').eq(1).text();
    return this.pageObj.currentBranchName;
  }

  get orgName() {
    return this.pageObj.org;
  }

  get repoName() {
    return this.pageObj.repo;
  }

  get pullRequestNumber() {
    return this.pageObj.number;
  }

  enableMaegeButton() {
    this.$mergeButton.attr('disabled', '');
  }

  disableMergeButton() {
    this.$mergeButton.attr('disabled', 'disabled');
  }

  enableDeleteButton() {
    this.$deleteButton.attr('disabled', '');
  }

  disableDeleteButton() {
    this.$deleteButton.attr('disabled', 'disabled');
  }
}

PullRequest.detect = function(path) {
  return pathRegex.test(path);
};

export default PullRequest;
