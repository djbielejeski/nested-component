import { Component, OnInit } from '@angular/core';
import { ArtifactOption } from '../shared/models';
import { ArtifactsOptionsService } from '../shared/services/artifacts-options.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html'
})
export class AppRootComponent implements OnInit {
  data: ArtifactOption = null;

  constructor(private artifactsOptionsService: ArtifactsOptionsService) { }

  ngOnInit() {
    this.artifactsOptionsService.getOptions([]).subscribe(data => {
      this.data = data;
    });
  }

  clearProperties(item: ArtifactOption) {
    console.log(item);
  }
  // saveArtifact(item: ArtifactOption | ArtifactOption[]) {
  saveArtifact(item: ArtifactOption, parent: ArtifactOption) {
    console.log('this is the parent');
    console.log(parent);
    // _.forEach(this.data, (dataOption) => {
    //
    // });
    if (item.type === 'choice' || item.type === 'composition' || !item.type) {
        item.characterValue = 'true';
    }
    console.log('this is the full data');
    console.log(this.data);
    console.log('The bottom is the Itme');
    console.log(item);
  }
}
