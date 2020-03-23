import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import HitroUtils from '../utils';

Vue.use(Vuex);

const store = new Vuex.Store({
      state: {
        selectedCourse: '',
        lectureItems: {},
        availableCourses: [],
        canteen: [],
      },
      mutations: {
        updateLectureItems(state, newItems) {
          state.lectureItems = newItems;
          localStorage.setItem('lectureItems-' + state.selectedCourse,
              JSON.stringify(newItems));
        },
        updateAvailableCourses(state, newAvailableCourses) {
          state.availableCourses = newAvailableCourses;
          localStorage.setItem('availableCourses',
              JSON.stringify(newAvailableCourses));
        },
        setSelectedCourse(state, newSelectedCourse) {
          state.selectedCourse = newSelectedCourse;
          localStorage.setItem('selectedCourse', newSelectedCourse);
        },
        setCanteen(state, newCanteen) {
          state.canteen = newCanteen;
          localStorage.setItem('canteen', JSON.stringify(newCanteen));
        },
      },
      actions: {
        updateLectureItems({state, commit}) {
          return new Promise((resolve, reject) => {
            axios.get(
                'https://stuv-mosbach.de/survival/api.php?action=getLectures&course=' +
                state.selectedCourse).then(response => {
              commit('updateLectureItems', response.data);
              resolve();
            }).catch(error => reject(error));
          });
        },
        clearLectureItems({state, commit}) {
          return new Promise((resolve, reject) => {
            commit('updateLectureItems',
                HitroUtils.clearModifiedCourseDays(state.lectureItems));
            resolve();
          }).catch(error => reject(error));
        },
        updateAvailableCourses({commit}) {
          return new Promise((resolve, reject) => {
            axios.get('https://stuv-mosbach.de/survival/api.php?action=getCourses').
                then(response => {
                  commit('updateAvailableCourses', response.data);
                  resolve();
                }).
                catch(error => reject(error));
          });
        },
        updateCanteen({commit}) {
          return new Promise((resolve, reject) => {
            axios.get('/canteen.php').then(response => {
              commit('setCanteen', response.data);
              resolve();
            }).catch(error => reject(error));
          });
        },
        setSelectedCourse({commit}, newSelectedCourse) {
          return new Promise((resolve, reject) => {
            commit('setSelectedCourse', newSelectedCourse);
            resolve();
          });
        },
        checkForOfflineData({state, commit}) {
          return new Promise((resolve, reject) => {
            let selectedCourseFromStorage = localStorage.getItem('selectedCourse');
            if (selectedCourseFromStorage !== null) {
              commit('setSelectedCourse', selectedCourseFromStorage);
              let lectureItemsFromStorage = localStorage.getItem(
                  'lectureItems-' + selectedCourseFromStorage);
              if (lectureItemsFromStorage !== null) {
                commit('updateLectureItems', JSON.parse(lectureItemsFromStorage));
              }
            }
            let canteen = localStorage.getItem('canteen');
            if (canteen !== null) {
              commit('setCanteen', JSON.parse(canteen));
            }
            resolve();
          });
        },
      },
      getters: {
        selectedCourse: state => state.selectedCourse,
        availableCourses: state => state.availableCourses,
        canteen: state => state.canteen,
        lectureItems: state => HitroUtils.formatCourseDays(state.lectureItems),
      },
    })
;

export default store;

