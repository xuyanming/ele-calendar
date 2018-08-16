// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import app from '../example/main'

Vue.config.productionTip = true

new Vue({
    el: '#app',
    template: '<app/>',
    components: {
        app
    }
})