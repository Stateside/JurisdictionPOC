module.exports = {
  apps : [{
    name: "jsc",
    cwd: "/opt/jurisdictions/jsc",
    script: 'yarn dev',
  }, {
    name: "frontend",
    cwd: "/opt/jurisdictions/frontend",
    script: 'yarn dev'
  }],
};
