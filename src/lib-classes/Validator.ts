export default class Validator {
  validate(
    value: string | number | boolean | null | undefined | Blob,
    rules: string,
  ): string {
    if (typeof value == "string") {
      return this.validateString(value, rules);
    }
    return "";
  }

  validateString(value: string, rules: string): string {
    const rulesArray = rules.split("|");
    let message = "";
    rulesArray.some(rule => {
      /**
       * Required
       */
      if (rule == "required") {
        if (value == "") {
          message = "Campo Obrigatório";
          return true;
        }
      }
      /**
       * size
       * size:3
       */
      if (rule.split(":")[0] == "size") {
        if (typeof value == "string") {
          if (value.length != parseInt(rule.split(":")[1])) {
            message = `Este campo precisa ter ${rule.split(":")[1]} caracteres`;
            return true;
          }
        }
      }

      /**
       * min
       * ex: min:3
       */
      if (rule.split(":")[0] == "min") {
        if (typeof value == "string") {
          if (value.length < parseInt(rule.split(":")[1])) {
            message = `Este campo precisa ter ao menos ${
              rule.split(":")[1]
            } caracteres`;
            return true;
          }
        }
      }
      /**
       * max
       * ex: max:3
       */
      if (rule.split(":")[0] == "max") {
        if (typeof value == "string") {
          if (value.length > parseInt(rule.split(":")[1])) {
            message = `Este campo precisa ter no máximo ${
              rule.split(":")[1]
            } caracteres`;
            return true;
          }
        }
      }
    });

    return message;
  }
}
