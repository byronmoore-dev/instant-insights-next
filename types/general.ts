export type FormProps = {
  data: string;
  summary: string;
};

export enum FormStages {
  INTRO = "intro",
  DATA = "data",
  SUMMARY = "summary",
  SUBMIT = "submit",
}
