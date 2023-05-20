var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const response = await fetch(
    "http://payments.ala-laundry.com/api/order/getAllOrders"
  );
  const json = await response.json();
  const machines = json.data;
  const machine_ids = machines.map((machine) => machine.machine_id);
  res.render("index", { title: "Ala-laundry Admin Panel", ids: machine_ids });
});

module.exports = router;
