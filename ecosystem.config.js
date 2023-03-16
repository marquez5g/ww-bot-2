module.exports = {
  apps : [{
    script: 'build/index.js',
    watch: '.',
    name: 'bot',
    env: {
      "NVM_DIR": "~/.nvm",
      "PATH": "$NVM_DIR/versions/node/$(nvm current)/bin:$PATH"
    }
  }],
  
};
