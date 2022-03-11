module.exports = {
  reactStrictMode: true,
  env:{
    MONGODB_URI : process.env.MYACCESSTOKEN,
    DB_NAME: process.env.MYSPACEID,
    DEV_URL: process.env.DEV_URL,
    PROD_URL: process.env.PROD_URL
  }
}
