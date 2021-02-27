import { Location } from "./models/Location";
import { hashLocation } from "./utils/hashLocation";

export interface AreaProps {
  id?: string;
  name: string;
  description: string;
  origin: Location;
  height: number;
  width: number;
  perception: number;
  enabled: boolean;
}

export const generateAreaLocations = (origin: Location, width: number, height: number): Set<string> => {
    const locations: Set<string> = new Set([]);
    Array(height).fill('').forEach((_row, y) => Array(width).fill('').forEach((_col, x) => {
        locations.add(hashLocation({ x: origin.x + x, y: origin.y + y}));
    }));
    return locations;
}