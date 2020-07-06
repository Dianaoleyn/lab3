import {HttpParams} from '@angular/common/http';

export type TodoHttpParams = HttpParams | {
  [param: string]: string | string[] | any;
};
