export const StatusEnum = {
  DEFAULT: "default",
  SELECTED: "selected",
  MATCHED: "matched",
  ERROR: "error",
} as const;

export type ButtonStatus = (typeof StatusEnum)[keyof typeof StatusEnum];

export interface ButtonProps {
  key: number;
  value: string;
  onClick: () => void;
  canSelect: boolean;
  status: ButtonStatus;
}
