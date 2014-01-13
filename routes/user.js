
/*
 * GET login.
 */

exports.login = function(req, res){
  res.render('login', { title: 'Tippler Sign in' });
};