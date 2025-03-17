import { FILTERS } from "@/constants/filters";

export type TFilter = Partial<(typeof FILTERS)[number]>;
