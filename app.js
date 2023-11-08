import { b256 } from "@bellpetchpol/thailand-billpayment-txt-to-object";

document.getElementById("inputfile").addEventListener("change", function () {
  var fr = new FileReader();
  let fileData = this.files[0]
  let retried = false
  fr.onload = function () {
    if (fr.result.includes('�') & !retried)
    {
        retried = true
        fr.readAsText(fileData, 'ISO8859-11');
    } else {
      console.log(fr.result);
      console.log(b256(fr.result, true));
    }
  };

  fr.readAsText(fileData);
});
