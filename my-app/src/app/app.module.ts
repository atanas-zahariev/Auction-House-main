import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component'



import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { appInterceptorProvider } from './interceptor/appInerceptor';
import { AuthService } from './services/auth.service';
import { ItemsService } from './services/items.service';
import { AuthGuardService } from './shared/guards/authGuard';
import { UsersGuardService } from './shared/guards/userGuard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    ItemsService,
    AuthGuardService,
    UsersGuardService,
    appInterceptorProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
