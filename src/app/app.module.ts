import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppHeaderComponent} from './components/app-header/app-header.component';

/* Pages */
import { AdministrationPageComponent } from './pages/administration-page/administration-page.component';
import { ThemeColorPickerComponent } from './components/theme-color-picker/theme-color-picker.component';
import { ThemeColorPreviewComponent } from './components/theme-color-preview/theme-color-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AdministrationPageComponent,
    ThemeColorPickerComponent,
    ThemeColorPreviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
