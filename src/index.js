import $ from 'jQuery';
import injection from 'github-injection';
import State from './state';
import Plugin from './plugin';

const state = new State();
const jsonCache = {};
const root = 'https://github.com';

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

  $.ajax(url, { method: 'GET', cache: false })
  .done(function(json){
    try {
      jsonCache[cacheKey] = JSON.parse(json);
      callback(jsonCache[cacheKey]);
    } catch(e) {
      callback({});
    }
  })
  .fail(function(){
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
      const settingUrl = `${root}/${page.orgName}/${page.repoName}/raw/HEAD/.githubext`;

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
