import { Column, Entity, PrimaryColumn, BaseEntity } from 'typeorm';
import { compare } from 'bcryptjs';

@Entity({ name: 'users' })
export default class User extends BaseEntity {
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

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
