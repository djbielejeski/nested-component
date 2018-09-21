import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';

import { ArtifactOption } from '../models';

@Injectable()
export class ArtifactsOptionsService {
  constructor(private httpClient: HttpClient) {
  }

  getOptions(path: string[]): Observable<ArtifactOption> {
    return this.httpClient.get(`/assets/data.json`)
      .pipe(map(
        (res: ArtifactOption[]) => {
          const data: ArtifactOption = res[0];
          // TODO: filter the data from path
          return data;
        }
      ));
  }
}
