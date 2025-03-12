export declare class LocationUtil {
    static validateCoordinates(latitude?: number, longitude?: number): void;
    static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number;
    private static toRad;
}
