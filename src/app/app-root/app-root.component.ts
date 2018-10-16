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
    console.log('Parent of selected item: ', item.parent);
    console.log('Selected item: ', item.selected);
  }
}
