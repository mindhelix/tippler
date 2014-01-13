
/*
 * GET compose page.
 */

exports.index = function(req, res){
  res.render('compose', { title: 'Tippler: Compose new mail', nav: 'compose' });
};