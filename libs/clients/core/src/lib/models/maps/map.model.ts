export interface MapBounds {
  northEast: MapCoordinate,
  southWest: MapCoordinate,
  center: MapCoordinate,
}

export interface MapCoordinate {
  latitude: number,
  longitude: number,
}

export interface MapMarker<T> {
  coordinate: MapCoordinate,
  payload: T
}

export interface GeocodingLocation {
  coordinate: MapCoordinate,
  formattedAddress: string
}
