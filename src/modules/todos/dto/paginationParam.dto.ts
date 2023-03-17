import { IsInt, Min, IsOptional } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export default class PaginationParam {
  @ApiProperty({
    description: 'The page number to retrieve (starting at 1)',
    minimum: 1,
    type: Number,
    required: false,
  })
  @IsInt()
  @Min(1)
  @Transform(({ value }: TransformFnParams) => parseInt(value))
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'The maximum number of items to retrieve',
    minimum: 1,
    type: Number,
    required: false,
  })
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
