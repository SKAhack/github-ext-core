import $ from 'jQuery';

const pathRegex = /^[\/]([^\/]*?)\/([^\/]*?)\/issues\/(\d+)$/;

class Issue {
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
    return 'Issue';
  }

  get $title() {
    this.selectors.$title = this.selectors.$title || $('.js-issue-title');
    return this.selectors.$title;
  }

  get orgName() {
    return this.pageObj.org;
  }

  get repoName() {
    return this.pageObj.repo;
  }

  get issueNumber() {
    return this.pageObj.number;
  }

  addDiscussionItem(htmlString) {
    $('.discussion-timeline .timeline-comment-wrapper')
      .eq(0)
      .after(htmlString);
  }
}

Issue.detect = function(path) {
  return pathRegex.test(path);
};

export default Issue;
