import { Repository, SelectQueryBuilder } from 'typeorm';

import { RepositoryFindOptions } from 'src/common/repositoryOptions';
import { Optional } from 'src/common/types';
import { ApiKey } from '../entities';
export default class ApiKeyRepository extends Repository<ApiKey> {
  private readonly apiKeyAlias: string = 'apiKeys';

  public async findApiKey(
    by: { keyValue?: string },
    options: RepositoryFindOptions = {},
  ): Promise<Optional<ApiKey>> {
    const query: SelectQueryBuilder<ApiKey> = this.buildApiKeyQueryBuilder();
    this.extendQueryWithByProperties(by, query);
    const apiKey: Optional<ApiKey> = await query.getOne();

    return apiKey;
  }

  private buildApiKeyQueryBuilder(): SelectQueryBuilder<ApiKey> {
    return this.createQueryBuilder(this.apiKeyAlias).select();
  }

  private extendQueryWithByProperties(
    by: { keyValue?: string },
    query: SelectQueryBuilder<ApiKey>,
  ): void {
    switch (true) {
      case Boolean(by.keyValue):
        query.andWhere(`${this.apiKeyAlias}.keyValue = :keyValue`, {
          keyValue: by.keyValue,
        });
        break;
      default:
        throw new Error(
          'Please provide either an keyValue to search for a apiKey.',
        );
    }
  }
}
