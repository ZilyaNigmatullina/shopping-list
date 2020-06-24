<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                      <ToBuyLists> </ToBuyLists>
            </v-col>

            <v-col cols="8">
                <v-row>
                    <router-view></router-view>
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
        created() {
            this.$store.dispatch('getLists')
        },
        beforeDestroy() {
            this.$store.dispatch('saveLists')
        },
    }
</script>

<style scoped>

</style>