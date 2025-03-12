import { BadRequestException } from '@nestjs/common';

export class LocationValidator {
  static validate(latitude?: number, longitude?: number): void {
    if (latitude && (latitude < -90 || latitude > 90)) {
      throw new BadRequestException('Invalid latitude value. Must be between -90 and 90.');
    }

    if (longitude && (longitude < -180 || longitude > 180)) {
      throw new BadRequestException('Invalid longitude value. Must be between -180 and 180.');
    }

    if ((latitude && longitude === undefined) || (latitude === undefined && longitude)) {
      throw new BadRequestException('Both latitude and longitude must be provided together.');
    }
  }
}