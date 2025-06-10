import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type HighlightedSentence = {
  highlight: string,
  className: string,
};

export interface Example {
  text: string;
  topic: string;
  icon: IconDefinition;
}

export type QualityCategory = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'None';
