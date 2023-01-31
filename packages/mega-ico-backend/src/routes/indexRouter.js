const router = require("express-promise-router")();

const adminRouter = require("./admin/adminRouter");
const userRouter = require("./user/userRouter");

router.use("/v2", adminRouter);
router.use("/v1", userRouter);

module.exports = router;
