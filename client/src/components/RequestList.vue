<template>
  <div>
    <h2>{{ title }}</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="requests.length === 0">No requests found</div>
    <div v-else class="grid">
      <div v-for="req in requests" :key="req.id" class="card" :class="`status-${req.status.toLowerCase()}`">
        <div class="header">
          <span>#{{ req.id }}</span>
          <span class="badge">{{ req.status }}</span>
        </div>
        <p><strong>Start:</strong> {{ req.start_date }}</p>
        <p><strong>End:</strong> {{ req.end_date }}</p>
        <p v-if="req.reason"><strong>Reason:</strong> {{ req.reason }}</p>
        <p v-if="req.comments"><strong>Comments:</strong> {{ req.comments }}</p>
        <div v-if="showActions && req.status === 'Pending'" class="actions">
          <button @click="approve(req.id)" class="btn-approve">Approve</button>
          <button @click="openReject(req.id)" class="btn-reject">Reject</button>
        </div>
      </div>
    </div>
    <div v-if="rejectDialog" class="modal" @click="closeReject">
      <div class="modal-content" @click.stop>
        <h3>Reject Request</h3>
        <textarea v-model="comments" rows="3" placeholder="Comments..."></textarea>
        <div class="modal-actions">
          <button @click="confirmReject">Confirm</button>
          <button @click="closeReject">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { vacationAPI } from '../services/api';

const props = defineProps({
  title: String,
  userId: Number,
  filterStatus: String,
  showActions: Boolean
});

const requests = ref([]);
const loading = ref(false);
const rejectDialog = ref(false);
const rejectingId = ref(null);
const comments = ref('');

const fetchRequests = async () => {
  loading.value = true;
  try {
    const res = props.userId
      ? await vacationAPI.getUserRequests(props.userId)
      : await vacationAPI.getAllRequests(props.filterStatus);
    requests.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const approve = async (id) => {
  await vacationAPI.updateStatus(id, { status: 'Approved', comments: '' });
  fetchRequests();
};

const openReject = (id) => {
  rejectingId.value = id;
  rejectDialog.value = true;
};

const closeReject = () => {
  rejectDialog.value = false;
  comments.value = '';
};

const confirmReject = async () => {
  await vacationAPI.updateStatus(rejectingId.value, { status: 'Rejected', comments: comments.value });
  closeReject();
  fetchRequests();
};

onMounted(fetchRequests);
defineExpose({ fetchRequests });
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
.card { background: white; border: 2px solid #ddd; border-radius: 8px; padding: 15px; }
.status-pending { border-color: #ff9800; }
.status-approved { border-color: #4caf50; }
.status-rejected { border-color: #f44336; }
.header { display: flex; justify-content: space-between; margin-bottom: 10px; }
.badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
.status-pending .badge { background: #fff3e0; color: #e65100; }
.status-approved .badge { background: #e8f5e9; color: #1b5e20; }
.status-rejected .badge { background: #ffebee; color: #b71c1c; }
.actions { display: flex; gap: 10px; margin-top: 10px; }
.btn-approve, .btn-reject { flex: 1; padding: 8px; color: white; border: none; border-radius: 4px; cursor: pointer; }
.btn-approve { background: #4caf50; }
.btn-reject { background: #f44336; }
.modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 999; }
.modal-content { background: white; padding: 20px; border-radius: 8px; max-width: 400px; width: 90%; }
textarea { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin: 10px 0; }
.modal-actions { display: flex; gap: 10px; }
.modal-actions button { flex: 1; padding: 10px; border: none; border-radius: 4px; cursor: pointer; }
.modal-actions button:first-child { background: #f44336; color: white; }
.modal-actions button:last-child { background: #ddd; }
</style>
