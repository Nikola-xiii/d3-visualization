import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule,
  MatMenuModule, MatIconModule, MatButtonModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatSelectModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { GeoMapDemoComponent } from './pages/geo-map-demo/geo-map-demo.component';
import { HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { LineChartDemoComponent } from './pages/line-chart-demo/line-chart-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    GeoMapDemoComponent,
    LineChartDemoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
