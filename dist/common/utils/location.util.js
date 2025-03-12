"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationUtil = void 0;
const common_1 = require("@nestjs/common");
class LocationUtil {
    static validateCoordinates(latitude, longitude) {
        if (latitude && (latitude < -90 || latitude > 90)) {
            throw new common_1.BadRequestException('Invalid latitude value. Must be between -90 and 90.');
        }
        if (longitude && (longitude < -180 || longitude > 180)) {
            throw new common_1.BadRequestException('Invalid longitude value. Must be between -180 and 180.');
        }
        if ((latitude && longitude === undefined) || (latitude === undefined && longitude)) {
            throw new common_1.BadRequestException('Both latitude and longitude must be provided together.');
        }
    }
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    static toRad(value) {
        return (value * Math.PI) / 180;
    }
}
exports.LocationUtil = LocationUtil;
//# sourceMappingURL=location.util.js.map