<template>
  <div :class="layout"><slot/></div>
</template>

<script> 
export default {
  computed: {
    layout() {
      return this.$isMobile ? 'm_layout' : 'layout';
    }
  },
}
</script> 

<style>
  html {
    font-weight: 400;
    font-family: -apple-system,BlinkMacSystemFont,'Helvetica Neue', 'PingFang TC','Microsoft YaHei','Source Han Sans TC','Noto Sans CJK TC', 'WenQuanYi Micro Hei',sans-serif;
    margin: 0;
    padding: 0;
    line-height: 1.5;
    color: #28646e;
    background: SeaShell;
  }
  
  .layout {
    font-size: normal;
    width: 100%;
    margin: 0 auto;
  }
  
  .m_layout {
    font-size: small;
    width: 100%;
    margin: 0 auto;
  }
  
</style>