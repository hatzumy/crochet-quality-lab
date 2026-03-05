
export const invalidUsernames = [
  {case: 'esta vacio' , value: {}, field: 'username' , error: 'auth.username_required' },
  {case: 'es menor de 3' , value: { username: 'aa' }, field: 'username' , error: 'auth.username_too_short' },
  {case: 'es mayor de 15' , value: { username: 'teststeststestst' } , field: 'username' , error: 'auth.username_too_long' },
  {case: 'tiene caracteres invalidos' , value: { username: 'test*' }, field: 'username' , error: 'auth.username_invalid_format' }
    
];

export const invalidEmail = [

  {case: 'esta vacio' , value: {}, field: 'email' , error: 'auth.email_required' },
  {case: 'es invalido' , value: { email: 'test.com' } , field: 'email' , error: 'auth.email_invalid' }

];

export const invalidPassword = [

  {case: 'esta vacia' , value: {}, field: 'password' , error: 'auth.password_required' }, 
  {case: 'no cumple el minimo' , value: {password: 'test'}, field: 'password' , error: 'auth.password_too_short' }, // NOSONAR
  {case: 'no cumple el maximo' , value: {password: 'test1234567890abcdefg'}, field: 'password' , error: 'auth.password_too_long' }, // NOSONAR
  {case: 'no cumple con caracteres en mayuscula' , value: {password: 'test1234*'}, field: 'password' , error: 'auth.password_uppercase' }, // NOSONAR
  {case: 'no cumple con caracteres en minuscula' , value: {password: 'TEST1234*'}, field: 'password' , error: 'auth.password_lowercase' }, // NOSONAR
  {case: 'no cumple con numeros' , value: {password: 'TestTest*'}, field: 'password' , error: 'auth.password_number' }, // NOSONAR
  {case: 'no cumple con caracteres especiales' , value: {password: 'TestTest1234'}, field: 'password' , error: 'auth.password_special' }, // NOSONAR
   
];

export const happyPathValidate = [

  {value: {username: 'UserTest1', email: 'test@test.com', password: 'Test1234*'}} // NOSONAR

]

export const TokenValidation =  [
  {case: 'Token esta vacio' , value: {}, field: 'token' , error: 'auth.token_required' }, 
  {case: 'Token es un numero' , value: { token: 123 }, field: 'token' , error: 'auth.token_required' }, // NOSONAR
  {case: 'Token - formato inválido' , value: { token: 'abc-123' }, field: 'token' , error: 'auth.token_invalid' },// NOSONAR
  {case: 'Happy Path Token' , value: { token: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' }, field: 'token' , error: null },// NOSONAR

]

