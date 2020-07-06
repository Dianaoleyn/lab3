import {Observable, Subject} from 'rxjs';
import {OnDestroy} from '@angular/core';
import {takeUntil} from 'rxjs/operators';

export abstract class TodoComponentClass implements OnDestroy {
  protected _destroy$$: Subject<void> = new Subject();

  public ngOnDestroy(): void {
    this._destroy$$.next();
    this._destroy$$.complete();
  }

  protected _observeSafe<T = any>(obs: Observable<T>): Observable<T> {
    return obs.pipe(takeUntil(this._destroy$$));
  }
}
