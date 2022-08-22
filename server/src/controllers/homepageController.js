const getHomepage = (req, res) => res.render('homepage.ejs');
const getSignupPage = async (req, res) => res.render('auth/register.ejs');
const getLoginPage = async (req, res) => res.render('auth/login.ejs');
const getRedefinePasswordPage = (req, res) => res.render('auth/redefinePassword.ejs');
const getAdminPage = (req, res) => res.render('users/main.ejs');
const getProfileSettingsPage = (req, res) => res.render('users/profileSettings.ejs');
const getProfilePage = (req, res) => res.render('users/profile.ejs');

module.exports = {
  getHomepage,
  getSignupPage,
  getLoginPage,
  getRedefinePasswordPage,
  getAdminPage,
  getProfileSettingsPage,
  getProfilePage,
};
