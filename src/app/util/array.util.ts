export class ArrayUtil {

    constructor() {

    }

    public static push(array: any[], value: any) {
        if (!array) return;

        for (let i = 0; i < array.length; i++) {
            if (array[i] == value) {
                return;
            }
        }

        array.push(value);
    }

    public static remove(array: any[], value: any) {

        if (!array) return;

        for (let i = 0; i < array.length; i++) {
            if (array[i] == value) {
                array.splice(i--, 1);
                return;
            }
        }
    }
}
