<template>
  <div class="form-card">
    <h2>Submit Vacation Request</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Start Date *</label>
        <input v-model="form.start_date" type="date" required :min="today" />
      </div>
      <div class="form-group">
        <label>End Date *</label>
        <input v-model="form.end_date" type="date" required :min="form.start_date || today" />
      </div>
      <div class="form-group">
        <label>Reason (optional)</label>
        <textarea v-model="form.reason" rows="3" placeholder="Enter reason..."></textarea>
      </div>
      <button type="submit" :disabled="loading">{{ loading ? 'Submitting...' : 'Submit' }}</button>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="success" class="success">Request submitted!</div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { vacationAPI } from '../services/api';

const props = defineProps({ userId: Number });
const emit = defineEmits(['created']);

const form = ref({ start_date: '', end_date: '', reason: '' });
const loading = ref(false);
const error = ref(null);
const success = ref(false);

const today = computed(() => new Date().toISOString().split('T')[0]);

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;
  success.value = false;
  try {
    await vacationAPI.createRequest({ user_id: props.userId, ...form.value });
    success.value = true;
    form.value = { start_date: '', end_date: '', reason: '' };
    emit('created');
    setTimeout(() => success.value = false, 3000);
  } catch (err) {
    error.value = err.response?.data?.error || 'Failed';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.form-card { background: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
.form-group { margin-bottom: 15px; }
label { display: block; margin-bottom: 5px; font-weight: bold; }
input, textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
button { width: 100%; padding: 12px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px; }
button:disabled { background: #ccc; }
.error { margin-top: 10px; padding: 10px; background: #ffebee; color: #c62828; border-radius: 4px; }
.success { margin-top: 10px; padding: 10px; background: #e3f2fd; color: #1565c0; border-radius: 4px; }
</style>

