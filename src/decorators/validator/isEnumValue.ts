import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsEnumValue(
  enumType: any,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEnumValue',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [enumType],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [enumType] = args.constraints;
          return Object.values(enumType).includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          const [enumType] = args.constraints;
          return `${args.property} must be one of: ${Object.values(enumType)}`;
        },
      },
    });
  };
}
