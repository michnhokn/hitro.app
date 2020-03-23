<template>
    <nav class="navigation" :class="{hide:ifSpecificRoute()}">
        <router-link to="/canteen" class="navigation__item">
            <i class="material-icons-outlined">fastfood</i>
            <span>Mensa</span>
        </router-link>
        <router-link to="/" class="navigation__item">
            <i class="material-icons-outlined">event</i>
            <span>Vorlesungen</span>
        </router-link>
    </nav>
</template>

<script>
  export default {
    name: 'Navigation',
    methods: {
      ifSpecificRoute() {
        return this.$route.path === '/select' || this.$route.path === '/imprint';
      },
    },
  };
</script>
