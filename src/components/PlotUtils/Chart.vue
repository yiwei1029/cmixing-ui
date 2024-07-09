<template>
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chartInstance: null
    };
  },
  watch: {
    chartData: {
      handler(newData) {
        this.updateChart(newData);
      },
      deep: true
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.chartInstance = echarts.init(this.$refs.chart);
      this.updateChart(this.chartData);
    },
    updateChart(data) {
      const option = {
        title: {
          text: 'ECharts 示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: data.map(item => item.name)
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: data.map(item => item.value)
          }
        ]
      };
      this.chartInstance.setOption(option);
    }
  }
};
</script>

<style scoped>
/* 添加一些样式以确保图表容器有适当的大小 */
</style>