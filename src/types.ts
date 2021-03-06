export interface DefaultObjectInterface {
  [index: string]:
    | string
    | number
    | boolean
    | null
    | Blob
    | Date
    | DefaultObjectInterface[];
}
export interface FormRule {
  [index: string]: string | FormRule;
}
export interface FormInterface {
  [index: string]: FormItemInterface;
}
export interface FormItemInterface {
  value:
    | string
    | number
    | boolean
    | undefined
    | null
    | Blob
    | Date
    | FormInterface[];
  validationRules: string;
  validationError: string;
  status: string;
}
