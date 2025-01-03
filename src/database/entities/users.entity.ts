// eslint-disable-next-line prettier/prettier
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'users',
  synchronize: true,
})
export class Users {
  @PrimaryColumn({ nullable: false, unique: true, })
  _id: string;

  @Column({ default: null, length: 100 })
  username: string;

  @Column({ default: null, length: 100 })
  name: string;

  @Column({ default: null, length: 100 })
  lastname: string;

  @Column({ nullable: false, length: 155 })
  email: string;

  @Column({ nullable: false, length: 155 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // ******************** Functions ********************

  @BeforeInsert()
  insertDates() {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;
  }

  @BeforeUpdate()
  updateDate() {
    const now = new Date();
    this.updated_at = now;
  }
}
