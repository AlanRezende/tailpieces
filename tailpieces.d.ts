import { DefineComponent, Plugin } from "vue";

declare const Tailpieces: Exclude<Plugin["install"], undefined>;
export default Tailpieces;

export const TButton: DefineComponent<{}, {}, any>;
export const TInput: DefineComponent<{}, {}, any>;
export const TFormSection: DefineComponent<{}, {}, any>;
export const TSelect: DefineComponent<{}, {}, any>;
export const TAccordion: DefineComponent<{}, {}, any>;
export const TToggle: DefineComponent<{}, {}, any>;
export const TAlert: DefineComponent<{}, {}, any>;
export const TDropdown: DefineComponent<{}, {}, any>;
export const TDropdownItem: DefineComponent<{}, {}, any>;
export const TLoop: DefineComponent<{}, {}, any>;

export interface FormInterface {
  [index: string]: FormItemInterface;
}
export interface FormItemInterface {
  value: string | number | boolean | undefined | null | FormInterface[];
  validationRules: string;
  validationError: string;
  status: string;
}
