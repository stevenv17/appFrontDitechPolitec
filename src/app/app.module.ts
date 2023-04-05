import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//Ant
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';


registerLocaleData(en);

const appRoutes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent }
];

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};


const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //Ant
    NzGridModule,
    NzTableModule,
    NzMenuModule,
    NzIconModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzPageHeaderModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzModalModule,
    NzDividerModule,
    NzInputNumberModule,
    NzLayoutModule,
    NzMessageModule,
    ReactiveFormsModule,
    NzPopoverModule

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
