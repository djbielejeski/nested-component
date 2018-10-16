import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { ArtifactOption } from '../models';
import {ArtifactsOptionsService} from '../services/artifacts-options.service';
import { SelectedArtifactModel } from '../models/selected-artifact.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css']
})
export class NestedComponent implements OnInit {
  @Input() data: ArtifactOption = null;
  @Input() parent: ArtifactOption = null;
  @Output() dataSelected = new EventEmitter<SelectedArtifactModel>();
  @Input() isReadOnly: boolean = null;

  selectedOption: ArtifactOption  = null;
  selectedOptions: ArtifactOption[] = [];

  constructor(private artifactsOptionsService: ArtifactsOptionsService) {}

  ngOnInit() {
    // Fetch yourself from the server
    // TODO: Alex

    // Pass in the parent id to the server to fetch all the sub-properties the user will be able to set
    // this.artifactsOptionsService.getOptionsByParentId(data.id).subscribe((properties: ArtifactOption[])=> {
    //  // Once you assign the sub properties, they will all render and render their available children.
    //  this.data.properties = properties;
    // };
  }

  compareOptions(artifactOption: ArtifactOption, artifactOption2: ArtifactOption): boolean {
    return artifactOption && artifactOption2 ? artifactOption2.name === artifactOption2.name : artifactOption2 === artifactOption2;
  }

  emitValue(value, data) {
    // if (this.data.type === 'choice') {
    //   if (!this.data.multiple  || this.data.multiple === null) {
    //     _.forEach(this.parent.options, (option) => {
    //       option.characterValue = null;
    //     });
    //   }
    // }
    //
    // // if composition and not multiple make all children null
    // if (this.data.type === 'composition') {
    //   if (!this.data.multiple || this.data.multiple === null) {
    //     _.forEach(this.data.properties, (property) => {
    //       property.characterValue = null;
    //       console.log('its getting here');
    //       console.log(property);
    //     });
    //   }
    // }
    if (value.selected) {
      this.dataSelected.emit(value);
    } else {
      this.dataSelected.emit( { parent: data, selected: value, parentOfSelected: this.data});
    }
  }
}
