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
    this.artifactsOptionsService.getTemplateOptions([]).subscribe( temp => {
      this.template = temp;
      console.log('this is temp', this.template);
    });
    this.artifactsOptionsService.getOptions([]).subscribe(data => {
      this.data = data;
    });
    // Get the template data from the json
  }

  saveArtifact(item: SelectedArtifactModel) {
    // if choice and not multiple make all children null
    if (item.options.type === 'choice') {
      if (item.options.multiple) {
        _.forEach(item.options.options, (currentOption) => {
          currentOption.characterValue = null;
          _.forEach(item.selected, (selectedOption) => {
            if (currentOption.name === selectedOption.name) {
              currentOption.options = 'true';
              selectedOption.options = 'true';
            }
          });
        });
      }

      if (!item.options.multiple  || item.options.multiple === null) {
        console.log('its getting here somehow');
        _.forEach(item.options.options, (option) => {
          option.characterValue = null;
        });
        item.selected.characterValue = 'true';
      }
    }

    // if composition and not multiple make all children null
    if (item.options.type === 'composition') {
      if (item.options.multiple) {
        _.forEach(item.options.properties, (currentOption) => {
          currentOption.characterValue = null;
          _.forEach(item.options, (selectedOption) => {
            if (currentOption.name === selectedOption.name) {
              currentOption.characterValue = 'true';
            }
          });
        });
      }

      if (!item.options.multiple || item.options.multiple === null) {
        _.forEach(item.options.properties, (property) => {
          if (property !== item.selected) {
            property.characterValue = null;
          }
        });
        item.selected.characterValue = 'true';
      }
    }
    console.log('Parent of selected item: ', item.parent);
    console.log('Selected item: ', item.selected);
    console.log('Options: ', item.options);
    console.log('Template Node:' , item.templateNode);

    console.log('full template');
    console.log(this.data);
  }
}
