import { describe, test, expect } from "vitest";
import { findBook, checkOutBook } from "./library";

describe("Library findBook Unit Tests", () => {
  test("findBook returns dune with correct copies", () => {
    const book = findBook("dune");
    expect(book).toEqual({ title: "dune", copiesAvailable: 3 });
  });

  test("findBook returns foundation even though copiesAvailable is 0", () => {
    const book = findBook("foundation");
    expect(book).toEqual({ title: "foundation", copiesAvailable: 0 });
  });

  test("findBook throws for unknown book title", () => {
    expect(() => findBook("harry potter")).toThrow();
  });

  test("findBook throws for invalid type (number)", () => {
    expect(() => findBook(42)).toThrow();
  });


});

describe("Library checkOutBook Unit Tests", () => {
  test("checkOutBook returns a number", () => {
    const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });
    expect(typeof loanId).toBe("number");
  });

  test("checkOutBook returns a whole number", () => {
    const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });
    expect(Number.isInteger(loanId)).toBe(true);
  });

  test("checkOutBook returns a number between 1000 and 9999", () => {
    const loanId = checkOutBook({ title: "dune", copiesAvailable: 3 });
    expect(loanId).toBeGreaterThanOrEqual(1000);
    expect(loanId).toBeLessThanOrEqual(9999);
  });

  test("checkOutBook throws 'No copies available' when copiesAvailable is 0", () => {
    expect(() =>
      checkOutBook({ title: "foundation", copiesAvailable: 0 })
    ).toThrow("No copies available");
  });

  test("checkOutBook throws for an object without copiesAvailable", () => {
    expect(() => checkOutBook({ title: "dune" })).toThrow();
  });
});


describe("Library registerLoan Unit Tests", () => {
  test("registerLoan returns a valid Loan object", () => {
    const loan = registerLoan(1234, "dune", 7);
    expect(loan).toEqual({ loanId: 1234, title: "dune", memberId: 7 });
  });

  test("registerLoan throws when memberId is 0", () => {
    expect(() => registerLoan(1234, "dune", 0)).toThrow();
  });

  test("registerLoan throws when title is not in the catalogue", () => {
    expect(() => registerLoan(1234, "harry potter", 7)).toThrow();
  });
});