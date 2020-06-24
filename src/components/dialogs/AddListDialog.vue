<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">Добавить список </span>
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="newListName"
                              outlined
                              dense
                              label="Имя списка"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddListDialog">Закрыть</v-btn>
                <v-btn color="blue darken-1" text @click="addNewList">Добавить</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "AddListDialog",
        props:{
            isOpen: {
                type: Boolean,
                default: false
            },
        },
        data: () => ({
            newListName: '',
        }),
        methods: {
            addNewList() {
                this.$store.commit('addList', this.newListName)
                this.newListName = ''
                this.closeAddListDialog()
            },
            closeAddListDialog() {
                this.$emit('closeAddListDialog', false)
            },
        }
    }
</script>

<style scoped>

</style>