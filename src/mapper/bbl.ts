import { stringToIsoDateString } from "./../utils/date";
import { textToSection } from "./validation";

import { BaseHeader, BaseDetail, BaseFooter } from "../interface/base";
interface Detail extends BaseDetail {
  processingBranch: string;
  accountOwnerBranch: string;
  bankUseArea: string;
  returnChequeReason: string;
  bankUseArea2: string;
  reserve: string;
  chequeBranchCode: string;
  chequeDate: string;
  clearingDate: string;
  flagReportDeposit: string;
  flagReportReconcile: string;
  flagReportPendingCheque: string;
  flagReportReturnCheque: string;
  cancelChequeReason: string;
  collectorName: string;
  chequeStatus: string;
  bankUseArea3: string;
  bcCommission: string;
  bankUseArea4: string;
  reserve2: string;
}

interface Footer extends BaseFooter {
  totalMerchantDiscount: string | number;
  totalVat: string | number;
  totalBcCommission: string | number;
  totalChequeReturnFee: string | number;
  totalServiceFee: string | number;
  reserve: string;
}

interface Header extends BaseHeader {
  reserve: string;
  details: Array<Detail>;
  footer: Footer;
}

const readFromString = (text: string, autoConvert: boolean = false): void => {
  const sectionLength = 450;
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
      processingBranch: detailText.substring(144 + increment, 148 + increment),
      accountOwnerBranch: detailText.substring(
        148 + increment,
        152 + increment
      ),
      kindOfTransaction: detailText.substring(152 + increment, 153 + increment),
      transactionCode: detailText.substring(153 + increment, 156 + increment),
      chequeNo: detailText.substring(156 + increment, 163 + increment),
      amount: detailText.substring(163 + increment, 176 + increment),
      chequeBankCode: detailText.substring(176 + increment, 179 + increment),
      bankUseArea: detailText.substring(179 + increment, 190 + increment),
      returnChequeReason: detailText.substring(
        190 + increment,
        192 + increment
      ),
      bankUseArea2: detailText.substring(192 + increment, 193 + increment),
      reserve: detailText.substring(193 + increment, 246 + increment),
      chequeNo2: detailText.substring(246 + increment, 256 + increment),
      chequeBranchCode: detailText.substring(256 + increment, 260 + increment),
      chequeDate: detailText.substring(260 + increment, 268 + increment),
      clearingDate: detailText.substring(268 + increment, 276 + increment),
      flagReportDeposit: detailText.substring(276 + increment, 277 + increment),
      flagReportReconcile: detailText.substring(
        277 + increment,
        278 + increment
      ),
      flagReportPendingCheque: detailText.substring(
        278 + increment,
        279 + increment
      ),
      flagReportReturnCheque: detailText.substring(
        279 + increment,
        280 + increment
      ),
      cancelChequeReason: detailText.substring(
        280 + increment,
        281 + increment
      ),
      collectorName: detailText.substring(281 + increment, 331 + increment),
      chequeStatus: detailText.substring(331 + increment, 332 + increment),
      bankUseArea3: detailText.substring(332 + increment, 333 + increment),
      bcCommission: detailText.substring(333 + increment, 342 + increment),
      bankUseArea4: detailText.substring(342 + increment, 351 + increment),
      reserve2: detailText.substring(351 + increment, 360 + increment),
    };
    console.log(detail);
    details.push(detail);
  }
};

export default {
  readFromString,
};
