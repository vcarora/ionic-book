import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key : string){
    return this._storage?.get(key)
  }

  getAllFromStorage(): Observable<string[]> {
    let arr: string[] = [];
  
    // Return an observable wrapping the async forEach operation
    return new Observable<string[]>(observer => {
      this._storage?.forEach((v, k, i) => {
        if (k) {
          arr.push(k);
        }
      }).then(() => {
        // Emit the array when the storage iteration completes
        observer.next(arr);
        observer.complete();
      }).catch(error => {
        // Emit an error if something goes wrong
        observer.error(error);
      });
    });
  }

  removeSingleKey(key : string){
    this._storage?.remove(key)
  }

  clearAllRecords(){
    this._storage?.clear();
  }
}
