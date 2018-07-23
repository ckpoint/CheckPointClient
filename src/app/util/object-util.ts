export class ObjectUtil {

    public static deepCopy(origin:any){
        return JSON.parse(JSON.stringify(origin));
    }
}
