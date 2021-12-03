export class Article {
  id: number;
  title: string;
  body: string;
  status: boolean;
  createdDate: Date;
  modifiedDate: Date;

  constructor(id: number = 0, title: string = '', body: string = '', status: boolean = false, createdDate: Date = new Date(), modifiedDate: Date = new Date()) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.status = status;
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }

}
