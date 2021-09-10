import generator from 'generate-password'


const len= Math.floor(Math.random() * (15 - 10) + 10)
console.log(len)
const password = generator.generate({
	length: len,
	numbers: true,
   uppercase:true,
   lowercase:true,
   symbols:true,
   strict: true
});

export default password