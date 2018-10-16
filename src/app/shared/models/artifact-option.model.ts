export interface ArtifactOption {
  name: string;
  type?: string;
  properties?: ArtifactOption[];
  options?: ArtifactOption[];
  // choices?: ArtifactOption[];
  multiple?: boolean;

  characterValue?: string;
}
