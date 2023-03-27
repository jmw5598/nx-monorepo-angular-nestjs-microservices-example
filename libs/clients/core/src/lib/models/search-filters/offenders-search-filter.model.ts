import { DistanceUnit } from '../distance-unit.enum';
import { GeocodingLocation } from '../maps/map.model';

export interface OffendersSearchFilter {
  offenderName?: string,
  location?: GeocodingLocation | null,
  distance?: number,
  distanceUnit?: DistanceUnit 
}
