
export const getTaskThird = (num1: number, num2: number) => {
    if (num1 === num2) return "Числа равны"
    if (num1<0 || num2<0) return "Введите положительное число"
    const isSimpleNumber = (num: number) => {
        if (num <= 1) return false
        if (num === 2) return true
        if (num % 2 === 0) return false
        const sqrtNumb = Math.sqrt(num)

        for (let i = 3; i <= sqrtNumb; i += 2) {
            if (num % i === 0) {
                return false
            }
        }
        return true
    }



    const arrSimpleNumber= []
    const n1 = Math.abs(num1)
    const n2 = Math.abs(num2)

    for (let i = n1; i <= n2; i++) {
        if (isSimpleNumber(i)) arrSimpleNumber.push(i)
    }
    return arrSimpleNumber.length!==0?`${arrSimpleNumber.join(',')}`:"Нет простых чисел в данном диапазоне"
}
