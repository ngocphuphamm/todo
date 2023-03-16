import { Exception } from '../exception';
import { RepositoryFindOptions } from '../repositoryOptions';
import { Pagination } from '../types';
import { Code } from '../code';

export default {
  getInfoPagination: ({ page, limit }: RepositoryFindOptions): Pagination => {
    if (!page || !limit)
      throw Exception.new({
        code: Code.BAD_REQUEST_ERROR,
        overrideMessage: `Invalid page ${page} or ${limit}`,
      });
    const skip = (page - 1) * limit;
    const take = limit;
    return {
      skip,
      take,
    };
  },
};
