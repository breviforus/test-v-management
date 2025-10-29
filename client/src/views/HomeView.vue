<template>
  <div class="home">
    <h1>Vacation Management System</h1>
    <p>Choose your role:</p>
    <div class="roles">
      <router-link to="/requester" class="role-card">
        <h2>Requester</h2>
        <p>Submit and track vacation requests</p>
      </router-link>
      <router-link to="/validator" class="role-card">
        <h2>Validator</h2>
        <p>Review and approve requests</p>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home { text-align: center; padding: 40px 20px; }
h1 { color: #1976d2; }
.roles { display: flex; justify-content: center; gap: 30px; margin-top: 40px; flex-wrap: wrap; }
.role-card { background: white; border: 2px solid #1976d2; padding: 40px; width: 280px; text-decoration: none; color: inherit; border-radius: 12px; transition: all 0.3s; }
.role-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(25,118,210,0.3); }
.role-card h2 { color: #1976d2; }
</style>
