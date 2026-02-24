export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
   
    let zErrors = [];

    
    if (error.errors) {
      zErrors = error.errors;
    } 
   
    else if (typeof error.message === 'string') {
      try {
        const parsed = JSON.parse(error.message);
        if (Array.isArray(parsed)) zErrors = parsed;
      } catch (e) {
        
        return res.status(400).json({ status: 'Error', message: error.message });
      }
    }

    
    if (zErrors.length > 0) {
      const errors = zErrors.map((err) => ({
        campo: err.path[0],
        mensaje: req.t(err.message, { 
          min: err.minimum || err.params?.minimum, 
          max: err.maximum || err.params?.maximum 
        })
      }));

      return res.status(400).json({
        status: 'Error de Validación',
        errors
      });
    }

    return res.status(500).json({ status: 'Error Desconocido', details: error.message });
  }
  
};