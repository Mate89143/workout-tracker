const express = require('express');
const router = express.Router();

// Importar versiones de rutas
const v1Routes = require('./v1');

// Configurar rutas versionadas
router.use('/v1', v1Routes);

module.exports = router;