import { Component, Input } from '@angular/core';
import { ReqUrl } from 'src/app/setting/domain/req-url';
import { SettingService } from 'src/app/setting/setting.service';
import { ValidationData } from 'src/app/setting/domain/validation-data';
import { SettingUrlTree } from 'src/app/setting/url-detail/setting-url-tree';
import { TreeNode, SelectItem } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { StrObj } from '../../domain/str-obj';
import { ValidationRule } from '../../domain/validation-rule';
import { CookieStoreService } from '../../../util/cookie-store';



@Component({
  selector: 'app-validation-data',
  templateUrl: './validation-data.component.html',
  styleUrls: ['./validation-data.component.css']

  
})
export class ValidationDataComponent  {

  @Input() reqUrl: ReqUrl;
  @Input() paramType:string;

  validationDataList: ValidationData[];

  hiddenTap:string[]=[];

  saving=false;
  map: SettingUrlTree[];
  trees: SettingUrlTree[];
  treeList: TreeNode[];

  titleRules:ValidationRule[]= [];

  selectTypes:SelectItem[] =[ 
    {label:'String', value:'String'},
    {label:'Integer', value:'Integer'},
    {label:'List', value:'List'},
    {label:'Object', value:'Object'}
  ];

  constructor(private settingService: SettingService, private cookieStore:CookieStoreService) { 
    
  }

  updateType(data:ValidationData, type:string ){
    if(type == 'List') {
      data.typeClass = 'java.util.List'
    }
    else{
      data.typeClass ='java.lang.' + type;
    }
  }

  private getUniqueKey() {
    return this.paramType +":" + this.reqUrl.method + ":" + this.reqUrl.url;
  }

  cookieInit(){
    this.hiddenTap = this.cookieStore.getData(this.getUniqueKey());
    if(!this.hiddenTap){
        this.hiddenTap = [];
    }
  }
  updateHiddenTap(tab: string, add: boolean) {
    this.hiddenTap = this.hiddenTap.filter(ht => ht != tab);
    if (add) {
      this.hiddenTap.push(tab)
    }
    console.log(this.hiddenTap)

    this.cookieStore.setData(this.getUniqueKey(), this.hiddenTap);

  }

  addTree(body: ValidationData):SettingUrlTree{
    let t = new SettingUrlTree(body);
    if (body.parentId) {
      this.map.find(t => t.data.id == body.parentId).addChild(t);
    }
    else {
      this.trees.push(t);
    }
    return t ;

  }
  treeInit() {
    this.trees=[]; this.map=[];

    this.validationDataList.forEach(body => {
      this.map.push(this.addTree(body));
    })

    this.treeList = this.trees as TreeNode[];
  }

  refresh(){
    this.reqUrl = null;
    this.treeList =null;
    this.trees=null;
    this.validationDataList = null;
  }


  strsToObjs(strs:string[]):StrObj[]{
    if (!strs) { strs = ['']  }
    return strs.map(str => new StrObj(str));
  }
  objsToStrs(objs:StrObj[]):string[]{
    return objs.filter(obj=> obj.value).map(obj=> obj.value);
  }

  strObjsInit(vd:ValidationData ){
    let rules:ValidationRule[] = vd.validationRules.filter(vr=> vr.standardValueType == 'LIST')
    if(rules){
      rules.forEach(rule =>{
        rule.standardValueStrObjs = this.strsToObjs(rule.standardValue);
      })
    }
  }

  isViewInputBox(vd: ValidationData, vr: ValidationRule) {
    if (vd.number && vr.assistType.number){
        return true;
    }
    else if(vd.type =='String' && vr.assistType.string){
      return true;
    }
    else if( vd.list && vr.assistType.list){
      return true;
    }
    else if(vd.obj && vr.assistType.obj){
      return true;
    }
    else if (vd.enumType && vr.assistType.enumType) {
      return true;
    }
    return false;
  }

