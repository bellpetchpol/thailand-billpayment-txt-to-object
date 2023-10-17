import { stringToIsoDateString } from "../utils/date";
import { textToSection } from "./validation";
import { BaseHeader, BaseDetail, BaseFooter } from "../interface/base";
interface Detail extends BaseDetail {
  branchNo: string;
  tellerNo: string;
  procStatus: string;
  transDate: string;
  postingDate: string;
  filler: string;
}

interface Footer extends BaseFooter {
  filler: string;
}

interface Header extends BaseHeader {
  filler: string;
  details: Array<Detail>;
  footer: Footer;
}

export const b256 = (text: string, autoConvert: boolean = false): Header => {
  const sectionLength = 256;
  const section = textToSection(text, sectionLength);
  const headerText = section.header;
  const footerText = section.footer;
  const detailText = section.detail;

  const rowCount = detailText.length / sectionLength;

  let details = new Array<Detail>();
  for (let index = 0; index < rowCount; index++) {
    let increment = index * sectionLength;
    let detail: Detail = {
      recordType: detailText.substring(0 + increment, 1 + increment),
      sequence: detailText.substring(1 + increment, 7 + increment),
      bankCode: detailText.substring(7 + increment, 10 + increment),
      companyAccountNo: detailText.substring(10 + increment, 20 + increment),
      paymentDate: detailText.substring(20 + increment, 28 + increment),
      paymentTime: detailText.substring(28 + increment, 34 + increment),
      customerName: detailText
        .substring(34 + increment, 84 + increment)
        .trimEnd(),
      reference1: detailText
        .substring(84 + increment, 104 + increment)
        .trimEnd(),
      reference2: detailText
        .substring(104 + increment, 124 + increment)
        .trimEnd(),
      reference3: detailText.substring(124 + increment, 144 + increment),
      branchNo: detailText.substring(144 + increment, 148 + increment),
      tellerNo: detailText.substring(148 + increment, 152 + increment),
      kindOfTransaction: detailText.substring(152 + increment, 153 + increment),
      transactionCode: detailText.substring(153 + increment, 156 + increment),
      chequeNo: detailText.substring(156 + increment, 163 + increment),
      amount: detailText.substring(163 + increment, 176 + increment),
      chequeBankCode: detailText.substring(176 + increment, 179 + increment),
      procStatus: detailText.substring(179 + increment, 180 + increment),
      transDate: detailText.substring(180 + increment, 188 + increment),
      postingDate: detailText.substring(188 + increment, 196 + increment),
      filler: detailText.substring(196 + increment, 246 + increment),
      chequeNo2: detailText.substring(246 + increment, 256 + increment),
    };
    details.push(detail);
  }

  let footer: Footer = {
    recordType: footerText.substring(0, 1),
    sequence: footerText.substring(1, 7),
    bankCode: footerText.substring(7, 10),
    companyAccountNo: footerText.substring(10, 20),
    totalDebitAmount: footerText.substring(20, 33),
    totalDebitTransaction: footerText.substring(33, 39),
    totalCreditAmount: footerText.substring(39, 52),
    totalCreditTransaction: footerText.substring(52, 58),
    filler: footerText.substring(58, 256),
  };

  let header: Header = {
    recordType: headerText.substring(0, 1),
    sequence: headerText.substring(1, 7),
    bankCode: headerText.substring(7, 10),
    companyAccountNo: headerText.substring(10, 20),
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
    const totCrAmount = header.footer.totalCreditAmount as string;
    header.footer.totalCreditAmount = parseFloat(
      totCrAmount.substring(0, 11) + "." + totCrAmount.substring(11)
    );
    header.footer.totalCreditTransaction = parseFloat(
      header.footer.totalCreditTransaction as string
    );
    const totDrAmount = header.footer.totalDebitAmount as string;
    header.footer.totalDebitAmount = parseFloat(
      totDrAmount.substring(0, 11) + "." + totDrAmount.substring(11)
    );
    header.footer.totalDebitTransaction = parseFloat(
      header.footer.totalDebitTransaction as string
    );
  }
  return header;
};