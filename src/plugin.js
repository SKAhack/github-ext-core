class Plugin {
  constructor(plugins, page, setting) {
    for (var p of setting.plugins) {
      const klass = plugins[p.name];
      const options = p.options || {};
      if (!klass) {
        continue;
      }
      new klass(page, options);
    }
  }
}

export default Plugin;
