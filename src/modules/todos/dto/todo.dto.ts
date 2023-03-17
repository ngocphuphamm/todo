import { IsString, IsDateString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { TodoStatus, TodoPriority } from '../../../enums/todo.enum';
import { IsBefore, IsEnumValue } from '../../../decorators/validator';
export default class TodoDto {
  @ApiProperty()
  @IsString()
  @MinLength(4, { message: 'Title must be at lueast 4 characters long' })
  @MaxLength(20, { message: 'Title must be at most 20 characters long' })
  public title: string;

  @IsString()
  @ApiProperty()
  @MinLength(4, { message: 'Description must be at lueast 4 characters long' })
  @MaxLength(20, { message: 'Description must be at most 20 characters long' })
  public description: string;

  @ApiProperty({ type: 'string', format: 'date-time', required: true })
  @IsDateString()
  @IsBefore('endTime', {
    message: 'Start time must be before end time',
  })
  public startTime: Date;

  @ApiProperty({ type: 'string', format: 'date-time', required: false })
  @IsDateString()
  public endTime: Date;

  @ApiProperty({ enum: TodoStatus, required: false })
  @IsEnumValue(TodoStatus)
  public status: TodoStatus;

  @ApiProperty({ enum: TodoPriority, required: false })
  @IsEnumValue(TodoPriority)
  public priority: TodoPriority;
}