  refreshUrl(url: ReqUrl) {
    this.reqUrl = url;
    this.trees = [];
    this.settingService.getValidationDataList(this.paramType, this.reqUrl).subscribe(res => {
      console.log ( "refresh Url : ")
      console.log(res)
      this.validationDataList = res.sort( ( a,b) => a.id < b.id? 1 :-1).sort( ( a,b) => a.deepLevel < b.deepLevel ? -1 :1);

      if(this.validationDataList && this.validationDataList.length > 0 ){
        this.titleRules = this.validationDataList[0].validationRules;
      }

      this.validationDataList.forEach(vd => {
        this.strObjsInit(vd)
      })
      this.treeInit();
      this.cookieInit();

    },
    error=>{
      if (error.status == 401) {
        window.location.reload();
      }
    }
  )
  }

  save(){
    if(this.validationDataList.find(vd => !vd.name)){
      alert("[ERROR] Name field must set not empty string")
      return;
    }


    this.saving = true;

    this.settingService.deleteAll(this.validationDataList.filter(d => d.del)).subscribe(res => {
      this.settingService.updateValidationDataList(this.validationDataList).subscribe(res => {

        this.refreshUrl(this.reqUrl);
        alert("Saved")
        this.saving = false;
      })
    }, error => {
      if (error.status == 401) {
        window.location.reload();
      }
    } )
  }
  getRuleFromName(data:ValidationData, ruleName:string){
    return data.validationRules.find(vr => vr.ruleName == ruleName );
  }

  getRule(data:ValidationData, rule:ValidationRule){
    return this.getRuleFromName(data, rule.ruleName);
  }

  parentDependencyCheck(data:ValidationData, rule: ValidationRule, checked: boolean) {
    if( !rule.parentDependency){ return; }
    if (checked && data.parentId) {
      let parent = this.validationDataList.find(d => d.id == data.parentId);
      let parentRule = this.getRule(parent, rule);
      parentRule.use = true;
      this.parentDependencyCheck(parent,rule, checked);
      return;
    }

    let childs = this.validationDataList.filter(d => d.parentId == data.id);
    if (!checked && childs) {
      childs.forEach(child => {
        let childRule = this.getRule(child, rule);
        childRule.use = false;
        this.parentDependencyCheck(child, rule,  checked); 
      })
      return;
    }
  }
 
  overlayBanRuleCheck(data: ValidationData, rule: ValidationRule, checked: boolean) {
    if( !rule.overlapBanRuleName){ return; }
    if(checked && rule.overlapBanRuleName){
      let banRule = this.getRuleFromName(data, rule.overlapBanRuleName );
      if(banRule && banRule.use){
          banRule.use = false;
      }
    }
  }
  checkBoxChange(data: ValidationData, rule: ValidationRule, checked: boolean) {
    this.parentDependencyCheck(data, rule, checked);
    this.overlayBanRuleCheck(data, rule, checked);
    console.log(rule)
  }
  delCheck(data: ValidationData) {
    data.del = true;

    let childs = this.validationDataList.filter(d => d.parentId == data.id);

    if (childs) {
      childs.forEach(child => {
        child.del = true;
        this.delCheck(child)
      })
    }
  }
  minus(data:ValidationData){
    this.delCheck(data);
  }
  copy(parent:ValidationData){
    let newData = new ValidationData();
    newData.reqUrl = this.reqUrl;
    
    newData.deepLevel = parent == null ? 0 : parent.deepLevel +1;
    newData.name = ''
    newData.url = this.reqUrl.url;
    newData.method = this.reqUrl.method;
    newData.paramType = this.paramType;
    newData.type = 'String';
    newData.typeClass = 'java.lang.String';
    newData.parentId = parent == null ? null : parent.id;

    this.validationDataList.push(newData)
    this.treeInit();
  }

  isHidden(name:string):boolean{
    if(!this.hiddenTap){ return false; }
    return this.hiddenTap.find(ht => ht == name) ? true : false;
  }

}
