import { Component, Injector, Input, OnInit } from '@angular/core';
import { ImgType } from 'src/app/core/interface/common/img-type';
import { BaseControlComponent } from '../base-control-z.component';

@Component({
  selector: 'di-img',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  host: { class: 'col-lg-3 col-md-4 py-0 px-3' },
})
export class ImageComponent extends BaseControlComponent implements OnInit{
  @Input() imgType : ImgType;
  @Input() imgURL;
  @Input('submitted') _submitted;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    if(this.lbl != undefined && this.lbl != ''){
      this.imgType.display = this.lbl;
    }
    else{
      this.imgType.display = this.imgType.display;
    }
  }

  readUrl(event: any) {
    if (event.target.files.length === 0) {
      this.imgType.link = '';
      this.imgType.error = 'req'
      return;
    }
    const file: File = event.target.files[0];
    const name = file.name;
    this.imgType.error = '';
    const ext = name.substring(name.lastIndexOf('.') + 1, file.name.length);
    if ('jpeg jpg png jfif'.indexOf(ext.toLowerCase()) < 1) {
      this.imgType.error = 'type';
      this.imgType.link = '';
    }
    if (file.size > 2000000) {
      this.imgType.error = 'size';
      this.imgType.link = '';
    }
    if (this.imgType.error == '') {
      this.imgType.size = file.size;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgType.link = _event.target.result;
        this.imgType.file = event.srcElement.files[0];
        this.imgType.name = event.srcElement.files[0].name;
      };
    }
  }

  ImageLink(){
    if(this.imgType?.link?.length > 200) return this.imgType.link
    else if(this?.imgType?.link) return this.imgURL + this.imgType.link
    else return 'assets/images/gif/upload.gif'
  }

  markTouched(){
    this._submitted = true;
  }

  _error_image(img: ImgType) {
    if (img?.error === 'type') {
      return 'Only jpeg | jpg | jfif & png are allowed';
    } else if (img?.error === 'size') {
      return 'Image Size is Greater than 2MB';
    } else if ((!img?.link || img?.link == '') && this._submitted) {
      if(this._translate.currentLang === 'en'){
        return 'Please select ' + img?.display;
      }else if(this._translate.currentLang === 'ur'){
        return  ' براہ کرم'.concat(' ', this._translate?.instant(img?.display), ' ', 'منتخب کریں۔')
      }
    } else return '';
  }
}
