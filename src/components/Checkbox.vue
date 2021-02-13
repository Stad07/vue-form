<template>
  <div class="form-check-input" id="notification"
    @click="checked"
  >
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  methods: {
    checked () {
      this.$emit('checked')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-check-input {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 4px;
  border: 1px solid $secondary-color;
  box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
}
</style>
