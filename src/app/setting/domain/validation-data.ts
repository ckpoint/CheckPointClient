import { ReqUrl } from "src/app/setting/domain/req-url";
import { StrObj } from "./str-obj";
import { ValidationRule } from "./validation-rule";

export class ValidationData {

    id:number;

    reqUrl:ReqUrl;
    parentId:number;
    name:string;

    paramType:string;
    url:string;
    method:string;

    type:string;
    typeClass:string;

    deepLevel:number;
    del:boolean;

    obj:boolean;
    list:boolean;
    number:boolean;
    enumType:boolean;

    validationRules:ValidationRule[];

}
