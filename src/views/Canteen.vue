<template>
    <main class="canteen">
        <header class="header">
            <h1 class="header__headline">Mensa</h1>
        </header>
        <div class="loading-box" v-if="!canteen">
            <p>Lade Mensadaten</p>
        </div>
        <div class="canteen__items" v-if="canteen">
            <div class="canteen__item" v-for="(weekday,index) in canteen" :key="index"
                 :class="{today:isToday(index)}">
                <span class="canteen__headline">{{ index }}</span>
                <span class="canteen__line" v-for="line in weekday">{{ line }}</span>
            </div>
        </div>
    </main>
</template>

<script>
    import {mapGetters} from "vuex";
    import moment from "moment";

    export default {
        name: "Canteen",
        computed: mapGetters(['canteen']),
        methods: {
            isToday(weekday) {
                return moment().format("dddd") === weekday;
            }
        }
    }
</script>
