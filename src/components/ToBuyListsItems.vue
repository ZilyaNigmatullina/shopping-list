<template>
    <div v-if="!$route.params.id"> Выберите список</div>
    <div v-else-if="listById">
        <v-card>

            <v-card-title>
                {{ listById.name}}
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Поиск"
                        single-line
                        hide-details
                        dense
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                        fab
                        dark
                        small
                        color="indigo"
                        @click="openAddItemDialog"
                        title="Добавить новый элемент"
                >
                    <v-icon fub large> mdi-plus</v-icon>
                </v-btn>
            </v-card-title>

            <v-data-table
                    :headers="headers"
                    :items="sortListItemsById"
                    :search="search"
                    class="elevation-1"
                    :footer-props="{
                             'items-per-page-text':'Строк на странице',
                             'items-per-page-all-text':'Все',
                             'page-text':' '}"
            >
                <template v-slot:body="{ items }">
                    <tbody>
                    <tr :style="`background: ${item.bought ? 'darkgrey' : ''}`" v-for="item in items" :key="item.id">
                        <td align="center">
                            <v-checkbox
                                    color="grey"
                                    v-model="item.bought"
                                    @click:append="toBuyItem(listById.id, item)"
                            ></v-checkbox>
                        </td>
                        <td>
                            {{item.text}}
                        </td>
                        <td align="center">
                            {{item.count}}
                        </td>
                        <td align="center">
                            {{item.measure}}
                        </td>
                        <td align="center">
                            <v-icon
                                    small
                                    class="mr-2"
                                    @click="openEditItemDialog(item)"
                            >
                                mdi-pencil
                            </v-icon>

                            <v-icon
                                    small
                                    @click="deleteItem(listById.id,item.id)"
                            >
                                mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-data-table>

        </v-card>

        <EditItemDialog :is-open="editItemDialog.open"
                        @closeEditItemDialog="value => editItemDialog.open = value"
                        :editedItem="editItemDialog.item"
                        :listId="listById.id"> </EditItemDialog>

        <AddNewItemDialog :is-open="addNewItemDialog.open"
                          @closeAddNewItemDialog="value => addNewItemDialog.open = value"
                          :newItem="addNewItemDialog"
                          :listId="listById.id"></AddNewItemDialog>

    </div>
</template>

<script>


    import AddNewItemDialog from "./dialogs/AddNewItemDialog";
    import EditItemDialog from "./dialogs/EditItemDialog";

    export default {
        name: "ToBuyListsItems",
        components: {EditItemDialog, AddNewItemDialog},
        data: () => ({
            search: '',
            headers: [
                {text: '', value: 'bought', sortable: false, align: 'center'},
                {text: 'Продукт', value: 'text',},
                {text: 'Количество', value: 'count', sortable: false, align: 'center'},
                {text: '', value: 'measure', sortable: false, align: 'center'},
                {text: '', value: 'actions', sortable: false, align: 'center'},
            ],
            editItemDialog: {
                open: false,
                item: [],
                name: '',
                count: '',
                measure: null
            },
            addNewItemDialog: {
                open: false,
                item: [],
                name: '',
                count: '',
                measure: null
            },
        }),

        computed: {
            routeId() {
                return this.$route.params.id
            },
            listById() {
                return this.routeId ? this.$store.getters.listById(this.routeId) : null
            },
            sortListItemsById() {
                let arr = this.listById.items.slice()
                return arr.sort((a, b) => {
                    if (a.bought && !b.bought) {
                        return 1
                    } else if (!a.bought && b.bought) {
                        return -1
                    }
                    return 0
                })
            }
        },

        methods: {
            openEditItemDialog(item) {
                this.editItemDialog.name = item.text
                this.editItemDialog.count = item.count
                this.editItemDialog.measure = item['measure']
                this.editItemDialog.open = true
                this.editItemDialog.item = item
            },
            openAddItemDialog(item) {
                this.addNewItemDialog.name = item.text
                this.addNewItemDialog.count = item.count
                this.addNewItemDialog.measure = item['measure']
                this.addNewItemDialog.open = true
                this.addNewItemDialog.item = item
            },

            deleteItem(listId, itemId) {
                this.$store.commit('removeItem', {listId: listId, itemId: itemId});
            },

            toBuyItem(lstId, item) {
                this.$store.commit('buyItem', {lstId: lstId, itm: item})
            },
        },
    }
</script>

<style scoped>

</style>