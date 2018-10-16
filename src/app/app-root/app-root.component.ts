import { Component, OnInit } from '@angular/core';
import { ArtifactOption } from '../shared/models';
import { ArtifactsOptionsService } from '../shared/services/artifacts-options.service';
import { SelectedArtifactModel } from '../shared/models/selected-artifact.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html'
})
export class AppRootComponent implements OnInit {
  data: ArtifactOption = null;
  template: ArtifactOption = null;

  constructor(private artifactsOptionsService: ArtifactsOptionsService) { }

  ngOnInit() {
    this.artifactsOptionsService.getOptions([]).subscribe(data => {
      this.data = data;
      this.template = _.cloneDeep(data);
    });
    // this.artifactsOptionsService.getOptions([]).subscribe(data => {
    //   this.template = _.cloneDeep(data);
    // });
  }

  saveArtifact(item: SelectedArtifactModel) {
    // if choice and not multiple make all children null
    if (item.parentOfSelected.type === 'choice') {
      if (item.parentOfSelected.multiple) {
        _.forEach(item.parentOfSelected.options, (currentOption) => {
          currentOption.characterValue = null;
          _.forEach(item.selected, (selectedOption) => {
            if (currentOption.name === selectedOption.name) {
              currentOption.characterValue = 'true';
              selectedOption.characterValue = 'true';
            }
          });
        });
      }

      if (!item.parentOfSelected.multiple  || item.parentOfSelected.multiple === null) {
        console.log('its getting here somehow')
        _.forEach(item.parentOfSelected.options, (option) => {
          option.characterValue = null;
        });
        item.selected.characterValue = 'true';
      }
    }

    // if composition and not multiple make all children null
    if (item.parentOfSelected.type === 'composition') {
      if (item.parentOfSelected.multiple) {
        _.forEach(item.parentOfSelected.properties, (currentOption) => {
          currentOption.characterValue = null;
          _.forEach(item.selected, (selectedOption) => {
            if (currentOption.name === selectedOption.name) {
              currentOption.characterValue = 'true';
            }
          });
        });
      }

      if (!item.parentOfSelected.multiple || item.parentOfSelected.multiple === null) {
        _.forEach(item.parent.properties, (property) => {
          if (property !== item.selected) {
            property.characterValue = null;
          }
        });
        item.selected.characterValue = 'true';
      }
    }
    console.log('Parent of selected item: ', item.parent);
    console.log('Selected item: ', item.selected);

    console.log('full template');
    console.log(this.data);
    //
    // console.log('original template');
    // console.log(this.template);
  }
}
