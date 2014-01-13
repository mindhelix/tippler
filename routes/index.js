
/*
 * GET outbox page.
 */

exports.outbox = function(req, res){
  res.render('index', { title: 'Tippler', nav: 'outbox' });
};