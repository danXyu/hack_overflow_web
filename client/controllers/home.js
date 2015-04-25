/**
 * GET /
 * Home page.
 */
exports.getIndex = function(req, res) {
  res.render('home/index', {
    title: 'Home'
  });
};