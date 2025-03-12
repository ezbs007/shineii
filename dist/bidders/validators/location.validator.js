"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationValidator = void 0;
const common_1 = require("@nestjs/common");
class LocationValidator {
    static validate(latitude, longitude) {
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
}
exports.LocationValidator = LocationValidator;
//# sourceMappingURL=location.validator.js.map