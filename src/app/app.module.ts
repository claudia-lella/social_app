import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginDashComponent } from './component/login-dash/login-dash.component';
import { RegistrationDashComponent } from './component/registration-dash/registration-dash.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { LeftSidebarComponent } from './component/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './component/right-sidebar/right-sidebar.component';
import { HomeComponent } from './component/home/home.component';
import { PostCardComponent } from './component/post-card/post-card.component';
import { LogoutPopupComponent } from './component/logout-popup/logout-popup.component';
import { DeletePopupComponent } from './component/delete-popup/delete-popup.component';
import { BusinessDashComponent } from './component/business-dash/business-dash.component';
import { BusinessPopupComponent } from './component/business-popup/business-popup.component';
import { PostTableComponent } from './component/post-table/post-table.component';
import { CampaignTableComponent } from './component/campaign-table/campaign-table.component';
import { ProfilePopupComponent } from './component/profile-popup/profile-popup.component';
import { CampaignCartComponent } from './component/campaign-cart/campaign-cart.component';
import { PostPopupComponent } from './component/post-popup/post-popup.component';
import { SearchCardComponent } from './component/search-card/search-card.component';
import { TruncatePipe } from './component/pipe/truncate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginDashComponent,
    RegistrationDashComponent,
    NavbarComponent,
    FooterComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    HomeComponent,
    PostCardComponent,
    LogoutPopupComponent,
    DeletePopupComponent,
    BusinessDashComponent,
    BusinessPopupComponent,
    PostTableComponent,
    CampaignTableComponent,
    ProfilePopupComponent,
    CampaignCartComponent,
    PostPopupComponent,
    SearchCardComponent,
    TruncatePipe, // Truncate Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // HttpClient
    FormsModule, // Forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
