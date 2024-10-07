
// generics

function myFunciton<T>(myData:T):T{
    return myData
}

const myout= myFunciton<number>(938)
const myout1 = myFunciton<string>("this is string")
console.log("the out put from the generics",myout)
console.log("the out put from the generics",myout1)



// generics for interface

interface MyGeneric<T>{

    constent:T
}

const mygen1 :MyGeneric<string> = {constent:"hellow world"}

const mygen2:MyGeneric<number>={constent:98878}
console.log(mygen2)