import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxEchartsModule} from 'ngx-echarts';

import {AppComponent} from './app.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      // @ts-ignore
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
