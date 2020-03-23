<template>
    <main class="lectures">
        <template v-if="lectureItems">
            <header class="header lectures__header">
                <router-link tag="h1" class="header__headline" to="/select">{{ selectedCourse }}</router-link>
            </header>
            <div class="lectures__items">
                <Lecture v-for="(day, index) in lectureItems" :day="day" :key="index"/>
            </div>
        </template>
    </main>
</template>

<script>
    import Lecture from "../components/Lecture";
    import {mapGetters} from "vuex"
    import CourseSelection from "./CourseSelection";

    export default {
        name: "Home",
        components: {CourseSelection, Lecture},
        computed: mapGetters(['selectedCourse', 'lectureItems']),
        mounted() {
            let _this = this;
            _this.$store.dispatch('checkForOfflineData').then(() => {
                if (_this.selectedCourse !== '') {
                    _this.$store.dispatch('updateLectureItems');
                } else {
                    _this.$store.dispatch('updateAvailableCourses').then(() => {
                        _this.$router.push('/select');
                    })
                }
            });
        },
        methods: {
            updateLectureItems() {
                let _this = this;
                _this.$store.dispatch('updateLectureItems');
            },
            clearModifiedLectureItems() {
                let _this = this;
                _this.$store.dispatch('clearLectureItems');
            }
        }
    }
</script>
