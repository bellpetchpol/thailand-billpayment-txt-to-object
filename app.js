import { b256 } from "@bellpetchpol/thailand-billpayment-txt-to-object";

var test256Fixture =
  "H0000010021013344633TEST COMPANY                            09092015ABC                                                                                                                                                                                         D000002002101334463309092015105001ซู่เซ็ก แซ่โซ่                                    2111972             21158266966528221                       16630101CIND0000000000000490000000009092015Y  00                                                      0000000000D000003002101334463309092015111949ซู่เซ็ก แซ่โซ่                                    3207252             986958477686NFJKDHG                     01030101CIND0000000000000189900000009092015Y  00                                                      0000000000D000004002101334463309092015143927ทดสอบ ทดสอบ1                                      080301              20150909143927                          01310101CEPY0000000000000007000000009092015Y  00                                                      0000000000T00000500210133446330000000002250000003000000686900000000300000000000000000000000                                                                                                                                                                               ";
console.log(b256(test256Fixture, true));

document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();
  let fileData = this.files[0]
  let retried = false
  fr.onload = function () {
    console.log(fr.result);
    if (fr.result.includes('�') & !retried)
    {
        retried = true
        fr.readAsText(fileData, 'ISO8859-11');
    }
  };

  fr.readAsText(fileData);
});
