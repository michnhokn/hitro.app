import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Canteen from '../views/Canteen';
import Games from '../views/Games';
import CourseSelection from '../views/CourseSelection';
import Imprint from '../views/Imprint';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'ON17A',
      component: Home,
    },
    {
      path: '/canteen',
      name: 'Mensa',
      component: Canteen,
    },
    {
      path: '/games',
      name: 'Spiele',
      component: Games,
    },
    {
      path: '/select',
      name: 'Kursauswahl',
      component: CourseSelection,
    },
    {
      path: '/imprint',
      name: 'Impressum',
      component: Imprint,
    },
  ],
});
