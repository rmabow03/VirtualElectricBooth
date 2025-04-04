<template>
  <div class="container">
    <button class="Logout" @click="$router.push('/')">Logout</button>
    <h1 class="title">Virtual Election Booth</h1>

    <!-- แสดงจำนวนผู้โหวตรวมแบบเรียลไทม์ -->
    <p class="vote-count">มีผู้โหวตแล้ว: {{ totalVotes.toLocaleString() }} คน</p>

    <div class="info-box">
      <p><strong>Election Date:</strong> November 8, 2025</p>
      <p><strong>Voting Time:</strong> 8:00 AM - 8:00 PM</p>
      <p><strong>Rules:</strong> Each voter can vote once. Ensure your identity verification before voting.</p>
      <button class="vote-button" @click="navigateToVote">Vote Now</button>
    </div>

    <!-- รายชื่อผู้สมัครพร้อมคะแนนแบบเรียลไทม์ -->
    <div class="candidates-list">
      <div v-for="candidate in candidates" :key="candidate.id" class="candidate-card">
        <img v-if="candidate.image" :src="candidate.image" :alt="candidate.name" class="candidate-image" />
        <div class="candidate-info">
          <h2>{{ candidate.name }}</h2>
          <p><strong>Party:</strong> {{ candidate.party }}</p>
          <p><strong>Policies:</strong> {{ candidate.policies }}</p>
          <p class="vote-score">คะแนน: {{ (votes[candidate.id] || 0).toLocaleString() }} โหวต</p>
          <button @click="navigateToMoreDetails(candidate.id)">More Details</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      votes: JSON.parse(localStorage.getItem("votes")) || {}, // โหลดคะแนนจาก localStorage
      candidates: [
        { id: 1, name: "John Doe", party: "Democratic Party", policies: "More jobs, better healthcare", image: "src/assets/candidate1.jpg" },
        { id: 2, name: "Jane Smith", party: "Republican Party", policies: "Lower taxes, strong defense", image: "src/assets/candidate1.jpg" },
        { id: 3, name: "Robert Brown", party: "Independent", policies: "Climate action, public transport", image: "src/assets/candidate1.jpg" },
        { id: 4, name: "Emily White", party: "Green Party", policies: "100% renewable energy", image: "src/assets/candidate1.jpg" }
      ]
    };
  },
  computed: {
    totalVotes() {
      return Object.values(this.votes).reduce((sum, count) => sum + count, 0);
    }
  },
  methods: {
    navigateToVote() {
      this.$router.push("/vote");
    },
    navigateToMoreDetails(candidateId) {
      this.$router.push(`/candidate/${candidateId}`);
    },
    updateVotes() {
      this.votes = JSON.parse(localStorage.getItem("votes")) || {};
    }
  },
  mounted() {
    // อัปเดตคะแนนแบบเรียลไทม์ทุก 2 วินาที
    this.voteInterval = setInterval(this.updateVotes, 2000);
  },
  beforeUnmount() {
    clearInterval(this.voteInterval);
  }
};
</script>

<style scoped>
.Logout{
  background-color: #003366;
  color: white;
  padding: 18px 20px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
}
.container {
  text-align: center;
  padding: 20px;
}
.vote-count {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
.info-box {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.vote-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
.candidates-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
.candidate-card {
  border: 1px solid #ccc;
  padding: 15px;
  width: 280px;
  border-radius: 5px;
  background-color: #fff;
}
.vote-score {
  font-weight: bold;
  color: #28a745;
}
.candidate-image{
  width: 150px;
  height: 150px;
}
</style>
