import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SiteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  site_name: string;

  @Column()
  site_logo: string;

  @Column()
  site_base_url: string;

  @Column()
  product_name: string;

  @Column()
  commission: number;

  @Column('json')
  product_fields: Record<string, any>;

  @Column('json')
  bitter_fields: Record<string, any>;
}