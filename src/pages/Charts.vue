<template>
  <div class="charts">
    <Row :gutter="16" >
      <Col span="12">
         <VmChartBarLine title="Bar Chart" :xAxisData="dataBar1.xAxisData" :series="dataBar1.series">
        </VmChartBarLine>
      </Col>
      <Col span="12">
        <VmChartPie title="Pie Chart" :data="dataPie">
        </VmChartPie>
      </Col>
    </Row>
  </div>
</template>

<script>
  import VmChartBarLine from '@/components/vm-chart-bar-line'
  import VmChartPie from '@/components/vm-chart-pie'
  import Cookies from 'js-cookie'
  import axios from 'axios'
  axios.defaults.baseURL = 'http://localhost:8081/index.php/index/index'
  var ActionAnalysis = []
  export default {
    name: 'Charts',
    components: {
      VmChartBarLine,
      VmChartPie
    },
    data () {
      return {
        dataBar1: {
          xAxisData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          series: [
            {
              name: '销量',
              type: 'bar',
              // data: [50, 200, 360, 100, 100, 200]
              data: [50, 200, 360, 100, 100, 200]
            }
          ]
        },
        dataPie: []
      }
    },
    mounted: function () {
      this.listPoster()
    },
    methods: {
      async listPoster () {
        var RenderedVideoName = Cookies.get('RenderedVideoName')
        var params = new URLSearchParams()
        params.append('RenderedVideoName', RenderedVideoName)
        await axios.post('/actionAnalysis', params)
          .then(function (response) {
            console.log(response.data)
            ActionAnalysis = response.data.data
            for (const Aciton in ActionAnalysis) {
              console.log(Aciton)
              console.log(ActionAnalysis[Aciton])
            }
          })
          .catch(function (error) {
            console.log(error)
          })
        var TempList = []
        for (const Aciton in ActionAnalysis) {
          TempList.push(
            {
              name: Aciton,
              value: ActionAnalysis[Aciton]
            }
          )
          console.log(Aciton)
          console.log(ActionAnalysis[Aciton])
        }
        console.log(TempList)
        this.dataPie = TempList
      }
    }
  }
</script>
