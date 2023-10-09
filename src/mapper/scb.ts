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

const testData =
  "H0000010141772617529นิติบุคคลอาคารชุด ยูนิโอ เสรีไทย        27092023        All                                                                                                                                                                                 D000002014177261752927092023145512นาง เยาวลักษณ์ ล่องท                              5700625             6608000083                              00000000CNET00000000000000050000000                 099400241590400                                0040000000000D000003014177261752927092023080919นาย อัศนัย ภูครองนาค                              5700479             6604000597                              00000000CNET00000000000000100000000                 099400241590400                                0040000000000T000004014177261752900000000000000000000000000150000000002All                                                                                                                                                                                                   ";

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
      customerName: detailText.substring(34 + increment, 84 + increment),
      custId: detailText.substring(84 + increment, 104 + increment),
      refNo2: detailText.substring(104 + increment, 124 + increment),
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

    });
  }
  return header;
};

const result = readFromString(testData);
console.log(result);
