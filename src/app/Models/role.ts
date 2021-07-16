export class Role {
  public role: string = '';
  public isSelected: boolean = false;

  constructor(role: string, isSelected: boolean = false) {
    this.role = role;
    this.isSelected = isSelected;

  }
}
