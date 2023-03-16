import { IsInt, Min, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export default class PaginationParam {
  @IsInt()
  @Min(1)
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsOptional()
  page?: number;

  @IsInt()
  @Min(1)
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsOptional()
  limit?: number;

  @IsInt()
  @Min(1)
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsOptional()
  sumPage?: number;
}
