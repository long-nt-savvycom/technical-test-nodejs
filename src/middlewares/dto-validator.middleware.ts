import { sanitize } from 'class-sanitizer';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

export function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false,
): RequestHandler {
  return (req, res, next) => {
    const input =
      Object.keys(req.body).length > 0
        ? req.body
        : Object.keys(req.query).length > 0
          ? req.query
          : {};

    const dtoObj = plainToClass(type, input);
    validate(dtoObj, { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const dtoErrors = errors
          .map((error: ValidationError) => (Object as any).values(error.constraints))
          .join(', ');
        next(new Error(dtoErrors));
      } else {
        //sanitize the object and call the next middleware
        sanitize(dtoObj);
        req.body = dtoObj;
        next();
      }
    });
  };
}
