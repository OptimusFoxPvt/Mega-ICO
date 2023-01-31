const authRoutes = require("../authRoutes");
const kycRoutes = require("../kycRoutes");
const profileRoutes = require("../profileRoutes");
const adminDashboardRoutes = require("../adminDashboardRoutes");
const bounty = require("../bountyRoutes");

module.exports = [
  authRoutes,
  kycRoutes,
  profileRoutes,
  adminDashboardRoutes,
  bounty,
];
