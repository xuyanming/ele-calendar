<template>
  <div id="app">
    <div style="width:500px; margin:50px auto">
        <ele-calendar  @pick="clickpick" :defaultValue="'2018-03-08'" :lunarcalendar="true" :currentmonth="currentmonth" :render-content="renderContent" :disabledDate="disabledDate" :highlight="false"  :prop="prop" @date-change="datechange" :border="true" :data="datedef">
          </ele-calendar >
    </div>
    
  </div>
  
</template>

<script>
import eleCalendar from '../dist/vue-calendar.js'
import '../dist/vue-calendar.css'
export default {
  name: 'App',
  data(){
    	return{
    		timeout:'',
            switchmonth:false,
            currentmonth:true,
            checked:'',
            dialogVisible:false,
            value1:'',
            datedef:[
                {"date":"2018-06-30","content":555},
                {"date":"2018-06-26","content":666},
                {"date":"2018-07-1","content":666},
                {"date":"2018-07-5","content":777},
                {"date":"2018-07-26","content":567},
            ],
            highlight:true,
            prop:'date'
    	}
    },
  components: {
      eleCalendar
  },
  methods: {
      disabledDate(val){
          
      },
      renderContent(h,parmas) {
        const loop = data =>{
            return (
                data.defvalue.value ? (<div> <span >{data.defvalue.text}</span>
                <span>{"￥"+data.defvalue.value.content}</span>
                </div>) : <div><span>{data.defvalue.text}</span></div>)
        }
        return (<div  style="min-height:60px;">{loop(parmas)}</div>);
      },
      append(parmas){
        console.log(parmas.defvalue)
      },
      datechange(val){
          console.log(val,'1111')
      },
      clickpick(value,event,row,celltd){
        console.log(value,event,row,celltd)
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
