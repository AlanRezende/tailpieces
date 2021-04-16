import { DefineComponent, Plugin } from "vue";

declare const Tailpieces: Exclude<Plugin["install"], undefined>;
export default Tailpieces;

export const TButton: DefineComponent<
  {
    size: {
      type: StringConstructor;
      default: string;
    };
    color: {
      type: StringConstructor;
      default: string;
    };
  },
  {
    sizeClass: import("vue").ComputedRef<string>;
    colorClass: import("vue").ComputedRef<string>;
  },
  unknown,
  {},
  {},
  import("vue").ComponentOptionsMixin,
  import("vue").ComponentOptionsMixin,
  Record<string, any>,
  string,
  import("vue").VNodeProps &
    import("vue").AllowedComponentProps &
    import("vue").ComponentCustomProps,
  Readonly<
    {
      color: string;
      size: string;
    } & {}
  >,
  {
    color: string;
    size: string;
  }
>;
export const TInput: DefineComponent<{}, {}, any>;
export const TFormSection: DefineComponent<{}, {}, any>;
export const TSelect: DefineComponent<{}, {}, any>;
export const TAccordion: DefineComponent<{}, {}, any>;
export const TToggle: DefineComponent<{}, {}, any>;
export const TAlert: DefineComponent<{}, {}, any>;
export const TDropdown: DefineComponent<{}, {}, any>;
export const TDropdownItem: DefineComponent<{}, {}, any>;
export const TLoop: DefineComponent<{}, {}, any>;
export const TEditor: DefineComponent<{}, {}, any>;
export const TImageInput: DefineComponent<{}, {}, any>;
export const TModal: DefineComponent<{}, {}, any>;
export const TDialogModal: DefineComponent<{}, {}, any>;
export const TConfirmationModal: DefineComponent<{}, {}, any>;

export class Form {
  data: FormInterface;
  validationRules: FormRule;
  constructor(data: DefaultObjectInterface, validationRules?: FormRule);
  getOriginal(): DefaultObjectInterface;
  syncRules(): void;
  setPristine(): void;
  clearErrors(data?: any): void;
  hasErrors(): boolean;
  errors(data?: FormInterface): number;
  validate(data?: FormInterface): void;
  get(
    key: string,
  ): string | number | boolean | null | FormInterface[] | undefined;
  /**
   * Adiciona as regras de validação aos itens do form
   * 1 nível @todo subníveis
   */
  setRules(rules: FormRule, data?: any): void;
  /**
   * Retorna o objeto ao estado inicial
   */
  private removeProperties;
  /**
   * Adiciona as propriedades extras do objeto
   */
  private addProperties;
}

export interface FormInterface {
  [index: string]: FormItemInterface;
}

export interface FormItemInterface {
  value: string | number | boolean | undefined | null | FormInterface[];
  validationRules: string;
  validationError: string;
  status: string;
}

export interface DefaultObjectInterface {
  [index: string]: string | number | boolean | null | DefaultObjectInterface[];
}

export interface FormRule {
  [index: string]: string | FormRule;
}
