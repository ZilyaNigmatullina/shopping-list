import Vue from 'vue'
import Router from 'vue-router'
import ToBuyListsItems from "./components/ToBuyListsItems";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'shoppingList',
            path: '/shopping-list/:id',
            component: ToBuyListsItems
        }
    ]
})