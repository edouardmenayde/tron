exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      joinTo: {
        "js/app.js": /^js/,
        "js/vendor.js": ['node_modules/**', 'vendor/**']
      }
    },
    stylesheets: {
      joinTo: "css/app.css"
    },
    templates: {
      joinTo: "js/app.js"
    }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ["static", "css", "js", "vendor"],
    // Where to compile files to
    public: "../priv/static"
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor/, 'node_modules/**']
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/initialize.js"]
    }
  },

  npm: {
    enabled: true,
    static: [
      'node_modules/phaser/build/phaser.js',
      'node_modules/phaser-ce/build/phaser.js'
    ]
  }
};
