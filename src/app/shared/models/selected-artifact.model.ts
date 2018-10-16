import { ArtifactOption } from './artifact-option.model';

export interface SelectedArtifactModel {
  selected: any; // will be one of these types: ArtifactOption | ArtifactOption[] | SelectedArtifactModel
  parentOfSelected: ArtifactOption;
  parent: ArtifactOption;
}
