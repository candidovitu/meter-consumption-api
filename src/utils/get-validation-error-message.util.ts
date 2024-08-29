import { ValidationError } from '@nestjs/common';

export const getValidationErrorMessageUtil = (
  errors: ValidationError[],
): string => {
  if (!errors.length) return 'Houve um problema na validação da body';

  const firstError = errors[0];
  const firstConstraint = Object.values(firstError.constraints)[0];

  return firstConstraint;
};
