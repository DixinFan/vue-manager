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
        dataBar1: {},
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
        var PieTempList = []
        var Title = []
        var Count = []
        for (const Aciton in ActionAnalysis) {
          PieTempList.push(
            {
              name: Aciton,
              value: ActionAnalysis[Aciton]
            }
          )
          Title.push(Aciton)
          Count.push(ActionAnalysis[Aciton])
        }
        this.dataBar1 = {
          xAxisData: Title,
          series: [
            {
              name: '帧数',
              type: 'bar',
              data: Count
            }
          ]
        }
        this.dataPie = PieTempList
      }
    }
  }
</script>
