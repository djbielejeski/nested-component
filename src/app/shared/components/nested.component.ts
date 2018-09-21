import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ArtifactOption } from '../models';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested.component.html',
  styleUrls: ['./nested.component.css']
})
export class NestedComponent {
  @Input() data: ArtifactOption = null;
  @Output() dataSelected = new EventEmitter<ArtifactOption>();

  expanded = false;
}
