<template>
  <Main
    :firstname="firstname"
    :lastname="lastname"
    :email="email"
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
  }
});

</script>
