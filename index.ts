// type RemoveFirstArg<F, P extends unknown[]> = F extends (x: any, ...args: P) => P ? P : never;
// type FuncArg<F extends Function, P extends unknown[]> = RemoveFirstArg<F, P>;
type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(
    func: X,
    ...params: P
) => {
    execute: () => ReturnType<X>;
    pipe: Pipe;
};

export default function pipe<T extends Array<any>>(value: T): {
    execute: () => T;
    pipe: Pipe;
} {
    let functions: ((...args: any[]) => any)[] = [];
    let params: Array<any>[] = [];
    function execute() {
        return functions.reduce((prev, curr, idx) => curr(prev, ...params[idx]), value);
    }

    function pipe<X extends (...args: any[]) => ReturnType<X>, P extends T>(func: X, ...param: P) {
        functions.push(func);
        params.push(param);
        return {
            execute,
            pipe
        };
    };

    return { execute, pipe: pipe as Pipe };
}