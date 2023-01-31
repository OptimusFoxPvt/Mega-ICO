const authRoutes = require("../authRoutes");
const kycRoutes = require("../kycRoutes");
const profileRoutes = require("../profileRoutes");
const dashboardRoutes = require("../dasboardRoutes");
const bounty = require("../bountyRoutes");

module.exports = [
  authRoutes,
  kycRoutes,
  profileRoutes,
  dashboardRoutes,
  bounty,
];
