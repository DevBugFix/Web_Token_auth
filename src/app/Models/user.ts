export class User {

  public fullName: string = "";
  public email: string = "";
  public userName: string = "";
  public roles: string[] = [];

  constructor(fullName: string, email: string, userName: string,roles:string[]) {
    this.fullName = fullName;
    this.email = email;
    this.userName = userName;
    this.roles=roles;
  }
}
