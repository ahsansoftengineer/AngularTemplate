import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { BaseJoinAction } from 'src/app/class/base-join-actions';
import { HttpServiceParam } from 'src/app/interface/common/http-service-param';
import { Custom } from 'src/app/static/custom';
@Component({
  template: '',
})
//Dropdown
export class BaseControlComponent extends BaseJoinAction  implements OnInit {
  // Service Injection
  // Local Properties
  control: FormControl; // #Furture field
  defaultParam:  HttpServiceParam = { query:{ is_active:1}}
  errMsg: string;
  public _lang : string;
  // Properties provided by Parent
  @Input() field = ''; // #Furture control
  @Input() lbl = '';
  @Input() req = true;
  @Input() group: FormGroup; // #Furture groupName
  @Input() groupName; // #Future group
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() hide = false;
  @Input() param: HttpServiceParam = {};
  @Output() valueChanges: EventEmitter<string> = new EventEmitter();
  @Output() Blur: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this._lang = this._translate.currentLang;
    if(!this.control){
      this.set_Control(
        this.group,
        this.groupName,
        (group) => {
          this.control = group?.get(this.field) as FormControl;
          this.handleAfterSetControl()
      })
    }else {
      this.handleAfterSetControl()
    }
    const subs = this._translate.onLangChange.pipe(debounceTime(100)).subscribe((lng)=>{
        this._lang = lng.lang;
        (this.control?.statusChanges as EventEmitter<any>)?.emit(this.control.status);
    })
    this.subscriptionArray.push(subs);
  }
  // For Setting (Self, Parent & Child) Controls
  set_Control(
    group: FormGroup,
    groupName: string,
    setControlAction: (group: FormGroup) => void
  ){
    if (groupName) {
      group = this._fs._form.get(this.groupName) as FormGroup;
    } else if (!group && !groupName && !this.group) {
      group = this._fs._form as FormGroup;
    } else if (!group && !groupName && this.group) {
      group = this.group
    }
    // Without this the this.group won't set
    if(!this.group){ this.group = group}
    if(group){ setControlAction(group)}
  }
  handleAfterSetControl(){
    this.valueChangesSubscription();
    this.statusChangesSubscription();
    if(this.control && !this.control?.value) this.control?.patchValue(null)
  }
  _stop(event){
    event.stopPropagation()
  }
  emptyCheck(val: any){
    return Custom.emptyCheck(val)
  }
  statusChangesSubscription(){
    const subs = this.control?.statusChanges?.subscribe(() => {
      this.errMsg = this._vs.handleRequired(this?.control);
    })
    this.subscriptionArray.push(subs);
  }


  mergeParam(providedParameters: HttpServiceParam = this.param) {
    const query = { ...this.defaultParam?.query, ...providedParameters?.query };
    return { ...this.defaultParam, ...providedParameters, query };
  }
  valueChangesSubscription(){
    const subs = this.control?.valueChanges?.subscribe(val => {
      this.valueChanges.emit(val)
    })
    this.subscriptionArray.push(subs);
  }
}
export const CONTROL_HOST_CSS_CLASS =  'col-lg-3 col-md-4 p-0';
