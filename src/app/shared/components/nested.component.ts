import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { ArtifactOption } from '../models';
import {ArtifactsOptionsService} from '../services/artifacts-options.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css']
})
export class NestedComponent implements OnInit {
  @Input() data: ArtifactOption = null;
  @Output() dataSelected = new EventEmitter<ArtifactOption>();
  @Output() parentData: ArtifactOption = null;

  selectedOption: ArtifactOption  = null;
  selectedOptions: ArtifactOption[] = [];

  constructor(private artifactsOptionsService: ArtifactsOptionsService) {}

  ngOnInit() {
    this.parentData = this.data;
    // Fetch yourself from the server
    // TODO: Alex

    // Pass in the parent id to the server to fetch all the sub-properties the user will be able to set
    // this.artifactsOptionsService.getOptionsByParentId(data.id).subscribe((properties: ArtifactOption[])=> {
    //  // Once you assign the sub properties, they will all render and render their available children.
    //  this.data.properties = properties;
    // };
  }

  onChange(parentData: ArtifactOption, selectedData: ArtifactOption) {
    console.log('in on change selected Data');
    console.log(selectedData);
    if (parentData.properties) {
      _.forEach(parentData.properties, (item) => {
        if (item !== selectedData) {
          item.characterValue = null;
          console.log('its the same');
        }
        item.characterValue = null;
        console.log('in for each properties loop');
        console.log(item);
      });

    }
    if (parentData.options) {
      _.forEach(parentData.options, (item) => {
        if (item !== selectedData) {
          item.characterValue = null;
          console.log('its not the same');
        }
      });
    }
  }
}
