const initRouter = require("../../utils/initRouter");
const router = initRouter("alert");

// get all alerts
router.get("/all", async (ctx) => {
  const alerts = await ctx
    .db("alerts")
    .orderBy("updated_at", "desc")
    .limit(100);
  ctx.body = { data: alerts };
});

// get an alert by id
router.get("/:alertId", async (ctx) => {
  const alertId = ctx.params.alertId;
  const alertRow = await ctx.db("alerts").where("id", alertId);
  ctx.body = alertRow.length
    ? {
      data: alertRow[0],
    }
    : {
      message: "Alert not found",
      data: null,
    };
});

// add alert
router.post("/", async (ctx) => {
  const { name, metric, condition, value, user_id } = ctx.request.body;
  const [id] = await ctx.db("alerts").insert({
    name,
    metric,
    condition,
    value,
    user_id,
  });
  const newAlert = await ctx.db("alerts").where("id", id);
  ctx.body = newAlert[0];
});

module.exports = router;
