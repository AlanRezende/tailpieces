import { DefineComponent, Plugin } from "vue";

declare const Tailpieces: Exclude<Plugin["install"], undefined>;
export default Tailpieces;

export const TailpiecesSample: DefineComponent<{}, {}, any>;
export const TButton: DefineComponent<{}, {}, any>;
