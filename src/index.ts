import b256 from "./mapper/b256";

import { scbTestData, bblTestData, uobTestData, ktbTestData } from "./fixture";

const result = b256.readFromString(scbTestData, true);
console.log("scb ", result);

const result_bbl = b256.readFromString(bblTestData, true);
console.log("bbl ", result_bbl);

const result_uob = b256.readFromString(uobTestData, true);
console.log("uob ", result_uob);

const result_ktb = b256.readFromString(ktbTestData, true);
console.log("ktb ", result_ktb);
