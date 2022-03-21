import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interface/user';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {
userData!:User

fileObj!: File;
fileUrl!: string;
errorMsg!: boolean
userPic!: any;
  htmlString?: any;
constructor(public auth :AuthService,private sanitizer:DomSanitizer) { 
}

getSantizeUrl(url : string) { 
  return this.sanitizer.bypassSecurityTrustUrl(url); 
}

  ngOnInit(): void {
    let id = JSON.parse(atob(localStorage.getItem('access_token')!.split('.')[1]));
    id = id._id
    console.log(id);
    
    
    this.auth.getUser(id).subscribe({
      next:(u) => {
        this.userData = u
        console.log(u.pic);
        
        
        //user has set profile image
        if(u.pic != "default"){
console.log(1);

          this.auth.getPic(u._id).subscribe({
            next:(u)=>{
              Object.entries(u).forEach(entry => {
                this.userPic = entry[1]
                this.userPic = this.userPic.substring(1)
                localStorage.setItem('profileURL',this.userPic)
                console.log(this.userPic);
                
              })
            }
          })
        
        
        }
        //no pic url then set to the default image
        else{
          console.log(2);
          
          this.userPic = '../../assets/default_pic.png'
        } 

        
      }
    })
     
  }
  updatePic(){
    window.location.reload()
  }


  onFilePicked(event: Event): void {

    this.errorMsg = false
 
    let FILE = (event.target as HTMLInputElement).files![0]
    this.fileObj = FILE;

    //rename the image to match the user id
    let id = JSON.parse(atob(localStorage.getItem('access_token')!.split('.')[1]));
    id = id._id
    this.fileObj = new File([this.fileObj], `${id}.png`, {type: this.fileObj.type});

    if (!this.fileObj) {
      this.errorMsg = true
      return
    }

    //upload file to s3
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
  
    console.log(this.fileObj);
    
    this.auth.uploadPic(fileForm).subscribe({
      next:(res)=>{
        localStorage.setItem('profileURL',this.userPic)
      },
      complete:()=>{
          this.updatePic()
      }
      
      
      
    });
  }
 




}
