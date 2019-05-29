import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './css-components/app-header/app-header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';

import { ProjectSummaryComponent } from './project-summary/project-summary.component';
import { ContentService } from './content.service';
import { ProjectTemplate1Component } from './project-template-1/project-template-1.component';
import { ProjectTemplateDeciderComponent } from './project-template-decider/project-template-decider.component';
import { ProjectTemplate2Component } from './project-template-2/project-template-2.component';
import { ButtonComponent } from './css-components/button/button.component';
import { PillComponent } from './css-components/pill/pill.component';

import { APP_INITIALIZER } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    WelcomeComponent,
    HomeComponent,
    AboutComponent,
    NavBarComponent,
    FooterComponent,
    ProjectSummaryComponent,
    ProjectTemplate1Component,
    ProjectTemplateDeciderComponent,
    ProjectTemplate2Component,
    ButtonComponent,
    PillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ContentService, 
    {
      provide: APP_INITIALIZER,
      useFactory: (cs: ContentService) => function() { return cs.initContent()},
      deps: [ContentService],
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
