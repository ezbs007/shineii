import { ResourceWithOptions } from 'adminjs';
import { User } from '../../entities/user.entity';
import { Auctioneer } from '../../entities/auctioneer.entity';

export const resourcesConfig: ResourceWithOptions[] = [
  {
    resource: User,
    options: {
      listProperties: ['id', 'email', 'first_name', 'last_name', 'user_type'],
      filterProperties: ['email', 'user_type'],
      editProperties: ['email', 'first_name', 'last_name', 'user_type'],
      showProperties: ['id', 'email', 'first_name', 'last_name', 'user_type', 'createdAt'],
    },
  },
  {
    resource: Auctioneer,
    options: {
      listProperties: ['id', 'company_name', 'contact_number', 'address'],
      filterProperties: ['company_name', 'contact_number'],
      editProperties: ['company_name', 'contact_number', 'address', 'user'],
      showProperties: ['id', 'company_name', 'contact_number', 'address', 'user'],
    },
  },
];