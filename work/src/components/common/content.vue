<style lang="less" scoped>
  @import "../../less/config";
  .content {
    overflow: auto;
    position: absolute;
    top: 0px;
    right: 0;
    height: 100%;
    width: 100%;
    // overflow-x: hidden;
    top: 98px;
    left: 0;
    z-index: 100;
    -webkit-overflow-scrolling : touch; 
  }
</style>
<template>
    <div class="content">
        <slot></slot>
    </div>
</template>
<script>

</script>
