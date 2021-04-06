import { DefineComponent, Plugin } from "vue";

declare const Tailpieces: Exclude<Plugin["install"], undefined>;
export default Tailpieces;

export const TButton: DefineComponent<{}, {}, any>;
