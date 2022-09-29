module.exports = {
  apps : [{
    name: "jsc",
    script: 'cd jsc; yarn staging',
  }, {
    name: "dashboard",
    script: 'cd dashboard; yarn dev80',
  }],
};
