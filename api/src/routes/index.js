const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require("./routers/dogs.router.js");
const dogRouter = require("./routers/dog.router");
const temperamentRouter = require("./routers/temperament.router");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/dogs", dogsRouter);
router.use("/dog", dogRouter);
router.use("/temperament", temperamentRouter);

module.exports = router;
