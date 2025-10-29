<template>
  <div class="container">
    <div class="header">
      <h1>Requester Dashboard</h1>
      <router-link to="/" class="back-link">← Back</router-link>
    </div>
    <RequestForm :user-id="1" @created="onCreated" />
    <RequestList ref="list" title="My Requests" :user-id="1" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RequestForm from '../components/RequestForm.vue'
import RequestList from '../components/RequestList.vue'

const list = ref(null)

const onCreated = () => {
  list.value?.fetchRequests()
}
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.back-link { color: #1976d2; text-decoration: none; font-weight: bold; }
</style>
