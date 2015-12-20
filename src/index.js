import injection from 'github-injection';
import State from './state';
import Plugin from './plugin';

const state = new State();
let jsonCache;

const fetchSetting = (url, callback) => {
  if (jsonCache) {
    callback(jsonCache);
    return;
  }

  fetch(url).then(res => {
    res.json().then(json => {
      jsonCache = json;
      callback(jsonCache);
    });
  });
};

const init = (window, settingUrl, plugins) => {
  injection(window, () => {
    state.init();

    fetchSetting(settingUrl, (setting) => {
      if (state.page) {
        new Plugin(plugins, state.page, setting);
      }
    });
  });
};

export default init;
