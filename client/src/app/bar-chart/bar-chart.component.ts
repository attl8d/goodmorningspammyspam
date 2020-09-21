import {Component, OnInit, ViewChild} from '@angular/core';
import {EChartOption} from 'echarts';
import {NgxEchartsDirective} from 'ngx-echarts';
import {AppService} from '../app.service';
import {sortBy} from 'lodash';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public merge: any;
  public chartOption: EChartOption = {
    grid: {containLabel: true},
    xAxis: {
      show: false,
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        formatter: (d) => {
          console.log(d);
          return d;
        }
      },
      axisLine: {
        show: false
      }
    },
    series: [
      {
        type: 'bar',
        barWidth: 40,
        encode: {
          x: 'spamCount',
          y: 'name'
        },
        itemStyle: {
          color: '#2ab7ca',
          barBorderRadius: [50, 50, 50, 50]
        },
        label: {
          show: true,
          fontSize: 20,
          position: 'insideLeft',
          offset: [15, 0],

        }
      }
    ]
  };

  @ViewChild(NgxEchartsDirective)
  public ceva: NgxEchartsDirective;

  constructor(private appService: AppService) {
  }

  public ngOnInit() {
    this.appService.data$.subscribe(d => {
      console.log('barchart data', d);

      const names = Object.keys(d);
      this.merge = {
        dataset: {
          source: [
            ['name', 'spamCount'],
          ]
        }
      };

      const dataset = names.map(name => [name, d[name].score]);

      const sortedDataset = sortBy(dataset, datum => datum[1]);

      this.merge.dataset.source = this.merge.dataset.source.concat(sortedDataset);
    });
  }
}
