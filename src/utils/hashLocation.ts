import { Location } from "../models/Location";

export const hashLocation = (loc: Location): string => `${loc.x}$${loc.y}`;
export const unhashLocation = (locString: string): Location => ({
  x: Number(locString.split("$")[0]),
  y: Number(locString.split("$")[1]),
});