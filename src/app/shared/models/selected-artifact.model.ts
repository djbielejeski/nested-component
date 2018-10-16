import { ArtifactOption } from './artifact-option.model';

export interface SelectedArtifactModel {
  selected: ArtifactOption | ArtifactOption[] | SelectedArtifactModel;
  parent: ArtifactOption;
}
