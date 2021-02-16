import { Location } from "./Location";

export interface Door {
  name: string;
  location: Location;
  open: boolean;
  locked: boolean;
  room?: string;
}