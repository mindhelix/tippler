/*
 * Tippler config
 */

module.exports = {
  // Node server port
  PORT: 3000,
  
  // From mail addresss. If using AWS SES, the email id should be the one verified and added in AWS SES console
  // Can be in this format for better sender info:- SENDER_ID: '"John Doe" <john.doe@tippler.com>'
  SENDER_ID: 'Put your SES verified email id here',
  
  // AWS keys
  AWS_ACCESS_KEY: 'Your AWS Access Id key',
  AWS_SECRET_KEY: 'Your AwS Secret key'
}