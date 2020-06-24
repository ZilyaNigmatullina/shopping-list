<template>
    <v-container>
        <v-row>
            <v-col cols="1"></v-col>

            <v-col cols="3">
                <ToBuyLists></ToBuyLists>
            </v-col>

            <v-col cols="8">
                <v-row>
                    <ToBuyListsItems></ToBuyListsItems>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ToBuyListsItems from "./ToBuyListsItems";
    import ToBuyLists from "./ToBuyLists";

    export default {
        name: "HomePage",

        components: {
            ToBuyLists,
            ToBuyListsItems
        },
    }
</script>

<style scoped>

</style>