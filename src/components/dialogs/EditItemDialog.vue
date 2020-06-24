<template>
    <v-dialog v-model="isOpen" max-width="600px">

        <v-card>
            <v-card-title>
                <span class="headline"> Редактировать элемент списка "{{editedItem.text}}" </span>
            </v-card-title>

            <v-card-text>
                <v-row>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                                label="Продукт"
                                outlined
                                dense
                                v-model="editedItem.text"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                                label="Кол-во"
                                outlined
                                dense
                                v-model="editedItem.count"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                        <v-select
                                :items="measure"
                                outlined
                                dense
                                v-model="editedItem['measure']"
                        ></v-select>
                    </v-col>

                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeEditItemDialog">Закрыть</v-btn>
                    <v-btn color="blue darken-1"
                           text
                           @click="editItem(
                                   listId.id,
                                   editedItem.id,
                                   editedItem.text,
                                   editedItem.count,
                                   editedItem['measure']
                                  )"
                    >Сохранить
                    </v-btn>
                </v-card-actions>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "EditItemDialog",
        props: {
            isOpen: {
                type: Boolean,
                default: false
            },
            listId: Number,
            editedItem: {}
        },
        data: () => ({
            measure: ['шт', 'кг', 'л'],
        }),
        methods: {
            closeEditItemDialog() {
                this.$emit('closeEditItemDialog', false)
            },
            editItem(listId, itemId, editedItemName, editedItemCount, editedItemMeasure) {
                this.$store.commit(
                    'editItem', {
                        listId: listId,
                        itemId: itemId,
                        text: editedItemName,
                        count: editedItemCount,
                        measure: editedItemMeasure
                    },
                )
                this.closeEditItemDialog()
            }
        }
    }
</script>

<style scoped>

</style>