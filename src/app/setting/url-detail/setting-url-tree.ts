
import { TreeNode } from 'primeng/api';
import { ValidationData } from 'src/app/setting/domain/validation-data';

export class SettingUrlTree implements TreeNode{
    label: string;
    data: ValidationData;
    icon: any;
    expandedIcon: any;
    collapsedIcon: any;
    children: SettingUrlTree[];
    leaf: boolean;
    expanded: boolean;
    type: string;
    parent: TreeNode;
    partialSelected: boolean;
    styleClass: string;
    draggable: boolean;
    droppable: boolean;
    selectable: boolean;

    constructor(validationData:ValidationData){
        this.data = validationData;
    }

    public addChild(child:SettingUrlTree){
        if ( !this.children){ this.children = []; }

        this.children.push(child);
        child.parent = this;
    }
}
