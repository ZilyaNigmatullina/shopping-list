<template>
    <v-col>
        <v-row>
            <v-btn
                    large
                    dark
                    color="indigo"
                    @click="openAddListDialog"
            >
                Добавить список
            </v-btn>
        </v-row>
        <v-row class="to-buy-lists">
            <v-card title>
                <v-list>

                    <v-list-item-group v-model="list" color="primary">

                        <v-list-item
                                v-for="list in allLists"
                                :key="list.id"
                                :to="{name: 'shoppingList', params: {id: list.id}}"
                        >

                            <v-list-item-content class="lists-text">
                                <v-list-item-title v-text="list.name"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-icon @click="openEditListDialog(list)" color="primary">mdi-pencil</v-icon>
                            </v-list-item-action>

                            <v-list-item-action>
                                <v-icon @click="removeList(list.id)" color="red"> mdi-delete</v-icon>
                            </v-list-item-action>

                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-row>

        <AddListDialog :is-open="addListDialog.open"
                       @closeAddListDialog="value => addListDialog.open = value"></AddListDialog>

        <EditListDialog :is-open="editListDialog.open"
                        @closeEditListDialog="value => editListDialog.open = value"
                        :editedList="editListDialog.list"></EditListDialog>
    </v-col>

</template>

<script>
    import {mapGetters} from "vuex";
    import AddListDialog from "./dialogs/AddListDialog";
    import EditListDialog from "./dialogs/EditListDialog";

    export default {
        name: "ToBuyLists",
        components: {EditListDialog, AddListDialog},
        data: () => ({
            list: null,
            addListDialog: {
                open: false,
                list: []
            },
            editListDialog: {
                open: false,
                list: []
            },
        }),
        computed: mapGetters(['allLists']),

        methods: {
            openEditListDialog(list) {
                this.editListDialog.open = true
                this.editListDialog.list = list
            },
            openAddListDialog(list) {
                this.addListDialog.open = true
                this.addListDialog.list = list
            },
            removeList(id) {
                this.$store.commit('removeList', id);
            },
        },
    }

</script>

<style scoped>
    .to-buy-lists {
        padding-top: 20px;
    }

    .lists-text {
        padding-right: 20px;
    }
</style>