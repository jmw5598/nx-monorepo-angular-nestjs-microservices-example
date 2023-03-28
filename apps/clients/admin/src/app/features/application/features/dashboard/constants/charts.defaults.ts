import { Color } from '@swimlane/ngx-charts';

export interface BarChartOptions {
  showXAxis: boolean,
  showYAxis: boolean,
  gradient: boolean,
  showLegend: boolean,
  showXAxisLabel: boolean,
  xAxisLabel: string,
  showYAxisLabel: boolean,
  yAxisLabel: string,
  legendTitle: string,
  colorScheme: Color
}

export const defaultBarChard2DOptions: BarChartOptions = {
  showXAxis: true,
  showYAxis: true,
  gradient: true,
  showLegend: true,
  showXAxisLabel: true,
  xAxisLabel: 'Month',
  showYAxisLabel: true,
  yAxisLabel: 'Cases',
  legendTitle: '',
  colorScheme: {
    domain: ['#FF5560', '#FFA169', '#AAAAAA']
  } as Color
}
