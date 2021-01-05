const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    TITLE: "HighCairn",
    BACKEND_URL: "http://nginx:80",
    GOOGLE_TAG_MANAGER: "GTM-*****"
  }
}