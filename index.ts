type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(
    func: X,
    ...params: P
) => {
    execute: () => Promise<ReturnType<X>>;
    pipe: Pipe;
};

export default function pipe<T>(value: T): {
    execute: () => Promise<T>;
    pipe: Pipe;
} {
    let functions: (((...args: any[]) => any) | ((...args: any[]) => Promise<any>))[] = [];
    let params: Array<any>[] = [];
    async function reduce() {
        let result: T = value;
        for (const idx in functions) {
            let v = functions[idx](result, ...params[idx]);
            if (v instanceof Promise)
                v = await v;
            result = v;
        }
        return result;
    }

    async function execute() {
        return await reduce();
    }

    function pipe<X extends (...args: any[]) => ReturnType<X>, P extends T[]>(func: X, ...param: P) {
        functions.push(func);
        params.push(param);
        return {
            execute,
            pipe
        };
    };

    return { execute, pipe: pipe as Pipe };
}