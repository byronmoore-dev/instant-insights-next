export type FormProps = {
  textData?: string;
  fileData?: any;
  summary: string;
  purpose: string;
};

export enum FormStages {
  INTRO = "intro",
  DATA = "data",
  CONTEXT = "context",
}
