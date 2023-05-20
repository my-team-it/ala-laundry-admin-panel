var express = require("express");
var router = express.Router();

const placeholder = ["Enter the washing mode", "Admin Mode"];
const listOfModes = [
  '"Іш киім" режимі|Режим "Постельное белье"',
  '"Түсті" режимі|Режим "Цветной"',
  '"Назік" режимі|Режим "Деликатный"',
  '"Аралас" режимі|Режим "Смешанный"',
  '"Жылдам" режимі|Режим "Быстрый"',
  '"Мақта" режимі|Режим "Хлопок"',
  '"Эко" режимі|Режим "Эко"',
  '"Синтетикалық" режимі|Режим "Синтетический"',
  '"Ысқылау" режимі|Режим "Ополаскивание"',
  '"Ағызу" режимі|Режим "Слив"',
  '"Барабанды тазалау" режимі|Режим "Очистка барабана"',
  "Сөндіру|Выключить",
];

/* GET users listing. */
router.get("/id(\\d{1}|\\d{2})/", async function (req, res, next) {
  const response = await fetch(
    "http://payments.ala-laundry.com/api/machine/id" + req.params[0]
  );
  const json = await response.json();
  const machine = json.data;
  const trigger = machine.input.trigger;
  const mode = machine.input.mode;
  const admin_mode = machine.input.admin;

  res.render("machine", {
    id: "id" + req.params[0],
    listOfModes,
    placeholder,
    trigger,
    mode,
    admin_mode,
  });
});

router.get("/id*/admin/o*/", async function (req, res, next) {
  const response = await fetch(
    "http://payments.ala-laundry.com/api/machine/admin/o" +
      req.params[1] +
      "/id" +
      req.params[0]
  );
  const json = await response.json();
  const machines = json.data;
  res.redirect("/machines/id" + req.params[0]);
});

router.get("/id*/o*/mode/*", async function (req, res, next) {
  const response = await fetch(
    "http://payments.ala-laundry.com/api/machine/o" +
      req.params[1] +
      "/id" +
      req.params[0] +
      "?mode=" +
      req.params[2]
  );
  const json = await response.json();
  const machines = json.data;
  res.redirect("/machines/id" + req.params[0]);
});

router.get("/id*/state", async function (req, res, next) {
  const response = await fetch(
    "http://payments.ala-laundry.com/api/machine/id" + req.params[0]
  );
  const json = await response.json();
  const machine = json.data;
  const trigger = machine.input.trigger;
  const mode = machine.input.mode;
  const admin_mode = machine.input.admin;

  res.json({ trigger, mode, admin_mode });
});

module.exports = router;
