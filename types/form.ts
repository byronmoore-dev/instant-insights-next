export type FormProps = {
  textData: string;
  fileData?: {
    name: string;
    type: string;
    data: string;
  } | null;
  summary: string;
  purpose: string;
};

export enum FormStages {
  INTRO = "intro",
  DATA = "data",
  CONTEXT = "context",
}
