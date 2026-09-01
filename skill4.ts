// ---- Wrap It Up ----

const wrapInArray = <T>(item: T): T[] => {
return [item];
}

console.log(wrapInArray("cat"));
console.log(wrapInArray(3));




// ---- First in Line ----

const firstItem = <T>(array: T[]) => {
    return array[0];
}
console.log(firstItem([1, 2, 3]));
console.log(firstItem(["a", "b", "c"]));