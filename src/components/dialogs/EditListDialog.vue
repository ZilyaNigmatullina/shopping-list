<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>

            <v-card-title>
                <span class="headline">Редактировать имя списка "{{editedList.name}}"</span>
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="editListName"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeEditListDialog">Закрыть</v-btn>
                <v-btn color="blue darken-1" text @click="editList(editedList.id)"> Сохранить</v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>

    export default {
        name: "EditListDialog",
        props: {
            isOpen: {
                type: Boolean,
                default: false,
            },
            editedList: {}
        },
        data: () => ({
            editListName: '',
        }),
        methods: {
            editList(id) {
                this.$store.commit('editList', {id: id, text: this.editListName});
                this.closeEditListDialog()
            },
            closeEditListDialog() {
                this.$emit('closeEditListDialog', false)
            },
        }
    }
</script>

<style scoped>

</style>