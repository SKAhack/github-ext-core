import injection from 'github-injection';
import State from './state';
import Plugin from './plugin';

const state = new State();
const jsonCache = {};
const root = 'https://raw.githubusercontent.com';

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    const error = new Error(res.statusText);
    error.res = res;
    throw error;
  }
};

const fetchSetting = (url, callback) => {
  const cacheKey = Symbol(url);
  if (jsonCache[cacheKey]) {
    callback(jsonCache);
    return;
  }

  fetch(url, { method: 'GET' })
  .then(checkStatus)
  .then(res => res.json())
  .then(json => {
    jsonCache[cacheKey] = json;
    callback(jsonCache[cacheKey]);
  })
  .catch(e => {
    callback({});
  });
};


const init = (window, plugins, setting) => {
  const execPlugin = (setting) => {
    if (state.page && setting.plugins) {
      new Plugin(plugins, state.page, setting);
    }
  };

  injection(window, () => {
    state.init();

    if (state.page && state.page.isRepository) {
      const page = state.page;
      const settingUrl = `${root}/${page.orgName}/${page.repoName}/HEAD/.githubext`;

      fetchSetting(settingUrl, (repoSetting) => {
        const newSetting = Object.assign(setting, repoSetting);
        execPlugin(newSetting);
      });
    } else {
      execPlugin(setting);
    }
  });
};

export default init;
