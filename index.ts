// type RemoveFirstArg<F, P extends unknown[]> = F extends (x: any, ...args: P) => P ? P : never;
// type FuncArg<F extends Function, P extends unknown[]> = RemoveFirstArg<F, P>;
type Pipe = <X extends (...args: any[]) => ReturnType<X>, P extends unknown[]>(
    func: X,
    ...params: P
) => {
    value: ReturnType<X>;
    pipe: Pipe;
};

export default function pipe<T>(value: T[]): {
    value: T[];
    pipe: Pipe;
} {
    function pipe<X extends (...args: any[]) => ReturnType<X>, P extends T[]>(func: X, ...params: P) {
        let _value: ReturnType<X> = func(value, ...params);
        value = _value as T[];
        return {
            value: _value,
            pipe
        };
    };

    return { value, pipe: pipe as Pipe };
}