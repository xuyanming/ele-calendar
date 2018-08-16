<template>
    <div
      class="el-picker-panel-calendar el-date-picker-calendar el-popper"
      :class="[{
        'has-sidebar': $slots.sidebar || shortcuts,
        'has-time': showTime
      }, popperClass]">
      <div class="el-picker-panel-calendar__body-wrapper">
        <div class="el-picker-panel-calendar__body">
          <div
            class="el-date-picker-calendar__header"
            :class="{ 'el-date-picker-calendar__header--bordered': currentView === 'year' || currentView === 'month' }"
           >
            <i
            @click="prevYear"
            :aria-label="t(`el.datepicker.prevYear`)"
            type="button" class="el-picker-panel-calendar__icon-btn el-date-picker-calendar__prev-btn iconfont icon-shuangzuojiantou-">
            </i>
            <i
              type="button"
              @click="prevMonth"
              v-show="currentView === 'date'"
              :aria-label="t(`el.datepicker.prevMonth`)"
              class="el-picker-panel-calendar__icon-btn el-date-picker-calendar__prev-btn iconfont icon-icon_arrow_left">
            </i>
            <span
              @click="showYearPicker"
              role="button"
              class="el-date-picker-calendar__header-label">{{ yearLabel }}</span>
            <span
              @click="showMonthPicker"
              v-show="currentView === 'date'"
              role="button"
              class="el-date-picker-calendar__header-label"
              :class="{ active: currentView === 'month' }">{{t(`el.datepicker.month${ month + 1 }`)}}</span>
            <i
              type="button"
              @click="nextYear"
              :aria-label="t(`el.datepicker.nextYear`)"
              class="el-picker-panel-calendar__icon-btn el-date-picker-calendar__next-btn iconfont icon-shuangyoujiantou- ">
            </i>
            <i
              type="button"
              @click="nextMonth"
              v-show="currentView === 'date'"
              :aria-label="t(`el.datepicker.nextMonth`)"
              class="el-picker-panel-calendar__icon-btn el-date-picker-calendar__next-btn iconfont icon-icon_arrow_right">
            </i>
          </div>
          <div :class="[{'el-table--border-calendar':border,'el-table-calendar':border,}]" >
            <date-table
              @pick="handleDatePick"
              :selection-mode="selectionMode"
              :first-day-of-week="firstDayOfWeek"
              :value="new Date(value)"
              :default-value="defaultValue ? new Date(defaultValue) : null"
              :date="date"
              :eventvalue='data'
              :lunarcalendar="lunarcalendar"
              :highlight="highlight"
              :prop="prop"
              :currentmonth="currentmonth"
              :render-content="renderContent"
              :disabled-date="disabledDate">
            </date-table>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/babel">
  import {
    formatDate,
    parseDate,
    getWeekNumber,
    isDate,
    modifyDate,
    modifyTime,
    modifyWithDefaultTime,
    clearMilliseconds,
    clearTime,
    prevYear,
    nextYear,
    prevMonth,
    nextMonth,
    changeYearMonthAndClampDate,
    extractDateFormat,
    extractTimeFormat
  } from './util';
  import Clickoutside from './src/utils/clickoutside';

  import Locale from './src/mixins/locale';
  import DateTable from './date-table.vue';
  export default {
    mixins: [Locale],

    directives: { Clickoutside },

    watch: {
      showTime(val) {
        /* istanbul ignore if */
        if (!val) return;
        this.$nextTick(_ => {
          const inputElm = this.$refs.input.$el;
          if (inputElm) {
            this.pickerWidth = inputElm.getBoundingClientRect().width + 10;
          }
        });
      },

      value(val) {
        if (isDate(val)) {
          this.date = new Date(val);
        } else {
          this.date = this.defaultValue ? new Date(this.defaultValue) : new Date();
        }
      },

      defaultValue(val) {
        if (!isDate(this.value)) {
          this.date = val ? new Date(val) : new Date();
        }
      },

      timePickerVisible(val) {
        if (val) this.$nextTick(() => this.$refs.timepicker.adjustSpinners());
      },

      selectionMode(newVal) {
        if (newVal === 'month') {
          /* istanbul ignore next */
          if (this.currentView !== 'year' || this.currentView !== 'month') {
            this.currentView = 'month';
          }
        }
      }
    },
    created() {
        if (isDate(this.defaultValue) && !isDate(this.value)) {
          this.date = this.defaultValue ? new Date(this.defaultValue) : new Date();
        }
    },
    methods: {
    //   proxyTimePickerDataProperties() {
    //     const format = timeFormat => {this.$refs.timepicker.format = timeFormat;};
    //     const value = value => {this.$refs.timepicker.value = value;};
    //     const date = date => {this.$refs.timepicker.date = date;};

    //     this.$watch('value', value);
    //     this.$watch('date', date);

    //     format(this.timeFormat);
    //     value(this.value);
    //     date(this.date);
    //   },

    //   handleClear() {
    //     this.date = this.defaultValue ? new Date(this.defaultValue) : new Date();
    //     this.$emit('pick', null);
    //   },

      emit(value, ...args) {
        if (!value) {
          this.$emit('pick', value, ...args);
        } else {
          this.$emit('pick', this.showTime ? clearMilliseconds(value) : clearTime(value), ...args);
        }
        this.userInputDate = null;
        this.userInputTime = null;
      },

      // resetDate() {
      //   this.date = new Date(this.date);
      // },

      showMonthPicker() {
        // this.currentView = 'month';
      },

      showYearPicker() {
        // this.currentView = 'year';
      },

      // XXX: 没用到
      // handleLabelClick() {
      //   if (this.currentView === 'date') {
      //     this.showMonthPicker();
      //   } else if (this.currentView === 'month') {
      //     this.showYearPicker();
      //   }
      // },

      prevMonth() {

        this.date = prevMonth(this.date);
        this.$emit("date-change",this.date)
      },

      nextMonth() {
        this.date = nextMonth(this.date);
        this.$emit("date-change",this.date)
      },

      prevYear() {
        if (this.currentView === 'year') {
          this.date = prevYear(this.date, 10);
        } else {
          this.date = prevYear(this.date);
          this.$emit("date-change",this.date)
        }
      },

      nextYear() {
        if (this.currentView === 'year') {
          this.date = nextYear(this.date, 10);
        } else {
          this.date = nextYear(this.date);
          this.$emit("date-change",this.date)
        }
      },

      handleShortcutClick(shortcut) {
        if (shortcut.onClick) {
          shortcut.onClick(this);
        }
      },

    //   handleTimePick(value, visible, first) {
    //     if (isDate(value)) {
    //       const newDate = this.value ? modifyTime(this.date, value.getHours(), value.getMinutes(), value.getSeconds()) : modifyWithDefaultTime(value, this.defaultTime);
    //       this.date = newDate;
    //       this.emit(this.date, true);
    //     } else {
    //       this.emit(value, true);
    //     }
    //     if (!first) {
    //       this.timePickerVisible = visible;
    //     }
    //   },

    //   handleMonthPick(month) {
    //     if (this.selectionMode === 'month') {
    //       this.date = modifyDate(this.date, this.year, month, 1);
    //       this.emit(this.date);
    //     } else {
    //       this.date = changeYearMonthAndClampDate(this.date, this.year, month);
    //       // TODO: should emit intermediate value ??
    //       // this.emit(this.date);
    //       this.currentView = 'date';
    //     }
    //   },

      handleDatePick(value,event,row,celltd) {

        if (this.selectionMode === 'day') {
            this.value=value;
            this.date = this.value ? modifyDate(this.date, value.getFullYear(), value.getMonth(), value.getDate()) : modifyWithDefaultTime(value, this.defaultTime);
            this.$emit('pick',value,event,row,celltd);
        //   this.emit(this.date, this.showTime);
        } else if (this.selectionMode === 'week') {
        //   this.emit(value.date);
        }
      },

    //   handleYearPick(year) {
    //     if (this.selectionMode === 'year') {
    //       this.date = modifyDate(this.date, year, 0, 1);
    //       this.emit(this.date);
    //     } else {
    //       this.date = changeYearMonthAndClampDate(this.date, year, this.month);
    //       // TODO: should emit intermediate value ??
    //       // this.emit(this.date, true);
    //       this.currentView = 'month';
    //     }
    //   },

    //   changeToNow() {
    //     // NOTE: not a permanent solution
    //     //       consider disable "now" button in the future
    //     if (!this.disabledDate || !this.disabledDate(new Date())) {
    //       this.date = new Date();
    //       this.emit(this.date);
    //     }
    //   },

    //   confirm() {
    //     const date = this.value ? this.date : modifyWithDefaultTime(this.date, this.defaultTime);
    //     this.emit(date);
    //   },

    //   resetView() {
    //     if (this.selectionMode === 'month') {
    //       this.currentView = 'month';
    //     } else if (this.selectionMode === 'year') {
    //       this.currentView = 'year';
    //     } else {
    //       this.currentView = 'date';
    //     }
    //   },

    //   handleEnter() {
    //     document.body.addEventListener('keydown', this.handleKeydown);
    //   },

    //   handleLeave() {
    //     this.$emit('dodestroy');
    //     document.body.removeEventListener('keydown', this.handleKeydown);
    //   },

    //   handleKeydown(event) {
    //     const keyCode = event.keyCode;
    //     const list = [38, 40, 37, 39];
    //     if (this.visible && !this.timePickerVisible) {
    //       if (list.indexOf(keyCode) !== -1) {
    //         this.handleKeyControl(keyCode);
    //         event.stopPropagation();
    //         event.preventDefault();
    //       }
    //       if (keyCode === 13 && this.userInputDate === null && this.userInputTime === null) { // Enter
    //         this.emit(this.date, false);
    //       }
    //     }
    //   },

    //   handleKeyControl(keyCode) {
    //     const mapping = {
    //       'year': {
    //         38: -4, 40: 4, 37: -1, 39: 1, offset: (date, step) => date.setFullYear(date.getFullYear() + step)
    //       },
    //       'month': {
    //         38: -4, 40: 4, 37: -1, 39: 1, offset: (date, step) => date.setMonth(date.getMonth() + step)
    //       },
    //       'week': {
    //         38: -1, 40: 1, 37: -1, 39: 1, offset: (date, step) => date.setDate(date.getDate() + step * 7)
    //       },
    //       'day': {
    //         38: -7, 40: 7, 37: -1, 39: 1, offset: (date, step) => date.setDate(date.getDate() + step)
    //       }
    //     };
    //     const mode = this.selectionMode;
    //     const year = 3.1536e10;
    //     const now = this.date.getTime();
    //     const newDate = new Date(this.date.getTime());
    //     while (Math.abs(now - newDate.getTime()) <= year) {
    //       const map = mapping[mode];
    //       map.offset(newDate, map[keyCode]);
    //       if (typeof this.disabledDate === 'function' && this.disabledDate(newDate)) {
    //         continue;
    //       }
    //       this.date = newDate;
    //       this.$emit('pick', newDate, true);
    //       break;
    //     }
    //   },

    //   handleVisibleTimeChange(value) {
    //     const time = parseDate(value, this.timeFormat);
    //     if (time) {
    //       this.date = modifyDate(time, this.year, this.month, this.monthDate);
    //       this.userInputTime = null;
    //       this.$refs.timepicker.value = this.date;
    //       this.timePickerVisible = false;
    //       this.emit(this.date, true);
    //     }
    //   },

    //   handleVisibleDateChange(value) {
    //     const date = parseDate(value, this.dateFormat);
    //     if (date) {
    //       if (typeof this.disabledDate === 'function' && this.disabledDate(date)) {
    //         return;
    //       }
    //       this.date = modifyTime(date, this.date.getHours(), this.date.getMinutes(), this.date.getSeconds());
    //       this.userInputDate = null;
    //       this.resetView();
    //       this.emit(this.date, true);
    //     }
    //   },

    //   isValidValue(value) {
    //     return value && !isNaN(value) && (
    //       typeof this.disabledDate === 'function'
    //         ? !this.disabledDate(value)
    //         : true
    //     );
    //   },
    },

    components: {
    //   TimePicker,
    //    YearTable, 
    //    MonthTable, 
       DateTable, 
    },
    props: {
      data:Array,
      renderContent: Function,
      border: Boolean,
      highlight:{
        type: Boolean,
        default: false
      },
      prop:{
        default: 'date'
      },
      disabledDate: '',
      currentmonth:{
        type: Boolean,
        default: false  
      },
      switchmonth:{
        type: Boolean,
        default: false  
      },
      lunarcalendar:{
        type: Boolean,
        default: false  
      },
      defaultValue:null
    },
    data() {
      return {
        popperClass: '',
        date: new Date(),
        value: '',
        // defaultValue: null,
        defaultTime: null,
        showTime: false,
        selectionMode: 'day',
        shortcuts: '',
        visible: false,
        currentView: 'date',
        // disabledDate: '',
        firstDayOfWeek: 7,
        showWeekNumber: false,
        timePickerVisible: false,
        format: '',
        arrowControl: false,
        userInputDate: null,
        userInputTime: null
      };
    },

    computed: {
      year() {
        return this.date.getFullYear();
      },

      month() {
        return this.date.getMonth();
      },

      week() {
        return getWeekNumber(this.date);
      },

      monthDate() {
        return this.date.getDate();
      },

      footerVisible() {
        return this.showTime;
      },

      visibleTime() {
        if (this.userInputTime !== null) {
          return this.userInputTime;
        } else {
          return formatDate(this.value || this.defaultValue, this.timeFormat);
        }
      },

      visibleDate() {
        if (this.userInputDate !== null) {
          return this.userInputDate;
        } else {
          return formatDate(this.value || this.defaultValue, this.dateFormat);
        }
      },

      yearLabel() {
        const yearTranslation = this.t('el.datepicker.year'); //年
        // if (this.currentView === 'year') {
        //   const startYear = Math.floor(this.year / 10) * 10;
        //   if (yearTranslation) {
        //     return startYear + ' ' + yearTranslation + ' - ' + (startYear + 9) + ' ' + yearTranslation;
        //   }
        //   return startYear + ' - ' + (startYear + 9);
        // }
        return this.year + ' ' + yearTranslation;
      },

      timeFormat() {
        if (this.format) {
          return extractTimeFormat(this.format);
        } else {
          return 'HH:mm:ss';
        }
      },

      dateFormat() {
        if (this.format) {
          return extractDateFormat(this.format);
        } else {
          return 'yyyy-MM-dd';
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "./date-picker/date-picker.scss";
@import "./date-picker/iconfont.css";
</style>
