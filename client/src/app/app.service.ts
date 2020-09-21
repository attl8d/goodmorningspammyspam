import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public data$ = new Subject();

  constructor() {
  }

  public init() {
    const exampleSocket = new WebSocket('ws://localhost:3001', 'protocolOne');

    exampleSocket.onmessage = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);
      console.log(msg);
      this.data$.next(msg);
    };
  }
}
