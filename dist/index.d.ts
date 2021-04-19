interface TempData {
    cpu: number;
    gpu: number;
}
export declare const getTemps: () => Promise<TempData>;
export {};
