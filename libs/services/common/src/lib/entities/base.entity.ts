import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'timestamp with time zone', default: () => 'NOW()' })
  public createdAt: Date;

  @Column({ type: 'timestamp with time zone', default: () => 'NOW()' })
  public updatedAt: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  public deletedAt: Date | null | undefined;

  @BeforeInsert()
  public initializeTimestamps() {
    const now: Date = new Date()
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  public updateTimestamps() {
    const now: Date = new Date();
    this.updatedAt = now;
  }
}
