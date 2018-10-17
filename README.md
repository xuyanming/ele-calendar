# 一个vue calendar的npm组件


### 说明：
1.基于element-ui开发的vue日历组件。

![](https://user-gold-cdn.xitu.io/2018/6/26/1643bf39645d064c?w=507&h=472&f=gif&s=20682)

#####更新:
***1.增加日期多选 :selectionMode="'dates'"，事件select返回选择日期及节点***
2.增加语言切换 :lang="'en'"
3.抽离css方便自定义样式  import 'ele-calendar/dist/vue-calendar.css' //引入css
注释：需要配置了jsx依赖

### 使用方法：

1.下载npm包:

#####你的VUE项目的根目录底下运行：
``` sh
    npm install ele-calendar
```
2.引入本npm包并注册为vue的组件：


> 例如：在需要使用的vue页面中：
``` html
	<template>
    	
    	<!-- 里面写eleCalendar组件-->
            <ele-calendar
                  :render-content="renderContent"
                  :data="datedef"
                  :prop="prop"
            ></ele-calendar>
	</template>
	
	<script>
    import eleCalendar from 'ele-calendar'
    import 'ele-calendar/dist/vue-calendar.css' //引入css
    export default {
        data(){
        	return{
        		datedef:[
                    {"date":"2018-06-30","content":null,"cid":null},
                    {"date":"2018-06-26","content":null,"cid":null},
                ],
                prop:'date' //对应日期字段名
        	}
        },
        components: {
            eleCalendar
        },
        methods: {
          renderContent(h,parmas) {
            const loop = data =>{
              return (
                data.defvalue.value ? (<div><div>{data.defvalue.text}</div> 
                <span  >备选项</span>
                </div>) : <div>{data.defvalue.text}</div>
              )
           }
           return (
            <div  style="min-height:60px;">
             {loop(parmas)}
            </div>
            );
         },
       }
    }
    </script>
```
3.通过render-content的渲染Function 自定义日历显示内容
> 例如：
``` html
    renderContent(h,parmas) {  //设置lunarcalendar=true,parmas返回值包含农历
                const loop = data =>{
                  return (
                    data.defvalue.value ? (<div><div>{data.defvalue.text}</div> 
                    <span  >备选项</span>
                    </div>) : <div>{data.defvalue.text}</div>
                  )
               }
               return (
                <div  style="min-height:60px;">
                 {loop(parmas)}
                </div>
                );
             },
       parmas返回当前日期和传入data对应内容

```


### Calendar Attributes
| 参数      | 说明           | 类型      | 可选值        | 默认值  |
| -------------------- | ---------------------------------------------- | ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------- |
| data      | 显示的数据     | array     | —             | —      |
| prop      | 对应日期字段名 | string    | —              | —      |
| lang      | 语言切换 | string    | en             | zh-CN    |
| selectionMode| 日历模式 | string    | dates             | day    |
| highlight | 是否要高亮对应日期 | boolean | —             | false |
| currentmonth | 高亮选中日期 | boolean   | —             | false |
| disabledDate |设置禁用状态，参数为当前日期，要求返回 Boolean | Function | — | — |
| border     | 是否带有边框     | boolean | —               | false |
| lunarcalendar     | 是否需要农历     | boolean | —               | false |
| defaultValue     | 默认展示某月     | Date | —               | - |
| render-content | 内容区的渲染 Function | Function(h, parmas) | — | — |

### Calendar Events
| 事件名 | 说明 | 参数 |
| -------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| date-change | 切换日历年、月 | data |
| select | 选择日期的数组及节点 | val,selectDom|
| pick | 点击日历 | 返回当前点击时间data、event、row、dome |

