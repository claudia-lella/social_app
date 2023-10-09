import { User } from './../../model/user';
import { Friendship } from './../../model/friendship';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* Models: Post, Friendship, User */
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/service/post.service';
/* Services: PostService, FRiendshipService, UserService, BusinessService */
import { UserService } from 'src/app/service/user.service';
import { FriendshipService } from 'src/app/service/friendship.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /* ------ ATTRIBUTES ------ */
  /* left */
  user:User|undefined;
  userLogged:boolean = false;
  userStatus:boolean = false;
  userUpdatePopupVisible:boolean = false;
  businessConfirmPopupVisible:boolean = false;
  businessLoggedCard:boolean = false;
  businessSubscribeCard:boolean = false;
  /* center */
  posts:Post[]|undefined;
  postPopupRegistrationVisible:boolean = false;
  postCardVisible:boolean = true;
  searchCardVisible:boolean = false;
  logoutPopupVisible:boolean = false;
  deletePopupVisible:boolean = false;
  post:Post|undefined;
  friendship:Friendship|undefined;
  /* right */
  receivedFriendships:Friendship[]|undefined;
  requestedFriendships:Friendship[]|undefined;
  /* user to update */
  userToUpdate:User|undefined;
  userToUpdateImage:any;
  usersSearch:User[]|undefined;
  upgradeVisible:boolean = true;
  updateVisible:boolean = false;
  isSearching: boolean = false;
  pendingReceivedFriendShips:Friendship[] = [];
  pendingSendedFriendShips:Friendship[]= [];
  confirmedFriendIds:number[]= [];

  /* ------ CONSTRUCTOR ------ */
  constructor(
    private router:Router,
    private userService:UserService,
    private postService:PostService,
    private friendshipService:FriendshipService){}
    

  /* ------ METHODS ------ */

  /* initialization */
  ngOnInit():void {
    this.callReadApi();
  }

  callReadApi():void
  {
    /* check user logged  */
    this.userLogged = this.userService.checkUserLoginState();
      
    /* get user */
    this.userService.userGet()
      .subscribe({
        next: response => {
          this.user = response
          // selezione richieste di amicizia ricevute pendenti
            if(this.user && this.user?.receivedFriendships)
              for(let received of this.user.receivedFriendships)
                if(received.status == "Friendship sent")
                  this.pendingReceivedFriendShips!.push(received)
            // selezione richieste di amicizia inviate pendenti
            if(this.user && this.user.requestedFriendships)
              for(let sended of this.user.requestedFriendships)
                if(sended.status == "Friendship sent")
                  this.pendingSendedFriendShips!.push(sended)
          // selezione id utenti amicizie confermate
            if(this.user && this.user.receivedFriendships && this.user.requestedFriendships)
            {
              for(let received of this.user.receivedFriendships)
                if(received.status)
                  this.confirmedFriendIds!.push(received.applicant?.id!)
              for(let sended of this.user.requestedFriendships)
                if(sended.status)
                  this.confirmedFriendIds!.push(sended.requested?.id!)
            }
        },
        error: e => console.log(e.message)
      })
    /* get posts */
    this.postService.getAllPosts()
      .subscribe({
        next: response => this.posts = response,
        error: e => console.log(e.message)
      })

  }

  /* popup profile on */
  activateProfilePopup():void {

    this.userToUpdate = this.user;
    this.userUpdatePopupVisible = true;
  }

  /* popup profile off */
  deactivateProfilePopup():void {
    
    this.userToUpdate = undefined;
    this.userUpdatePopupVisible = false;
    this.userToUpdateImage = undefined;
  }

  activateProfilePopupAndUpdate():void {
    this.userToUpdate = this.user;
    
    if(this.user && this.user.profileImage)
      this.userToUpdateImage = this.user.profileImage;
    
    this.userUpdatePopupVisible = true;
  }

  /* popup business on */
  openBusinessPopup():void
  {
    this.businessConfirmPopupVisible = true;
  }

  /* popup business off */
  deactivateBusinessPopup():void
  {
    this.businessConfirmPopupVisible = false;
  }
  
  /* popup logout on */
  activateLogoutPopup(): void {
    this.logoutPopupVisible = true;
  }

  /* popup logout off */
  closeLogoutPopup(): void {
    this.logoutPopupVisible = false;
  }


  //delete user
  deleteUser(userId:number):void
  {
    if(this.user)
    {
      this.user.id = userId;
    }

    this.deletePopupVisible=true;
  }

  /* popup delete on */
  activateDeletePopup():void
  {
    this.deletePopupVisible = true;
  }

  /* popup delete off */
  deactivateDeletePopup():void
  {
    this.deletePopupVisible = false;
  }

  /* popup post on */
  activatePostPopup():void
  {
    this.postPopupRegistrationVisible = true;
  }

  /* popup post off */
  deactivatePostPopup():void
  {
    this.postPopupRegistrationVisible = false;
    this.callReadApi();
  }

  
  /* user research by nickname */
  userSearch(search:string=""):void {

    this.userService.searchUser(search)
      .subscribe({
        next: response => this.usersSearch = response,
        error: e => console.log(e.message)
      })
  }

  /* add friendship */
  addFrienship(selectedUser:User):void {

    if (selectedUser && this.user) {

      let friendship: Friendship = {
        applicant: { id: this.user.id },
        requested: { id: selectedUser.id }
      };
    

    this.friendshipService.friendshipRegistration(friendship)
      .subscribe({
        next: response => {
          if(response.code == 201)
            this.callReadApi();
            this.isSearching = false;
          },
          error: e => console.log(e.message)
      })

    }
  }

  /* upgrade */
  confirmUpgrade(): void {
    this.userService.userUpgrade(this.user!).subscribe((response) => {
      if (response.code == 202) {
        this.callReadApi();
      } else {
        console.error('Upgrade fallito');
      }
      this.businessConfirmPopupVisible = false;
    });
  }

  /* cofnirm friendiship */
  acceptFriendship(friendship:Friendship):void {

    this.friendshipService.friendshipUpdate(friendship)
      .subscribe({
        next: response => {
         if(response.code == 202)
            this.callReadApi();
            this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => this.router.navigate(['/home']));
        },
        error: e => console.log(e.message)
        
      })
  }

  //reject Friendship
  rejectFriendship(friendship:Friendship): void {

  this.friendshipService.friendshipDelete(friendship.id!)
    .subscribe({
      next: response => {
        if (response.code == 202) {
          this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => this.router.navigate(['/home']));
        }
      },
      error: e => console.log(e.message)
    });
  }

  //reject Friendship
  deleteFriendship(friendship:Friendship): void {

    this.friendshipService.friendshipDelete(friendship.id!)
      .subscribe({
        next: response => {
          if (response.code == 202) {
            this.router.navigateByUrl('/', {skipLocationChange: true})
              .then(() => this.router.navigate(['/home']));
            
          }
        },
        error: e => console.log(e.message)
      });
    }
 
}
