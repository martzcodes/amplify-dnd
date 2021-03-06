import { Location } from "./models/Location";
export interface DoorProps {
  id?: string;
  origin: Location;
  open: boolean;
  locked: boolean;
  northSouth: boolean;
  hidden?: boolean;
}

export class Door {
  id: string = '';
  origin: Location = { x: 0, y: 0 };
  northSouth: boolean = true;
  open: boolean = true;
  locked: boolean = false;
  hidden?: boolean = false;

  constructor(props: DoorProps) {
    Object.assign(this, props);
  }

  checkDoor(loc: Location): { door: boolean; open?: boolean; locked?: boolean } {
    if (this.getDoors().filter((door) => {
      return door.location.x === loc.x && door.location.y === loc.y;
    }).length !== 0) {
      return {
        door: true,
        open: this.open,
        locked: this.locked,
      }
    }
    return { door: false, }
  }

  getDoors(): { doorClass: string; lockClass: string; location: Location }[] {
    if (this.northSouth) {
      return [
        { location: this.origin, lockClass: this.locked ? 'DRLN' : '' , doorClass: this.open ? 'DRON' : 'DRCN' },
        { location: { x: this.origin.x, y: this.origin.y + 1 }, lockClass: this.locked ? 'DRLS' : '' , doorClass: this.open ? 'DROS' : 'DRCS' }
      ];
    }
    return [
        { location: this.origin, lockClass: this.locked ? 'DRLW' : '' , doorClass: this.open ? 'DROW' : 'DRCW' },
        { location: { x: this.origin.x + 1, y: this.origin.y }, lockClass: this.locked ? 'DRLE' : '' , doorClass: this.open ? 'DROE' : 'DRCE' }
      ];
  }
}