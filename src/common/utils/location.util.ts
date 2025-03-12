import { BadRequestException } from '@nestjs/common';

export class LocationUtil {
  static validateCoordinates(latitude?: number, longitude?: number): void {
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

  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRad(value: number): number {
    return (value * Math.PI) / 180;
  }
}