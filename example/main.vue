<template>
  <div id="app">
    <div style="width:500px; margin:50px auto">
        <ele-calendar    @pick="clickpick"  
         :lunarcalendar="true" :currentmonth="currentmonth"  :disabledDate="disabledDate" 
          :prop="prop" @date-change="datechange" :border="true" :data="datedef">
          <div slot="after">123</div>
          <template slot-scope="slotProps">
            <span>123</span>
            {{ slotProps.todo}}
          </template>
          <div slot="before">123</div>
          </ele-calendar >
    </div>
    
  </div>
  
</template>

<script>
import eleCalendar from '../src/index.js'
// import eleCalendar from '../dist/vue-calendar.js'
// import '../dist/vue-calendar.css'
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
            datedef:[],
            highlight:true,
            prop:'date',
            // value:'2018-10-23',
            value:[]
    	}
    },
  components: {
      eleCalendar
  },
  methods: {
      disabledDate(val){
          // console.log(val)
          // return true
      },
      selecthald(val,selectDom){
        console.log(val,selectDom)
        let _this = this
        setTimeout(function(){
          _this.datedef=[
                {"date":"2018-06-30","content":555},
                {"date":"2018-06-26","content":666},
                {"date":"2018-07-1","content":666},
                {"date":"2018-07-5","content":777},
                {"date":"2018-10-26","content":567},
            ]
            _this.value = []
        },3000)
      },
      renderContent(h,parmas) {
        const loop = data =>{
            return (
                data.defvalue.value ? (<div> <span >{data.defvalue.text}</span>
                <span>{"￥"+data.defvalue.value.content}</span>
                </div>) : <div><span>{data.defvalue.text}</span></div>)
        }
        return (<div  >{loop(parmas)}</div>);
      },
      append(parmas){
        console.log(parmas.defvalue)
      },
      datechange(val){
        console.log(val)
          this.datedef=[
                {"date":"2018-06-30","content":555},
                {"date":"2018-06-26","content":666},
                {"date":"2018-07-1","content":666},
                {"date":"2018-07-5","content":777},
                {"date":"2018-08-26","content":567},
            ]
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
