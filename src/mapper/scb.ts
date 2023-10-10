import { stringToIsoDateString } from "./../utils/date";
interface Detail {
  recordType: string;
  sequence: string | number;
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
  amount: string | number;
  chqBankCode: string;
  procStatus: string;
  transDate: string;
  postingDate: string;
  filler: string;
  chequeNo2: string;
}

interface Footer {
  recordType: string;
  sequence: string | number;
  scbCode: string;
  companyACNo: string;
  totDrAmount: string | number;
  totDrTrans: string | number;
  totCrAmount: string | number;
  totCrTrans: string | number;
  filler: string;
}

interface Header {
  recordType: string;
  sequence: string | number;
  scbCode: string;
  companyACNo: string;
  companyName: string;
  effectiveDate: string;
  serviceCode: string;
  filler: string;
  details: Array<Detail>;
  footer: Footer;
}

const readFromString = (text: string, autoConvert: boolean = false): Header => {
  const textLength = text.length;
  if (textLength < 768) {
    throw new Error("the string length should be more than or equal 768");
  }
  const headerText = text.substring(0, 256);
  const footerStartFrom = textLength - 256;
  const footerText = text.substring(footerStartFrom);
  const detailText = text.substring(256, footerStartFrom);
  if (headerText.substring(0, 1) != "H") {
    throw new Error("The first character of header should be 'H'");
  }
  if (detailText.substring(0, 1) != "D") {
    throw new Error("The first character of details should be 'D'");
  }
  if (detailText.length % 256 != 0) {
    throw new Error(
      "The details length should not have any reminder when mod by 256"
    );
  }
  if (footerText.substring(0, 1) != "T") {
    throw new Error("The first character of footer should be 'T'");
  }

  const rowCount = detailText.length / 256;

  let details = new Array<Detail>();
  for (let index = 0; index < rowCount; index++) {
    let increment = index * 256;
    let detail: Detail = {
      recordType: detailText.substring(0 + increment, 1 + increment),
      sequence: detailText.substring(1 + increment, 7 + increment),
      scbCode: detailText.substring(7 + increment, 10 + increment),
      companyACNo: detailText.substring(10 + increment, 20 + increment),
      paymentDate: detailText.substring(20 + increment, 28 + increment),
      paymentTime: detailText.substring(28 + increment, 34 + increment),
      customerName: detailText
        .substring(34 + increment, 84 + increment)
        .trimEnd(),
      custId: detailText.substring(84 + increment, 104 + increment).trimEnd(),
      refNo2: detailText.substring(104 + increment, 124 + increment).trimEnd(),
      tranNo: detailText.substring(124 + increment, 144 + increment),
      branchNo: detailText.substring(144 + increment, 148 + increment),
      tellerNo: detailText.substring(148 + increment, 152 + increment),
      kindOfTrans: detailText.substring(152 + increment, 153 + increment),
      transactionCode: detailText.substring(153 + increment, 156 + increment),
      chequeNo: detailText.substring(156 + increment, 163 + increment),
      amount: detailText.substring(163 + increment, 176 + increment),
      chqBankCode: detailText.substring(176 + increment, 179 + increment),
      procStatus: detailText.substring(179 + increment, 180 + increment),
      transDate: detailText.substring(180 + increment, 188 + increment),
      postingDate: detailText.substring(188 + increment, 196 + increment),
      filler: detailText.substring(196 + increment, 246 + increment),
      chequeNo2: detailText.substring(246 + increment, 256 + increment),
    };
    console.log(detail);
    details.push(detail);
  }

  let footer: Footer = {
    recordType: footerText.substring(0, 1),
    sequence: footerText.substring(1, 7),
    scbCode: footerText.substring(7, 10),
    companyACNo: footerText.substring(10, 20),
    totDrAmount: footerText.substring(20, 33),
    totDrTrans: footerText.substring(33, 39),
    totCrAmount: footerText.substring(39, 52),
    totCrTrans: footerText.substring(52, 58),
    filler: footerText.substring(58, 256),
  };

  let header: Header = {
    recordType: headerText.substring(0, 1),
    sequence: headerText.substring(1, 7),
    scbCode: headerText.substring(7, 10),
    companyACNo: headerText.substring(10, 20),
    companyName: headerText.substring(20, 60),
    effectiveDate: headerText.substring(60, 68),
    serviceCode: headerText.substring(68, 76),
    filler: headerText.substring(76, 256),
    details: details,
    footer: footer,
  };
  if (autoConvert === true) {
    header.details.forEach((c) => {
      const amount = c.amount as string;
      c.amount = parseFloat(
        amount.substring(0, 11) + "." + amount.substring(11)
      );
      c.sequence = parseFloat(c.sequence as string);
      c.paymentDate = stringToIsoDateString(c.paymentDate);
    });
    header.effectiveDate = stringToIsoDateString(header.effectiveDate);
    header.sequence = parseFloat(header.sequence as string);

    header.footer.sequence = parseFloat(header.footer.sequence as string);
    const totCrAmount = header.footer.totCrAmount as string;
    header.footer.totCrAmount = parseFloat(
      totCrAmount.substring(0, 11) + "." + totCrAmount.substring(11)
    );
    header.footer.totCrTrans = parseFloat(header.footer.totCrTrans as string);
    const totDrAmount = header.footer.totDrAmount as string;
    header.footer.totDrAmount = parseFloat(
      totDrAmount.substring(0, 11) + "." + totDrAmount.substring(11)
    );
    header.footer.totDrTrans = parseFloat(header.footer.totDrTrans as string);
  }
  return header;
};

export default {
  readFromString,
};
