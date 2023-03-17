import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

import { Permissions, StatusKey } from '../../../enums/apiKey.enum';

@Entity('apiKeys')
export default class ApiKey extends BaseEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ length: 255 })
  keyValue: string;

  @Column({ length: 50 })
  version: string;

  @Column({ type: 'enum', enum: Permissions })
  permissions: Permissions;

  @Column('text', { nullable: true })
  comments: string;

  @Column({ type: 'enum', enum: StatusKey })
  status: StatusKey;
}
