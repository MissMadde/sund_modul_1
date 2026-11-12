import { describe, test, expect } from "vitest";
import { PizzaTypeSchema, PizzaSchema, AmountSchema, OrderIdSchema } from "./pizzashop";

describe("Pizza Schema Unit Tests", () => {

test("PizzaTypeSchema parses valid lowercase pizza type", () => {
    const result = PizzaTypeSchema.parse("margherita");
    expect(result).toBe("margherita");
  });

test("PizzaTypeSchema throws for capitalized pizza type", () => {
    expect(() => PizzaTypeSchema.parse("Margherita")).toThrow();
  });

  test("PizzaSchema parses valid pizza object", () => {
    const input = { type: "pepperoni", price: 120 };
    const result = PizzaSchema.parse(input);
    expect(result).toEqual(input);
  });

  test("PizzaSchema throws when price is missing", () => {
    expect(() => PizzaSchema.parse({ type: "pepperoni" })).toThrow();
  });

  test("AmountSchema throws when given a string instead of a number", () => {
    expect(() => AmountSchema.parse("100")).toThrow();
  });

  test("OrderIdSchema accepts 0 and returns it", () => {
    const result = OrderIdSchema.parse(0);
    expect(result).toBe(0);
  });





});