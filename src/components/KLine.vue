<template>
<div>
  <button v-if="showRenewButt" @click="pollingLoad()" class="upd_butt">更新K線</button>
  <div class="k-line-chart-container">
    <div :id="id" class="k-line-chart"/>
  </div>
</div>
</template>

<script>
  import {dispose, init} from 'klinecharts'
  
  export default {
    data: function () {
      return {
        interval: {},
      }
    },
//    props: ['id'],
    watch: {
      bollPeriod: function (val) {
        this.pollingLoad()
      },
    },
    props: ["id", "data", "showRenewButt"],
    mounted: function () {
      if(!process.isClient){
        return
      }
      this.kLineChart = init(this.id)
      this.paneId = this.kLineChart.createIndicator('BOLL', true, { id: 'candle_pane' })
      
      this.interval = setInterval(this.firstPollingLoad, 1000)
      setInterval(this.pollingLoad, 300000)
    },
    methods: {
      firstPollingLoad(){
        if(this.data && this.data.length > 0){
          this.kLineChart.applyNewData(this.data)   
          clearInterval(this.interval)
        }
      },
      pollingLoad(){
        if(this.data && this.data.length > 0){
          this.kLineChart.applyNewData(this.data) 
        }
      },
      destroyed() {
        dispose(this.id)
      },
    },
  } 
</script>

<style>
  .k-line-chart-container {    
    display: flex;
    flex-direction: column;
    margin: 15px;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .3);
    background-color: #FFFFFF;
    width: 580px;
    height: 140px;
    padding: 0 6px 16px 16px;
  }

  .k-line-chart {
    display: flex;
    flex: 1;
  }
  
  .upd_butt {
    position: absolute;
    top: 40px;
    right: -10px;
  }
</style>
