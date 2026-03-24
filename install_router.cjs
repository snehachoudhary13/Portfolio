const { execSync } = require('child_process');
console.log("Installing react-router-dom...");
try {
  execSync('npm install react-router-dom --no-audit --no-fund', {stdio: 'inherit'});
  console.log("Install complete.");
} catch (e) {
  console.error(e);
}
