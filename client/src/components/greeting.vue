<template>
<p>
  {{ count ? 'Hello,'&this.greetingName : null}}
  </p>
</template>

<script>

export default {
    props: {
        greetingName: String
    },
    computed: {
    count () {
        console.log('state: '&this.store.state.signedIn);
      return this.store.state.signedIn;
    }
    }

}
</script>

<style>

</style>