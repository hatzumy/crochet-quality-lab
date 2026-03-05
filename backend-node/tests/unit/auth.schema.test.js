
import { registerSchema, verifyTokenSchema } from '../../schemas/auth.schema.js';
import {invalidUsernames, invalidEmail, invalidPassword, happyPathValidate, TokenValidation} from '../fixtures/userFixtures.js';

/**
 * Helper para validar esquemas de Zod
 * @param {Object} input - Datos a validar
 * @param {string} field - El campo que buscamos 
 * @param {string|null} expectedError - La clave de error esperada. Si es null, se espera éxito.
 */

describe('Validators: RegisterSchema - Bloque Username', ()  => {
  test.each(invalidUsernames)(
    'Falla si username es $case',
    ({value, field, error}) => {
      ValidateField (
        value,
        field, 
        error);
    }
  );
});

describe('Validators: RegisterSchema - Bloque email', ()  => {
  test.each(invalidEmail)(
    'Falla si email  $case',
    ({value, field, error}) => {
      ValidateField (
        value,
        field, 
        error);
    }
  );
});

describe('Validators: RegisterSchema - Bloque password', ()  => {
  test.each(invalidPassword)(
    'Falla si email  $case',
    ({value, field, error}) => {
      ValidateField (
        value,
        field, 
        error);
    }
  );
}); 

describe('Validators: RegisterSchema - HappyPath', () => {
  test('Validar el Happy Path del registro', () => {
    const data = happyPathValidate[0];
    ValidateField(data.value);
  });
   
});

describe('Validators: RegisterSchema - Token', ()  => {
  test.each(TokenValidation)(
    '$case',
    ({value, field, error}) => {
      ValidateToken (
        value,
        field, 
        error);
    }
  );
}); 

const ValidateField = (input, field, expectedError) => {
  const result = registerSchema.safeParse(input);
  if(expectedError){
    expect(result.success).toBe(false);
    const error = result.error.issues.find ( i => i.path.includes(field));
    if(!error){
      throw new Error(`Se esperaba un error en el campo "${field}" pero no se encontró.`);
    }
    expect(error.message).toBe(expectedError);
  }else{
    expect(result.success).toBe(true);
  }
};

const ValidateToken = (input, field, expectedError) => {
  const result = verifyTokenSchema.safeParse(input);
  if(expectedError){
    expect(result.success).toBe(false);
    const error = result.error.issues.find ( i => i.path.includes(field));
    if(!error){
      throw new Error(`Se esperaba un error en el campo "${field}" pero no se encontró.`);
    }
    expect(error.message).toBe(expectedError);
  }else{
    expect(result.success).toBe(true);
  }
};