## Installation
```
npm i @bellpetchpol/thailand-billpayment-txt-to-object
```

## Example
```
import { b256 } from '@bellpetchpol/thailand-billpayment-txt-to-object'
var textReadFromFile // Should read input file
console.log(b256(textReadFromFile, true))

// you can adjust carriage return digit the default value is 1
// you might need this when read text file from ISO8859-11 encoding
console.log(b256(textReadFromFile, true, 2))
```

## Functions
| name  | description |
| ------------- | ------------- |
| b256  | สำหรับ text file ที่ข้อมูลแต่ละส่วนมีจำนวนตัวอักษร 256 ตัว  |
| b450  | สำหรับ text file ที่ข้อมูลแต่ละส่วนมีจำนวนตัวอักษร 450 ตัว  |