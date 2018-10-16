import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { ArtifactOption } from '../models';
import {ArtifactsOptionsService} from '../services/artifacts-options.service';
import { SelectedArtifactModel } from '../models/selected-artifact.model';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css']
})
export class NestedComponent implements OnInit {
  @Input() data: ArtifactOption = null;
  @Input() parent: ArtifactOption = null;
  @Output() dataSelected = new EventEmitter<SelectedArtifactModel>();

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

  emitValue(value: ArtifactOption | ArtifactOption[]) {
    this.dataSelected.emit( { parent: this.parent, selected: value});
  }
}
