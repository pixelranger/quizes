<template>
  <!--Link to compiled style.css-->
  <link rel="stylesheet" href="/quiz_widgets/variant-1/style.css">

  <Main
    :firstname="firstname"
    :lastname="lastname"
    :email="email"
    :settings="settings"
  />
</template>


<script setup>
import { defineProps } from 'vue';
import Main from "@/components/Main.vue";
defineProps({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
  settings: {
    type: Object
  },
});
</script>
