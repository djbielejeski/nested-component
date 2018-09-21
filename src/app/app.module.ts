import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRootComponent } from './app-root/app-root.component';
import { NestedComponent } from './shared/components/nested.component';
import { ArtifactsOptionsService } from './shared/services/artifacts-options.service';

@NgModule({
  declarations: [
    AppRootComponent,
    NestedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ArtifactsOptionsService
  ],
  bootstrap: [AppRootComponent]
})
export class AppModule { }
