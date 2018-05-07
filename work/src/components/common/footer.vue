<style lang="less" scoped>
  @import "../../less/config";
  .footer {
    position: absolute;
    background-color: #FFFFFF;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    height: 49px;
    text-align: center;
    border-top: 1px solid #ddd;
    ul {
      padding: 5px 0;
      margin: 0;
      li {
        list-style: none;
        float: left;
        width: 33.3333333%;
        a {
          position: relative;
          display: block;
          text-decoration: none;
          color: @text;
          i {
            display: block;
            line-height: 20px;
          }
          em {
            line-height: 14px;
            font-size: 12px;
            font-style: normal;
          }
        }
      }
      .active {
        i,
        em {
          color: @main;
        }
      }
    }
  }
</style>

<template>
  <footer class="footer">
    <ul flex="box:mean">
      
      <li :class="{ active: item.path == $route.path }"  v-for="item in list">
        <router-link :to="item.path">
          <i class="iconfont" :class="[ item.icon ]"></i>
          <em>{{ item.title }}</em>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {
            title: '客流分析',
            path: '/passenger',
            icon: 'icon-user'
          },
          {
            title: '画像分析',
            path: '/portray',
            icon: 'icon-figure'
          },
          {
            title: '案场管理',
            path: '/mac',
            icon: 'icon-manage'
          }
        ]
      }
    },
    created () {
    },
    methods: {
    }
  }

</script>
