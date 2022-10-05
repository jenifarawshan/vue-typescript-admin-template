<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="selectedCountry"
        :placeholder="$t('table.country')"
        class="filter-item"
        @change="countryChangeCallback"
      >
        <el-option
          v-for="country in countryList"
          :key="country"
          :label="country"
          :value="country"
        ></el-option>
      </el-select>
    </div>

    <div class="chart-container" ref="chartContainer"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import rapidapi from '@/utils/rapidapi'

export default {
  data: () => ({
    countryList: [],
    selectedCountry: '',
    history: [],
    chart: {}
  }),
  methods: {
    getCountries() {
      rapidapi.get('countries').then((data) => {
        this.countryList = data?.response
      })
    },
    async countryChangeCallback() {
      this.history = await this.getData()
      const chartData = this.generateChartData(this.history)
      this.updateChart(chartData)
    },
    getData() {
      return rapidapi
        .get('history', {
          params: { country: this.selectedCountry }
        })
        .then((data) => data?.response)
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chartContainer)
      this.chart.setOption({
        backgroundColor: '#394056',
        title: {
          text: 'Please select a country to view Covid-19 historical data',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: [],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '3%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [
          {
            name: 'Date',
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            show: false,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              fontSize: 14
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }
        ],
        series: [
          {
            name: 'Total Cases',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            },
            itemStyle: {
              color: 'rgb(0,136,212)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12
            },
            data: []
          },
          {
            name: 'Total Recovered',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(137, 189, 27, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(137, 189, 27, 0)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            },
            itemStyle: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12
            },
            data: []
          },
          {
            name: 'Total Deaths',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              width: 1
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(219, 50, 51, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(219, 50, 51, 0)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            },
            itemStyle: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            },
            data: []
          }
        ]
      })
    },
    generateChartData(history) {
      const chartData = {
        title: {
          text: `${this.$t('route.covid19History')}: ${this.selectedCountry}`,
          left: '1%',
          top: '2%'
        },
        legend: {
          data: ['Total Cases', 'Total Recovered', 'Total Deaths']
        },
        xAxis: {
          show: true,
          data: []
        },
        series: [
          {
            name: 'Total Cases',
            data: []
          },
          {
            name: 'Total Recovered',
            data: []
          },
          {
            name: 'Total Deaths',
            data: []
          }
        ]
      }

      history.forEach((item) => {
        chartData.xAxis.data.unshift(item?.day)
        chartData.series[0].data.unshift(item?.cases?.total)
        chartData.series[1].data.unshift(item?.cases?.recovered)
        chartData.series[2].data.unshift(item?.deaths?.total)
      })

      return chartData
    },
    updateChart(chartData) {
      this.chart?.setOption(chartData)
    }
  },
  beforeDestroy() {
    this.chart?.dispose()
    this.chart = {}
  },
  created() {
    this.getCountries()
  },
  mounted() {
    this.initChart()
  }
}
</script>

<style scoped>
.chart-container {
  height: 650px;
}
</style>
