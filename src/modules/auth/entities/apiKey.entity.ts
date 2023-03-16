import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Permissions, StatusKey } from '../../../enums/apiKey.enum';

@Entity('apiKeys')
export default class ApiKey {
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
