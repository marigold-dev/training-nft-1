const errorMap: Map<string, string> = new Map([
  ["0", "Enter a positive and not null amount"],
  ["1", "Operation not allowed, you need to be administrator"],
  ["2", "You cannot sell more than your current balance"],
  ["3", "Cannot find the offer you entered for buying"],
  ["4", "You entered a quantity to buy than is more than the offer quantity"],
  [
    "5",
    "Not enough funds, you need to pay at least quantity * bif price to get the tokens",
  ],
  ["6", "Cannot find the contract relative to implicit address"],
]);

export class TransactionInvalidBeaconError {
  name: string;
  title: string;
  message: string;
  description: string;
  data_contract_handle: string;
  data_with_string: string;
  data_expected_form: string;
  data_message: string;

  /**
    * 
    * @param transactionInvalidBeaconError  {
    "name": "UnknownBeaconError",
    "title": "Aborted",
    "message": "[ABORTED_ERROR]:The action was aborted by the user.",
    "description": "The action was aborted by the user."
}
*/

  constructor(transactionInvalidBeaconError: any) {
    this.name = transactionInvalidBeaconError.name;
    this.title = transactionInvalidBeaconError.title;
    this.message = transactionInvalidBeaconError.message;
    this.description = transactionInvalidBeaconError.description;
    this.data_contract_handle = "";
    this.data_with_string = "";
    this.data_expected_form = "";
    this.data_message = this.message;
    if (transactionInvalidBeaconError.data !== undefined) {
      let dataArray = Array.from<any>(
        new Map(
          Object.entries<any>(transactionInvalidBeaconError.data)
        ).values()
      );
      let contract_handle = dataArray.find(
        (obj) => obj.contract_handle !== undefined
      );
      this.data_contract_handle =
        contract_handle !== undefined ? contract_handle.contract_handle : "";
      let withString = dataArray.find((obj) => obj.with !== undefined);
      this.data_with_string =
        withString !== undefined ? withString.with.string : "";
      let expected_form = dataArray.find(
        (obj) => obj.expected_form !== undefined
      );
      this.data_expected_form =
        expected_form !== undefined
          ? expected_form.expected_form +
            ":" +
            expected_form.wrong_expression.string
          : "";
      this.data_message =
        (this.data_contract_handle
          ? "Error on contract : " + this.data_contract_handle + " "
          : "") +
        (this.data_with_string
          ? "error : " + errorMap.get(this.data_with_string) + " "
          : "") +
        (this.data_expected_form
          ? "error : " + this.data_expected_form + " "
          : "");
    }
  }
}
