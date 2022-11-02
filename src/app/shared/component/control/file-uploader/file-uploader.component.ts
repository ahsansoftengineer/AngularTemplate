import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { DIFiles } from 'src/app/core/interface/common/di-files';
import { BaseControlComponent } from '../base-control-z.component';

@Component({
  selector: 'di-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent extends BaseControlComponent implements OnInit{
  @Input() fileObj : DIFiles;
  @Input() imgURL;
  @Output() fileUploaded = new EventEmitter<{ object: DIFiles, outerEvent, innerEvent }>();
  @Input('submitted') _submitted;

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  readUrl(event: any) {
    if (event.target.files.length === 0) {
      this.fileObj.link = '';
      this.fileObj.error = 'req'
      this.fileObj.uploadedFileName = undefined
      return;
    }
    const file: File = event.target.files[0];
    const name = file.name;
    this.fileObj.error = '';
    const ext = name.substring(name.lastIndexOf('.') + 1, file.name.length);
    if (this.fileObj.fileExtens.indexOf(ext.toLowerCase()) < 1) {
      this.fileObj.error = 'type';
      this.fileObj.link = '';
      this.fileObj.uploadedFileName = undefined
    }
    if (file.size > this.fileObj.size) {
      this.fileObj.error = 'size';
      this.fileObj.link = '';
      this.fileObj.uploadedFileName = undefined
    }
    if (this.fileObj.error == '') {
      this.fileObj.size = file.size;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      this.fileUploaded.emit(event)
      reader.onload = () => {
        this.fileObj.link = this.fileObj.defaultImage;
        this.fileObj.file = event.srcElement.files[0];
        this.fileObj.uploadedFileName = event.srcElement.files[0].name;

      };
    }
  }

  ImageLink(){
    if(this.fileObj.link == this.fileObj.defaultImage){
      return  'assets/images/' + this.fileObj.defaultImage;
    }
    else return 'assets/images/gif/upload.gif'
  }

  markTouched(){
    this._submitted = true;
  }

  _error_file(file: DIFiles) {
    if (file.error === 'type') return file.fileExtensMsg;
    else if (file.error === 'size')   {
      if(this._translate.currentLang === 'en'){
        return `${file.lbl} size is greater than ${file.sizeMsg}`;
      }else if(this._translate.currentLang === 'ur'){
        return  ' '.concat(
          this._translate?.instant(file?.lbl),
          ' ', 'کا سائز', file.sizeMsg, 'سے بڑا ہے' )

      }
      return 'File Size is Greater than 2MB';
      return
    }
    else if (file.error === 'req') {
      return this.getMessage(file.lbl)
    }
    else if (file.error !== '' && this._submitted) return file.error
    else if ((!file.link || file.link == '') && this._submitted) {
      return this.getMessage(file.lbl)
    }
    else return '';
  }
  getMessage(lbl){
    if(this._translate.currentLang === 'en'){
      return 'Please select ' + lbl;
    }else if(this._translate.currentLang === 'ur'){
      return  ' براہ کرم'.concat(' ', this._translate?.instant(lbl), ' ', 'منتخب کریں۔')
    }
  }
}
