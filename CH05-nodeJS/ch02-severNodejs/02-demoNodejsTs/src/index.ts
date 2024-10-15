const fullName: String = 'Điệp đẹp trai'

console.log(fullName)

type Handle = () => Promise<String>

const handleF: Handle = () => Promise.resolve(fullName + 'Ahihi')

handleF().then((value) => {
  console.log(value)
})

let person : {name: String, age: number} = {
    name: 'Điêp',
    age: 15
}