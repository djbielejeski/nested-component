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

  constructor(private artifactsOptionsService: ArtifactsOptionsService) { }

  ngOnInit() {
    this.artifactsOptionsService.getOptions([]).subscribe(data => {
      this.data = data;
    });
  }

  saveArtifact(item: SelectedArtifactModel) {

    console.log('removing all sub items.');
    console.log(item);
    if (item.parent != null && item.options && item.options !== item.selected) {
      this.removeSelectedValues(item.options);
    }
    else if (item.selected.options) {
      this.removeSelectedValues(item.selected.options);
    }

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
      else {
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
      else {
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
    console.log('this.data: ', this.data);
  }

  private removeSelectedValues(option: ArtifactOption) {
    for (let property in option) {
      const value = option[property];
      if (property === 'characterValue' && value != null) {
        console.error('removing from: ', option);
        option[property] = null;
      }
      else if (_.isArray(value) || _.isObject(value)) {
        for (const childProperty in value) {
          this.removeSelectedValues(value[childProperty]);
        }
      }
    }
  }
}
