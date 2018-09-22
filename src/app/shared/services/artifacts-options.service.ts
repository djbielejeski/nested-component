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
          let data: ArtifactOption = res[0];
          // TODO: filter the data from path
          //data = this.assignId(data, 1);
          //console.log(data);
          return data;
        }
      ));
  }

  private assignId(item, i) {
    for (const key in item) {
      // check also if property is not inherited from prototype
      if (item.hasOwnProperty(key) &&
        (item.hasOwnProperty('properties') ||
          item.hasOwnProperty('options') ||
          item.hasOwnProperty('choices'))) {
        item['id'] = i;
        i++;

        if (item.hasOwnProperty('properties')){
          return this.assignId(item['properties'], i);
        }
        else if (item.hasOwnProperty('options')){
          return this.assignId(item['options'], i);
        }
        else if (item.hasOwnProperty('choices')){
          return this.assignId(item['choices'], i);
        }

      }
    }

    return item;
  }
}
