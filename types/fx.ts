export type GenerateVizType = {
  title: string;
  insights: Array<string>;
  viz1: {
    vizType: string;
    data: Array<{
      label: string;
      value: number;
    }>;
  };
  viz2: {
    vizType: string;
    data: Array<{
      label: string;
      value: number;
      max: number
    }>;
  };
};
