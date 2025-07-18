//The user variable can now be used in all EJS files. It becomes a global variable
const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  res.locals.currentPage = req.originalUrl;
  next();
};

module.exports = passUserToView;
