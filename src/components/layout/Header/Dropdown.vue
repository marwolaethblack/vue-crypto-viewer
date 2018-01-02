<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      <slot name="dropDownName"></slot>{{ currentSelection }}
    </a>

    <div class="navbar-dropdown ">
      <a class="navbar-item" v-for="item in dropDownData" :key="item" @click="changeSelection(item)">
        {{ item }}
      </a>
    </div>
  </div>
</template>

<script>


  export default {
    props: ['currentSelection', 'changeSelection', 'dropDownData']
  }
</script>

<style>

</style>
