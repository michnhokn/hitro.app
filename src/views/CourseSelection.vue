<template>
    <main class="course-selection">
        <header class="header">
            <router-link tag="div" to="/" class="header__home" v-if="selectedCourse">
                <i class="material-icons-outlined">home</i>
            </router-link>
            <h1 class="header__headline">Kurs auswählen</h1>
        </header>
        <div class="course-selection__search">
            <label for="course-search">Kurse durchsuchen</label>
            <input id="course-search" autocomplete="off" type="search" v-model="searchString"
                   placeholder="Kurse durchsuchen">
        </div>
        <div class="course-selection__items">
            <div class="course-selection__item" v-for="availableCourse in availableCourses"
                 @click="setCourse(availableCourse)">{{ availableCourse }}
            </div>
        </div>
    </main>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "CourseSelection",
        data() {
            return {
                searchString: ''
            }
        },
        computed: {
            availableCourses() {
                let _this = this;
                return this.$store.getters.availableCourses.filter((course => {
                    return course.toLowerCase().indexOf(_this.searchString.toLowerCase()) > -1
                }))
            },
            ...mapGetters(['selectedCourse'])
        },
        beforeMount() {
            this.$store.dispatch('updateAvailableCourses')
        },
        methods: {
            setCourse(newSelectedCourse) {
                let _this = this;
                _this.$store.dispatch('setSelectedCourse', newSelectedCourse).then(() => {
                    _this.$router.push('/')
                });
            }
        }
    }
</script>