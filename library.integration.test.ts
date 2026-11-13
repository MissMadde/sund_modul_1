import { describe, test, expect } from "vitest";
import { borrowBook } from "./library";

describe("Library borrowBook Integration Tests", () => {
  test("borrowBook returns a valid loan for an available book", () => {
    const loan = borrowBook("dune", 7);

    expect(loan.title).toBe("dune");
    expect(loan.memberId).toBe(7);
    expect(typeof loan.loanId).toBe("number");
    expect(loan.loanId).toBeGreaterThanOrEqual(1000);
    expect(loan.loanId).toBeLessThanOrEqual(9999);
  });

  test("borrowBook throws 'No copies available' when book has 0 copies", () => {
    expect(() => borrowBook("foundation", 7)).toThrow("No copies available");
  });

  test("borrowBook throws when memberId is negative", () => {
    expect(() => borrowBook("dune", -1)).toThrow();
  });
});