import { StrObj } from "./str-obj";
import { AssistType } from "./assist-type";

export class ValidationRule {
    ruleName:string;
    use:boolean;
    parentDependency:boolean;
    overlapBanRuleName:string;
    standardValueType:string;
    standardValue:any;
    standardValueStrObjs:StrObj[];

    assistType:AssistType;
}
