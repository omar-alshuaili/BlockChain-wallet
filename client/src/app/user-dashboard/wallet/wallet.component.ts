import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  showCopyMess: boolean = false;
  wallet:any[] = []

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    let id = JSON.parse(atob(localStorage.getItem('access_token')!.split('.')[1]));
    id = id._id
    this.userService.getUserWallets(id).subscribe({
      next:(w)=>{
        this.wallet = JSON.parse(w)
        console.log(typeof this.wallet);
        
       console.log(JSON.parse(w)[0].coin);
      },
      error:(e)=>{
        
        console.log(e);
        
      }
    })
  }

  showCopy(){
    this.showCopyMess = true
  }

}
