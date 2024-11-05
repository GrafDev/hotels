export const getTaskFourth = (() => {
    let prevNum: number | null = null;
    let prevResult: string | null = null;

    return (num: number) => {
        if (prevNum === 0) return null;
        if (prevNum !== num) {
            const arr: number[][] =
                Array.from({length: num}, (_, i) =>
                    Array.from({length: num}, (_, j) => (i + 1) * (j + 1))
                );
            prevNum = num;
            const maxNum = num * num;
            const maxLength = maxNum.toString().length;
            // console.log(arr)
            const result = arr
                .map(row =>
                    row.map(num =>
                        num.toString().padStart(maxLength, ' ')
                    ).join(' ')
                )
                .join('\n');
            console.log(result)
            prevResult = result
            return result
        } else {
            return prevResult
        }
    }
})();
