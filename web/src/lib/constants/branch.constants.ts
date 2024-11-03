import { BranchStatus } from "@/interfaces/enums";

export const BRANCH_STATUS_OPTIONS = Object.values(BranchStatus).map(
  (el, i) => ({ id: i, value: el })
);
