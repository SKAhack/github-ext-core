const pathRegex = /^[\/]([^\/]*?)\/([^\/]*)$/;

class Repository {
  constructor() {
    const path = window.location.pathname;
    const matches = pathRegex.exec(path);

    this.pageObj = {
      org: matches[1],
      repo: matches[2]
    };
  }

  get name() {
    return 'Repository';
  }
}

Repository.detect = function(path) {
  return pathRegex.test(path);
};

export default Repository;
