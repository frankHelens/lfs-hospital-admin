import { colors } from './common'

export const dashBoardOption = (xData: string[], yData: number[]) => ({
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  xAxis: {
    data: xData
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: yData
  }]
})
export const ringGraphOyaption = (legendData: string[], data:object[]) => ({
  color: colors,
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    y: 'bottom',
    data: legendData
  },
  series: [
    {
      name: '个数',
      type: 'pie',
      selectedMode: 'single',
      radius: ['50%', '70%'],
      center: ['50%', '38%'],
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '24',
            fontWeight: 'bold'
          }
        }
      },
      data: data
    }
  ]
})
