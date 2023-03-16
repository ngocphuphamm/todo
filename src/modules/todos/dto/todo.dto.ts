import { IsString, IsDateString } from 'class-validator';

import { TodoStatus, TodoPriority } from '../../../enums/todo.enum';
import { IsBefore, IsEnumValue } from '../../../decorators/validator';
export default class TodoDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsDateString()
  @IsBefore('endTime', {
    message: 'Start time must be before end time',
  })
  public startTime: Date;

  @IsDateString()
  public endTime: Date;

  @IsEnumValue(TodoStatus)
  public status: TodoStatus;

  @IsEnumValue(TodoPriority)
  public priority: TodoPriority;
}
