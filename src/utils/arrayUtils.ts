type TabulateCallback<T> = (index: number) => T;

export class Arrays {
    static tabulate = <T>(count: number, mapFn: TabulateCallback<T>): T[] => {
        return [...new Array(count)].map((_, index) => mapFn(index));
    };
}
