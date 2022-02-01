import {
  FormItemInterface,
  FormInterface,
  DefaultObjectInterface,
  FormRule,
} from "../types";
import { Validator } from ".";

export default class Form {
  data: FormInterface;
  validationRules: FormRule;

  constructor(data: DefaultObjectInterface, validationRules: FormRule = {}) {
    this.data = this.addProperties(data) as {
      [index: string]: FormItemInterface;
    };
    this.validationRules = {};
    if (validationRules != {}) {
      this.setRules(validationRules);
    }
  }
  getOriginal(): DefaultObjectInterface {
    return this.removeProperties(this.data);
  }

  syncRules(): void {
    this.setRules(this.validationRules, this.data);
  }

  setPristine(): void {
    // Muda o status de todos os campos do form
  }

  clearErrors(data = this.data): void {
    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value.value == "object" &&
        value.value != null &&
        !(value.value instanceof Blob) &&
        !(value.value instanceof Date)
      ) {
        if (typeof value == "object") {
          value.value.forEach(item => {
            this.clearErrors(item);
          });
        }
      } else {
        value.value;
        data[key]["validationError"] = "";
      }
    });
  }

  hasErrors(): boolean {
    return this.errors() > 0;
  }

  errors(data: FormInterface = this.data): number {
    let totalErrors = 0;
    Object.values(data).forEach(value => {
      if (
        typeof value.value == "object" &&
        value.value != null &&
        !(value.value instanceof Blob) &&
        !(value.value instanceof Date)
      ) {
        value.value.forEach(item => {
          totalErrors += this.errors(item);
        });
      } else {
        if (value.validationError != "") {
          totalErrors += 1;
        }
      }
    });
    return totalErrors;
  }

  validate(data: FormInterface = this.data): void {
    const validator = new Validator();
    Object.values(data).forEach(value => {
      if (
        typeof value.value == "object" &&
        value.value != null &&
        !(value.value instanceof Blob) &&
        !(value.value instanceof Date)
      ) {
        value.value.forEach(item => {
          this.validate(item);
        });
      } else {
        value.validationError = validator.validate(
          value.value,
          value.validationRules,
        );
      }
    });
  }

  get(
    key: string,
  ):
    | string
    | number
    | boolean
    | null
    | Blob
    | Date
    | FormInterface[]
    | undefined {
    if (this.data[key]) {
      return this.data[key].value;
    }
    return undefined;
  }

  /**
   * Adiciona as regras de validação aos itens do form
   * 1 nível @todo subníveis
   */
  setRules(rules: FormRule, data = this.data): void {
    if (data == this.data) {
      this.validationRules = rules;
    }

    Object.entries(rules).forEach(([key, value]) => {
      if (data[key] && typeof value == "string") {
        if (data[key]["validationRules"] !== undefined) {
          data[key]["validationRules"] = value;
        }
      } else {
        const temp = data[key.substr(1)];
        if (
          temp &&
          typeof value == "object" &&
          typeof temp.value == "object" &&
          temp.value != null &&
          !(temp.value instanceof Blob) &&
          !(temp.value instanceof Date)
        ) {
          temp.value.forEach(item => {
            this.setRules(value, item);
          });
        }
      }
    });
  }
  // @todo criar SetRule para apenas 1 item
  // name: 'required' ou categories.name: required

  /**
   * Retorna o objeto ao estado inicial
   */
  private removeProperties(data: { [index: string]: FormItemInterface }) {
    const newObj: DefaultObjectInterface = {};
    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value.value == "object" &&
        value.value != null &&
        !(value.value instanceof Blob) &&
        !(value.value instanceof Date)
      ) {
        const nested: DefaultObjectInterface[] = [];
        value.value.forEach(item => {
          nested.push(this.removeProperties(item) as DefaultObjectInterface);
        });
        newObj[key] = nested;
      } else {
        if (typeof value.value != "undefined") {
          newObj[key] = value.value;
        }
      }
    });
    return newObj;
  }

  /**
   * Adiciona as propriedades extras do objeto
   */
  private addProperties(
    data: DefaultObjectInterface,
  ): FormInterface | undefined {
    if (data == null) {
      return;
    }
    const newObj: {
      [index: string]: FormItemInterface;
    } = {};
    Object.entries(data).forEach(([key, value]) => {
      if (
        typeof value == "object" &&
        value != null &&
        !(value instanceof Blob) &&
        !(value instanceof Date)
      ) {
        const nested: FormInterface[] = [];
        value.forEach(item => {
          nested.push(this.addProperties(item) as FormInterface);
        });
        newObj[key] = {
          value: nested,
          validationRules: "",
          validationError: "",
          status: "",
        };
      } else {
        newObj[key] = {
          value: value,
          validationRules: "",
          validationError: "",
          status: "",
        };
      }
    });
    return newObj;
  }
}
