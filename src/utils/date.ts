const stringToIsoDateString = (text: string): string => {
  if (text.length != 8) {
    throw new Error("The date string length should be 8");
  }
  const day = text.substring(0, 2);
  const month = text.substring(2, 4);
  const year = text.substring(4, 8);
  return year + "-" + month + "-" + day;
};

export {
    stringToIsoDateString
}
