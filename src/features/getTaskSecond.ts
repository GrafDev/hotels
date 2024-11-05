export const getTaskSecond = (num: string) => {
    if (num === "") return [];
    const numbers = num.split(',').map(Number).sort((a, b) => b - a);

    if (numbers.length === 1) {
        const _divisors: number[] = [];
        for (let i = 1; i <= Math.abs(numbers[0]); i++) {
            if (numbers[0] % i === 0) {
                _divisors.push(i);
            }
        }
        return _divisors;
    }

    const divisors: number[] = [];
    for (let i = 1; i <= Math.abs(numbers[0]); i++) {
        if (numbers[0] % i === 0) {
            divisors.push(i);
        }
    }
    const arr = divisors.filter(divisor =>
        numbers.every(num => num % divisor === 0)
    );

    const sortedDivisors = arr.sort((a, b) => b - a).join(',');
    console.log(`"Это ${sortedDivisors} общие делители элементов массива ${num}`);
    return sortedDivisors

}
