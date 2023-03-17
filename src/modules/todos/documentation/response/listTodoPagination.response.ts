import ApiResponse from '../../../../common/apiResponse/modelApiResponse';
import ListTodoPaginationModel from '../model/listToDoPagination.model';
import { ApiProperty } from '@nestjs/swagger';

export default class ListTodoPaginationResponse extends ApiResponse {
  @ApiProperty({ type: ListTodoPaginationModel })
  data: ListTodoPaginationModel;
}
