<template>
    <div id="hitro">
        <router-view/>
        <div class="imprint">
            <router-link tag="p" to="/imprint">Impressum & Datenschutz</router-link>
            <p>1.0.0</p>
        </div>
        <navigation/>
    </div>
</template>

<script>
  import Navigation from './components/Navigation';

  export default {
    name: 'Hitro',
    components: {Navigation},
    mounted() {
      let _this = this;
      _this.$store.dispatch('checkForOfflineData').then(() => {
        if (_this.selectedCourse !== '') {
          _this.$store.dispatch('updateLectureItems');
        }
        else {
          _this.$store.dispatch('updateAvailableCourses').then(() => {
            _this.$router.push('/select');
          });
        }
        _this.$store.dispatch('updateCanteen');
      });
    },
  };
</script>
