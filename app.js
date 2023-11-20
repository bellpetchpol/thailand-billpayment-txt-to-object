import { b256MultipleDays } from "@bellpetchpol/thailand-billpayment-txt-to-object";

document.getElementById("inputfile").addEventListener("change", function () {
    var fr = new FileReader();
    let fileData = this.files[0]
    let retried = false
    fr.onload = function () {
        if (fr.result.includes('�') & !retried) {
            console.log("read with ISO8859-11")
            retried = true
            fr.readAsText(fileData, 'ISO8859-11');
            return
        }

        if (retried) {
            console.log("with carriage return digit", fr.result);
            //   console.log(b256(fr.result, true, 2));
            console.log(b256MultipleDays(fr.result, true))
        } else {
            console.log("here")
            console.log(fr.result);
            console.log(b256MultipleDays(fr.result, true))
            //   console.log(b256(fr.result, true));
        }
    };

    fr.readAsText(fileData);

});
