import {
  Allow,
  IsBoolean,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  validate,
} from "class-validator";
import { Expose, plainToInstance } from "class-transformer";
import HttpStatus from "http-status";
import { BadRequestException } from "../../utils/exceptions/bad.request.exception";
import { Request, Response, NextFunction } from "express";

export class CreateClientDTO {
  @Expose()
  @IsDefined()
  @IsOptional()
  @IsString()
  name!: string;

  @Expose()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  redirection_endpoint!: string;

  @Allow()
  secret!: string;
}

export function validateIncomingRequest() {
  return async (req: Request, _: Response, next: NextFunction) => {
    const validationOptions = {
      skipUndefinedProperties: true,
      skipNullProperties: true,
      forbidUnknownValues: true,
      skipMissingProperties: true,
      stopAtFirstError: false,
    };
    const CreateClientRequestDTO = plainToInstance(CreateClientDTO, req.body);
    const errors = await validate(CreateClientRequestDTO, validationOptions);

    if (errors.length > 0) {
      const messages: any[] = [];
      errors.forEach((error) => {
        messages.push(error.constraints);
      });
      next(new BadRequestException(HttpStatus.BAD_REQUEST, messages));
    }
    next();
  };
}
