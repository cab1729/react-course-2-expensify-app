// const person = {
//     name: 'cab1729',
//     age: 2000,
//     location: {
//         city: 'Hoboken',
//         temp: 63
//     }
// };

// const { name, age } = person;

// console.log(`${name} is ${age}`);

// const { city, temp } = person.location;
// console.log(`It's ${temp} in ${city} `)

// const book = {
//     title: 'Suck My Big Cuban Dick',
//     author: 'cab1729',
//     publisher: {
//         name: 'Big Cuban Dick Books'
//     }
// };

// const { name: publisherName = 'Self-published' } = book.publisher;
// console.log(publisherName);

// const address = ['51 Harrison St', 'Hoboken', 'NJ', '07030'];
// const [street, city, state, zip] = address;
// console.log(`You are in ${city} ${state}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [name,,mprice,] = item;

console.log(`A medium ${name} costs ${mprice}`);