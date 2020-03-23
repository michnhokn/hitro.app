<template>
    <div v-if="notOver" class="lectures__item lecture" :class="{today:isToday}">
        <span class="lecture__headline">{{ headline }}</span>
        <div class="lecture__items">
            <LectureItem v-for="lecture in day.items" :lecture="lecture" :isToday="isToday"/>
        </div>
    </div>
</template>

<script>
    import LectureItem from "./LectureItem";
    import moment from "moment"

    export default {
        name: "Lecture",
        components: {LectureItem},
        props: {
            day: {
                type: Object,
                required: true
            }
        },
        computed: {
            headline() {
                return moment(this.day.day).format('dddd, DD. MMMM YYYY');
            },
            isToday() {
                return moment(this.day.day).isSame(moment(), 'day');
            },
            notOver() {
                let endDay = this.day.items[this.day.items.length - 1].end_mysql;

                if (moment(this.day.day).isAfter(moment().subtract(1, 'day'))) {
                    return !moment().isAfter(moment(endDay));
                }
                return false;
            }
        }
    }
</script>
