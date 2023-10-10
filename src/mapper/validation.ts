import { Section } from "../interface/base";

const textToSection = (text: string, sectionLength: number): Section => {
  const minimumLength = sectionLength * 3;
  const textLength = text.length;
  if (textLength < minimumLength) {
    throw new Error(
      `the string length should be more than or equal ${minimumLength}`
    );
  }
  const headerText = text.substring(0, sectionLength);
  const footerStartFrom = textLength - sectionLength;
  const footerText = text.substring(footerStartFrom);
  const detailText = text.substring(sectionLength, footerStartFrom);
  if (headerText.substring(0, 1) != "H") {
    throw new Error("The first character of header should be 'H'");
  }
  if (detailText.substring(0, 1) != "D") {
    throw new Error("The first character of details should be 'D'");
  }
  if (detailText.length % sectionLength != 0) {
    throw new Error(
      `The details length should not have any reminder when mod by ${sectionLength}`
    );
  }
  if (footerText.substring(0, 1) != "T") {
    throw new Error("The first character of footer should be 'T'");
  }
  const result: Section = {
    header: headerText,
    detail: detailText,
    footer: footerText,
  };
  return result;
};

export {
  textToSection,
};
