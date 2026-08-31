// Skill 1
// 1,

const firstName: string = "Madde";
const age: number = 38;
const isEnrolled: boolean = true;

const describeStudent = (firstName: string, age: number): string => {
return `${firstName} is ${age} years old.`;
}

console.log(describeStudent(firstName, age));

// 2,

const formatGreeting = (name: string, formal?: boolean): string => {
    return `${formal? "Good Day": "Hi"} ${name}`;
}

console.log(formatGreeting("Anna", true));
console.log(formatGreeting("Britta", false));

// Skill 2
// 1,

let ages: number[] = [3, 5, 9, 11, 7];

const agesInFiveYear: number[] = ages.map((n) => n + 5);

console.log(ages);
console.log(agesInFiveYear);

// 2,

const names: string[] = ["Anna", "Lisa", "Elisabeth", "Rosanna", "Erik", "Jonathan"];

const shortNames: string[] = names.filter(name => name.length > 4);

console.log(shortNames);

// Skill 3
// 1,

interface Book {
    title: string,
    author: string,
    pages: number
}

const books: Book = {
    title: "The Celestine prophecy",
    author: "James Redfield",
    pages: 300
}
console.log(books.title);

// 2, 

interface Address {
    city: string,
    postalCode?: string
}

interface Person {
    name: string,
    age: number,
    address: Address
}

const persons: Person[] = [
    { name: "Anna", age: 35, address: { city: "Stockholm", postalCode: "250 00"}},
    { name: "Daniel", age: 37, address: { city: "Helsingborg"}},

]
console.log(persons[0]?.address.city);
console.log(persons[1]?.address.city);

// Skill 4
// 1, 

interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
}

const products: Product[] = [
  { id: 1, name: "Läderkoppel", price: 350, tags: ["promenad", "läder"] },
  { id: 2, name: "Reflexhalsband", price: 180, tags: ["promenad", "säkerhet"] },
  { id: 3, name: "Ergonomisk sele", price: 650, tags: ["promenad", "sele"] },
  { id: 4, name: "Ortopedisk hundbädd", price: 1400, tags: ["vila", "hem"] },
  { id: 5, name: "Interaktiv aktiveringsleksak", price: 290, tags: ["leksaker", "aktivering"] }
];

const cheapProducts = products.filter(product => product.price < 1000);

console.log(cheapProducts);
