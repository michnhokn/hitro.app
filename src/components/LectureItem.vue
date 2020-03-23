<template>
    <div class="lecture__item" :class="{modified:lecture.modified}">
        <div class="lecture__info">
            <div class="lecture__info--title">{{ title }}</div>
            <div class="lecture__info--duration">{{ lecture.start_time }} - {{ lecture.end_time }}</div>
        </div>
        <div class="lecture__info">
            <div class="lecture__info--location">{{ lecture.location }}</div>
            <div class="lecture__info--lecturer" v-if="lecture.lecturer">{{ lecture.lecturer }}</div>
        </div>
        <progress class="lecture__progress" :value="currentProgress" :max="maxProgress"></progress>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "LectureItem",
        props: {
            lecture: {
                type: Object,
                required: true
            },
            isToday: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {
                currentProgress: 0,
                maxProgress: 100
            }
        },
        mounted() {
            let _this = this,
                startTime = moment(this.lecture.start_mysql),
                endTime = moment(this.lecture.end_mysql);

            if (_this.isToday) {
                _this.maxProgress = endTime.diff(startTime, 'minutes');
                setInterval(() => {
                    _this.currentProgress = moment().diff(startTime, 'minutes');
                }, 1000)
            }
        },
        computed: {
            title() {
                return this.lecture.name.replace('Vorlesung', '').trim();
            }
        }
    }
</script>
