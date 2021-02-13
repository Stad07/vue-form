<template>
  <div id="app">
    <Form />
  </div>
</template>

<script>
import Form from './components/Form'

export default {
  name: 'App',
  components: {
    Form
  }
}
</script>

<style lang="scss">
#app {
  widows: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
