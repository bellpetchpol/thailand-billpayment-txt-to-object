interface BaseDetail {
  recordType: string;
  sequence: string | number;
  bankCode: string;
  companyAccountNo: string;
  paymentDate: string;
  paymentTime: string;
  customerName: string;
  reference1: string; 
  reference2: string;
  reference3: string; 
  kindOfTransaction: string;
  transactionCode: string;
  chequeNo: string;
  amount: string | number;
  chequeBankCode: string;
  chequeNo2: string;
}

interface BaseFooter {
  recordType: string;
  sequence: string | number;
  bankCode: string;
  companyAccountNo: string;
  totalDebitAmount: string | number;
  totalDebitTransaction: string | number;
  totalCreditAmount: string | number;
  totalCreditTransaction: string | number;
}

interface BaseHeader {
  recordType: string;
  sequence: string | number;
  bankCode: string;
  companyAccountNo: string;
  companyName: string;
  effectiveDate: string;
  serviceCode: string;
}

interface Section {
  header: string;
  detail: string;
  footer: string;
}

export { BaseHeader, BaseDetail, BaseFooter, Section };
