<template>
    <v-dialog v-model="isOpen" max-width="600px">

        <v-card>
            <v-card-title>
                <span class="headline"> Добавить новый элемент в список </span>
            </v-card-title>

            <v-card-text>
                <v-row>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                                label="Продукт"
                                outlined
                                dense
                                v-model="newItem.name"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="4">
                        <v-text-field
                                label="Кол-во"
                                outlined
                                dense
                                v-model="newItem.count"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                        <v-select
                                :items="measure"
                                outlined
                                dense
                                v-model="newItem['measure']"
                        ></v-select>
                    </v-col>

                </v-row>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeAddItemDialog">Закрыть</v-btn>
                    <v-btn color="blue darken-1"
                           text
                           @click="addNewItem(
                                   listId,
                                   newItem.name,
                                   newItem.count,
                                   newItem.measure)"
                    >Добавить
                    </v-btn>
                </v-card-actions>

            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "AddNewItemDialog",
        props: {
            isOpen: {
                type: Boolean,
                default: false
            },
            listId: Number,
            newItem: {}
        },

        data: () => ({
            measure: ['шт', 'кг', 'л'],
        }),
        methods: {
            addNewItem(listId, newItemName, newItemCount, newItemMeasure) {
                this.$store.commit(
                    'addItem', {
                        id: listId, name: newItemName, count: newItemCount, measure: newItemMeasure
                    });
                this.closeAddItemDialog()
            },
            closeAddItemDialog() {
                this.$emit('closeAddNewItemDialog', false)
            },
        }
    }
</script>

<style scoped>

</style>