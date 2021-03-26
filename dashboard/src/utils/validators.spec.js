import {
  validateEmptyAndEmail,
  validateEmptyAndLegnth3
} from './validators';

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLegnth3()).toBe('*Este campo é obrigatório');
  });

  it('should give an error with less the 3 character payload', () => {
    expect(validateEmptyAndLegnth3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres');
  });

  it('should returns true when pass a correct param', () => {
    expect(validateEmptyAndLegnth3('1234')).toBe(true);
  });

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório');
  });

  it('should give an error with a invalid param', () => {
    expect(validateEmptyAndEmail('myemail@')).toBe('*Este campo precisa ser um e-mail');
  });

  it('should returns true when pass a correct param', () => {
    expect(validateEmptyAndEmail('raissa@email.com')).toBe(true);
  });
});
