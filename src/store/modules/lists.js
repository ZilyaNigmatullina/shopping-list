export default {
    actions: {
        getLists({commit}) {
            if(localStorage.getItem('lists')) {
                try {
                   let f = JSON.parse(localStorage.getItem('lists'))
                    commit('setList', f);
                } catch(e) {
                    localStorage.removeItem('lists');
                }
            }
        },
        saveLists({state}) {
            const parsed = JSON.stringify(state.lists);
            localStorage.setItem('lists', parsed);
        }
    },
    mutations: {
       setList(state, payload){
            state.lists = payload
        },
        removeList(state, id) {
            let index = state.lists.findIndex(list => list.id === id)
            state.lists.splice(index, 1);
        },
        addList(state, name) {
            let newLst = {id: Date.now(), name: name, items: []}
            state.lists.push(newLst)
        },
        editList(state, editedList) {
            state.lists.find(list => list.id === editedList.id).name = editedList.text
        },
        removeItem(state, remItem) {
            let itemIndex = state.lists.find(
                list => list.id === remItem.listId
            ).items.findIndex(
                item => item.id === remItem.itemId
            )
            state.lists.find(list => list.id === remItem.listId).items.splice(itemIndex, 1)
        },
        addItem(state, newItem) {
            let newItm = {
                id: Date.now(),
                text: newItem.name,
                count: newItem.count,
                measure: newItem['measure'],
                bought: false
            }
            state.lists.find(list => list.id === newItem.id).items.push(newItm)
        },
        editItem(state, editedItem) {
            let lst = state.lists.find(
                list => list.id === editedItem.listId
            )
            if (lst) {
                let itm = lst.items.find(
                    item => item.id === editedItem.itemId
                )
                if (itm) {
                    itm.text = editedItem.name
                    itm.count = editedItem.count
                    itm.measure = editedItem['measure']
                }
            }
        },
        buyItem(state, lstId, itm) {
            let lst = state.lists.find(
                list => list.id === lstId
            )
            if (lst) {
                let item = lst.items.find(
                    item => item.id === itm.id
                )
                if (item) {
                    item.bought = itm.bought
                }
            }
        },
    },
    state: {
        lists: [
            {
                id: 1, name: 'Химия', items: [
                    {id: 11, text: 'порошок', count: 1, measure: 'шт', bought: true},
                    {id: 12, text: 'мыло', count: 1, measure: 'шт', bought: false},
                    {id: 13, text: 'шампунь', count: 1, measure: 'шт', bought: false},
                    {id: 14, text: 'гель для душа', count: 1, measure: 'шт', bought: false}
                ]
            },
            {
                id: 2, name: 'Продукты', items: [
                    {id: 21, text: 'молоко', count: 1, measure: 'шт', bought: false},
                    {id: 22, text: 'хлеб', count: 1, measure: 'шт', bought: false}
                ]
            },
            {
                id: 3, name: 'Машина', items: [
                    {id: 32, text: 'ооллл', count: 1, measure: 'шт', bought: false}
                ]
            },
        ],
    },
    getters: {
        allLists(state) {
            return state.lists
        },
        listById: state => id => {
            console.log(id, !!state.lists)
            return state.lists ? state.lists.find(list => list.id === id) : null
        }
    },
}