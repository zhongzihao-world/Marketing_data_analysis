<template>
	<div id="menu">
		<canvas id="canvas" class="canvas"></canvas>
		<div class="city"></div>
		<div class="moon"  @click='gonlogin()'>
        </div>		
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import Stars from '../../static/Star'
import Moon from '../../static/Moon'
import Meteor   from '../../static/Meteor'

export default {
	data() {
		return {
			
		}
	},
	mounted() {
		this.start()
	},
	methods: {
		start(){
            let canvas = document.getElementById('canvas'),
		    ctx = canvas.getContext('2d'),
		    width = window.innerWidth,
		    height = window.innerHeight,
		    //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
		    moon = new Moon(ctx, width, height),
		    stars = new Stars(ctx, width, height, 200),
		    meteors = [],
		    count = 0

		    canvas.width = width;
		    canvas.height = height;

            const meteorGenerator = ()=> {
                //x位置偏移，以免经过月亮
                let x = Math.random() * width + 200
                meteors.push(new Meteor(ctx, x, height))

                //每隔随机时间，生成新流星
                setTimeout(()=> {
                    meteorGenerator()

                }, Math.random() * (Math.random()>0.2?0.001:520))
            }

            const frame = ()=>{
                count++
                count % 10 == 0 && stars.blink()
                moon.draw()
                stars.draw()

                meteors.forEach((meteor, index, arr)=> {
                    //如果流星离开视野之内，销毁流星实例，回收内存
                    if (meteor.flow()) {
                        meteor.draw()
                    } else {
                        arr.splice(index, 1)
                    }
                })
                requestAnimationFrame(frame)
            }
            meteorGenerator()
            frame()
        },
        gonlogin(){
            Toast({
                    message: '即将跳转到登录界面~',
                    duration : 1000
                });
                setTimeout(()=> {
                    this.$router.push('login')
                },1000)
        }
	}
}
</script>

<style scoped>
#menu {
	height: 100%;
	overflow: hidden;
	position: relative;
}

.canvas {
    position: fixed;
    z-index: -1;
}

.city {
	width: 100%;
	height: 170px;
    position: fixed;
    bottom: 0px;
    z-index: 100;
    background: url('../assets/img/city.png') no-repeat;
    background-size: cover;
}
.moon {
	width: 150px;
	height: 150px;
	position: absolute;
	left: 30%;
	top: 30%;
	background: url('../assets/img/moon.png') no-repeat;
	background-size: cover;
}
</style>