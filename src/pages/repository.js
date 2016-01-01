import Page from './page';

const pathRegex = /^[\/]([^\/]*?)\/([^\/]*)$/;

class Repository extends Page {
  constructor() {
    super();

    const path = window.location.pathname;
    const matches = pathRegex.exec(path);

    this.pageObj = {
      org: matches[1],
      repo: matches[2]
    };
  }

  get isRepository() {
    return true;
  }

  get name() {
    return 'Repository';
  }

  get orgName() {
    return this.pageObj.org;
  }

  get repoName() {
    return this.pageObj.repo;
  }
}

Repository.detect = function(path) {
  return pathRegex.test(path);
};

export default Repository;
