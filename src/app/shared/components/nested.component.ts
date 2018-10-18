import {Component, Input, Output, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import { ArtifactOption } from '../models';
import {ArtifactsOptionsService} from '../services/artifacts-options.service';
import { SelectedArtifactModel } from '../models/selected-artifact.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css']
})
export class NestedComponent implements OnInit, AfterViewInit {
  @Input() data: ArtifactOption = null;
  @Input() parent: ArtifactOption = null;
  @Input() templateNode: ArtifactOption = null;
  @Output() dataSelected = new EventEmitter<SelectedArtifactModel>();
  @Input() isReadOnly: boolean = null;
  @Input() isNew: boolean = null;

  selectedOption: ArtifactOption  = null;
  selectedOptions: ArtifactOption[] = [];
  currentNode: ArtifactOption = null;

  constructor(private artifactsOptionsService: ArtifactsOptionsService) {}

  ngOnInit() {
    console.log(this.templateNode);
    if (this.data && this.data.type === 'composition') {
      if (this.data.multiple) {
        this.selectedOptions = _.filter(this.data.properties, {characterValue: 'true'});
      } else {
        this.selectedOption = _.find(this.data.properties, {characterValue: 'true'});
      }
    }
    if (this.data && this.data.type === 'choice') {
      if (this.data.multiple) {
        this.selectedOptions = _.filter(this.data.options, {characterValue: 'true'});
      } else {
        this.selectedOption = _.find(this.data.options, {characterValue: 'true'});
      }
    }
    // find proper parent node from template to send into next template.
    // Fetch yourself from the server
    // TODO: Alex

    // Pass in the parent id to the server to fetch all the sub-properties the user will be able to set
    // this.artifactsOptionsService.getOptionsByParentId(data.id).subscribe((properties: ArtifactOption[])=> {
    //  // Once you assign the sub properties, they will all render and render their available children.
    //  this.data.properties = properties;
    // };
  }

  ngAfterViewInit() {
    // this.currentNode = this.getParentNode();
    console.log('current node', this.currentNode);
  }

  // getParentNode() {
  //   let node = null;
  //   if (this.templateNode && this.templateNode.properties) {
  //     console.log('this is template node with properties: ', this.templateNode);
  //     console.log('this is parent: ', this.data);
  //     if (this.templateNode.name === this.data.name) {
  //       node = this.templateNode;
  //     }
  //     _.forEach(this.templateNode.properties, (item) => {
  //       if ((item.name === this.data.name) && (item.type === this.data.type)) {
  //         console.log(item);
  //         node = item;
  //       }
  //     });
  //   }
  //   console.log('node: ', node);
  //   return node;
  // }

  compareOptions(artifactOption: ArtifactOption, artifactOption2: ArtifactOption): boolean {
    return artifactOption && artifactOption2 ? artifactOption.name === artifactOption2.name : artifactOption === artifactOption2;
  }

  emitValue(value) {
    // console.log(this.templateNode);
    // this.currentNode = this.getParentNode();
    // console.log('current node', this.currentNode);
    // console.log('this is the template');
    // console.log(this.templateNode);
    // this.newNode =_.find(this.templateNode, {name: this.data.name, type: this.data.type});
    if (value.selected) {
      this.dataSelected.emit(value);
    } else {
      this.dataSelected.emit( { parent: this.parent, selected: value, options: this.data, templateNode: null});
    }
  }

  // emitValue(value, data) {
  //   console.log('this.parent');
  //   console.log(this.parent);
  //   if (value.selected) {
  //     this.dataSelected.emit(value);
  //   } else {
  //     this.dataSelected.emit( { parent: this.parent, selected: value, });
  //   }
  // }
}
