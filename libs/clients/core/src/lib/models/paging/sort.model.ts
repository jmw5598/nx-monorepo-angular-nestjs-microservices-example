import { SortDirection } from './sort-direction.enum';

export class Sort {
  public direction: SortDirection;
  public column: string;

  constructor(column: string = 'id', direction: SortDirection = SortDirection.Ascend) {
    this.direction = direction; 
    this.column = column;
  }
}
