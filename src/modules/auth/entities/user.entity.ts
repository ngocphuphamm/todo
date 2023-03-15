import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryColumn({ length: 36 })
  id: string;

  @Column({ length: 155 })
  username: string;

  @Column({ length: 155 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
