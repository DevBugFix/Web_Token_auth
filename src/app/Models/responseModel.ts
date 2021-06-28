import { ResponseCode } from "../enums/responseCode";

export class ResponseModel{
  public  responseCode :ResponseCode=ResponseCode.NotSet;
  public responseMessage:string ="";
  public  dateSet :any
}
