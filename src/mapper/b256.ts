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

export const b256 = (
  text: string,
  autoConvert: boolean = false,
  carriageReturnDigit: number = 1
): Header => {
  const sectionLength = 256 + carriageReturnDigit;
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

export const textToArrayOfString = (text: string): Array<string> => {
  const sectionLength = 256;
  let remainText = text;
  let cursor = 0;
  let result = new Array<string>();
  while (remainText.length >= sectionLength) {
    let headerPosition = remainText.search("H");
    let detailPosition = remainText.search("D");
    let footerPosition = remainText.search("T");
    if (
      headerPosition !== -1 &&
      headerPosition < detailPosition &&
      headerPosition < footerPosition
    ) {
      //header
      cursor = headerPosition;
    } else if (detailPosition !== -1 && detailPosition < footerPosition) {
      //detail
      cursor = detailPosition;
    } else {
      //footer
      cursor = footerPosition;
    }
    const row = remainText.substring(cursor, sectionLength);
    result.push(row);
    cursor += sectionLength;
    remainText = remainText.substring(cursor, remainText.length);
  }

  return result;
};

export const b256MultipleDays = (
  text: string,
  autoConvert: boolean = false
): Array<Header> => {
  const data = textToArrayOfString(text);
  let result = new Array<Header>();
  let header: Header;
  let footer: Footer;
  let details = new Array<Detail>();
  data.forEach((element) => {
    if (element.startsWith("H")) {
      header = {
        recordType: element.substring(0, 1),
        sequence: element.substring(1, 7),
        bankCode: element.substring(7, 10),
        companyAccountNo: element.substring(10, 20),
        companyName: element.substring(20, 60),
        effectiveDate: element.substring(60, 68),
        serviceCode: element.substring(68, 76),
        filler: element.substring(76, 256),
        details: details,
        footer: footer,
      }
    }

    if (element.startsWith("D")) {
      let detail: Detail = {
        recordType: element.substring(0, 1),
        sequence: element.substring(1, 7),
        bankCode: element.substring(7, 10),
        companyAccountNo: element.substring(10, 20),
        paymentDate: element.substring(20, 28),
        paymentTime: element.substring(28, 34),
        customerName: element
          .substring(34, 84)
          .trimEnd(),
        reference1: element
          .substring(84, 104)
          .trimEnd(),
        reference2: element
          .substring(104, 124)
          .trimEnd(),
        reference3: element.substring(124, 144),
        branchNo: element.substring(144, 148),
        tellerNo: element.substring(148, 152),
        kindOfTransaction: element.substring(152, 153),
        transactionCode: element.substring(153, 156),
        chequeNo: element.substring(156, 163),
        amount: element.substring(163, 176),
        chequeBankCode: element.substring(176, 179),
        procStatus: element.substring(179, 180),
        transDate: element.substring(180, 188),
        postingDate: element.substring(188, 196),
        filler: element.substring(196, 246),
        chequeNo2: element.substring(246, 256),
      };
      details.push(detail);
    }

    if (element.startsWith("T")) {
      footer = {
        recordType: element.substring(0, 1),
        sequence: element.substring(1, 7),
        bankCode: element.substring(7, 10),
        companyAccountNo: element.substring(10, 20),
        totalDebitAmount: element.substring(20, 33),
        totalDebitTransaction: element.substring(33, 39),
        totalCreditAmount: element.substring(39, 52),
        totalCreditTransaction: element.substring(52, 58),
        filler: element.substring(58, 256),
      };

      header.footer = footer;
      header.details = details;

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

      result.push(header);
      details = [];
      header = null;
      footer = null;
    }
  });

  return result;
};
