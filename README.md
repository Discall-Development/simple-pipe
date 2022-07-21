# simple-pipe
a simple pipe function

## Install
```
npm i @discall/simple-pipe
```

## Usage
```ts
import pipe from "@discall/simple-pipe";

export const map = function <T>(arr: Array<T>, cb: Parameters<Array<T>["map"]>[0]): unknown {
    return Array.prototype.map.call(arr, cb);
}

pipe([1, 2, 3, 4, 5, 6, 7]) // [1, 2, 3, 4, 5, 6, 7]
    .pipe(map, v => v * 3) // [3, 6, 9, 12, 15, 18, 21]
    .pipe(map, v => v + v % 2) // [4, 6, 10, 12, 16, 18, 22]
    .execute()
```