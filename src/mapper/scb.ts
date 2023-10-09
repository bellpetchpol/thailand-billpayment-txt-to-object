interface Detail {
  recordType: string;
  sequence: string;
  scbCode: string;
  companyACNo: string;
  paymentDate: string;
  paymentTime: string;
  customerName: string;
  custId: string;
  refNo2: string;
  tranNo: string;
  branchNo: string;
  tellerNo: string;
  kindOfTrans: string;
  transactionCode: string;
  chequeNo: string;
  amount: string;
  chqBankCode: string;
  procStatus: string;
  transDate: string;
  postingDate: string;
  filler: string;
  chequeNo2: string;
}

interface Footer {
  recordType: string;
  sequence: string;
  scbCode: string;
  companyACNo: string;
  totDrAmount: string;
  totDrTrans: string;
  totCrAmount: string;
  totCrTrans: string;
  filler: string;
}

interface Header {
  recordType: string;
  sequence: string;
  scbCode: string;
  companyACNo: string;
  companyName: string;
  effectiveDate: string;
  serviceCode: string;
  filler: string;
  details: Array<Detail>;
  footer: Footer;
}

const readFromString = (text: string): void => {
  const textLength = text.length;
  if (textLength < 768) {
    throw new Error("the string length should be more than or equal 768");
  }
  const headerText = text.substring(0, 256);
  const footerStartFrom = textLength - 257;
  const footerText = text.substring(footerStartFrom);
//   let header: Header = {
//     recordType: "test",
//   };
//   return header;
};
