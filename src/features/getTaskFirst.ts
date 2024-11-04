export const getTaskFirst = (num: number) => {
    num = Math.abs(num)
    let ending = Math.abs(num % 100);
    if (ending > 10 && ending < 20) {
        return num + " компьютеров"
    }
    ending = ending % 10;
    if (ending === 1) {
        return num + " компьютер"
    } else if (ending === 2 || ending === 3 || ending === 4) {
        return num + " компьютера"
    } else {
        return num + " компьютеров"
    }

}
