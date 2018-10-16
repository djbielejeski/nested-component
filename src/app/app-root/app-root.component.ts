import { Component, OnInit } from '@angular/core';
import { ArtifactOption } from '../shared/models';
import { ArtifactsOptionsService } from '../shared/services/artifacts-options.service';
import { SelectedArtifactModel } from '../shared/models/selected-artifact.model';

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
    console.log('Full item stack: ', item);
    this.logSelectedItemParent(item);
    this.logSelectedItem(item);
  }

  logSelectedItemParent(item: SelectedArtifactModel) {
    if (item.selected && !item.selected.selected) {
      console.log('Parent of selected item: ', item.parent);
    }
    else {
      this.logSelectedItemParent(item.selected);
    }
  }

  logSelectedItem(item: SelectedArtifactModel) {
    if (!item.selected) {
      console.log('Selected item: ', item);
    }
    else {
      this.logSelectedItem(item.selected);
    }
  }
}
