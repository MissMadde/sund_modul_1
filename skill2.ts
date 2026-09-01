// ---- Book Interface ----

interface Book {
    title: string,
    pages: number,
}

const book: Book = {
    title: "Dune",
    pages: 300
}

const describeBook = (book : Book) : string => {
    return `The book ${book.title} has ${book.pages} pages.`;
}

console.log(describeBook(book));




//  ---- Combining Interfaces ----

interface Teacher {
    name: string,
    subject: string
}

interface Employee {
    id: number,
    email: string

}

type SchoolTeacher = Teacher & Employee;

const myTeacher: SchoolTeacher = {
    name: "Anna",
    subject: "History",
    id: 3,
    email: "anna.historyteacher@gmail.com"
};

const printTeacherInfo = (teacher : SchoolTeacher) => {
console.log(`My teacher ${teacher.name}, with ID: ${teacher.id} and email: ${teacher.email} is teaching in the subject ${teacher.subject}.`);
}

printTeacherInfo(myTeacher);