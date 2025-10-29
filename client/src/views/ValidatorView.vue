<template>
  <div class="container">
    <div class="header">
      <h1>Validator Dashboard</h1>
      <router-link to="/" class="back-link">← Back</router-link>
    </div>
    <div class="filters">
      <button :class="{ active: filter === null }" @click="filter = null">All</button>
      <button :class="{ active: filter === 'Pending' }" @click="filter = 'Pending'">Pending</button>
      <button :class="{ active: filter === 'Approved' }" @click="filter = 'Approved'">Approved</button>
      <button :class="{ active: filter === 'Rejected' }" @click="filter = 'Rejected'">Rejected</button>
    </div>
    <RequestList :key="filter" title="All Requests" :filter-status="filter" :show-actions="true" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RequestList from '../components/RequestList.vue'

const filter = ref(null)
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.back-link { color: #1976d2; text-decoration: none; font-weight: bold; }
.filters { display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
.filters button { padding: 10px 20px; border: 2px solid #1976d2; background: white; color: #1976d2; border-radius: 4px; cursor: pointer; font-weight: bold; }
.filters button.active { background: #1976d2; color: white; }
</style>
