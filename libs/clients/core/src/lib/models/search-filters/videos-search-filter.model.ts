import { DistanceUnit } from '../distance-unit.enum';
import { GeocodingLocation } from '../maps/map.model';

export interface VideosSearchFilter {
  searchKeywords?: string,
  location?: GeocodingLocation | null,
  distance?: number,
  distanceUnit?: DistanceUnit 
}
