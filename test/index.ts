import pipe from "..";

export const map = function <T>(arr: Array<T>, cb: Parameters<Array<T>["map"]>[0]): unknown {
    return Array.prototype.map.call(arr, cb);
}

console.log(
    pipe([1, 2, 3])
        .pipe(map, (v: number) => v * 2)
        .pipe((arr: number[]) => [...arr, 40])
        .execute()
)

console.log(map([1, 2, 3], (v) => v * 2));
console.log(pipe([1, 2, 3]).execute())