<template>
  <div class="container">
    <h1 class="title">Virtual Election Booth</h1>

    <div class="info-box">
      <p><strong>Election Date:</strong> November 8, 2025</p>
      <p><strong>Voting Time:</strong> 8:00 AM - 8:00 PM</p>
      <p><strong>Rules:</strong> Each voter can vote once. Ensure your identity verification before voting.</p>
      <button class="vote-button" @click="navigateToVote">Vote Now</button>
    </div>

    <div class="candidates-list">
      <div v-for="candidate in candidates" :key="candidate._id" class="candidate-card">
        <img v-if="candidate.image" :src="candidate.image" :alt="candidate.name" class="candidate-image" />
        <div class="candidate-info">
          <h2>{{ candidate.name }}</h2>
          <p><strong>Party:</strong> {{ candidate.party }}</p>
          <p><strong>Policies:</strong> {{ candidate.bio }}</p>
          <p class="vote-score">
            คะแนน: {{ candidate.voteCount.toLocaleString() }} โหวต
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      candidates: [],
      votes: {},
      voteInterval: null
    };
  },
  mounted() {
    // ตรวจสอบ token และ thaiId
    const voteToken = localStorage.getItem('voteToken');
    const thaiId = localStorage.getItem('thaiId');

    if (!voteToken || !thaiId) {
      // ถ้าผู้ใช้ไม่ได้ล็อกอินให้พาไปหน้า Login
      this.$router.push('/login');
    }

    this.fetchCandidates();
    // this.fetchVotes();
    // this.voteInterval = setInterval(this.fetchVotes, 2000); // ดึงคะแนนทุก 2 วินาที
  },
  beforeUnmount() {
    clearInterval(this.voteInterval); // ล้าง interval เมื่อ component ถูกถอด
  },
  methods: {
    async fetchCandidates() {
      try {
        const response = await axios.get('http://localhost:3000/api/candidate/candidates');
        this.candidates = response.data;
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    },
    // async fetchVotes() {
    //   try {
    //     const response = await axios.get('http://localhost:3000/api/vote');
    //     const voteData = response.data;

    //     // Aggregate vote count by candidateId
    //     const voteCounts = voteData.reduce((acc, vote) => {
    //       acc[vote.candidateId] = (acc[vote.candidateId] || 0) + 1;
    //       return acc;
    //     }, {});

    //     this.votes = voteCounts;
    //   } catch (error) {
    //     console.error('Error fetching votes:', error);
    //   }
    // },
    navigateToVote() {
      this.$router.push("/vote");
    },
    navigateToMoreDetails(candidateId) {
      this.$router.push(`/candidate/${candidateId}`);
    },
    async submitVote(candidateId) {
      try {
        const voteToken = localStorage.getItem('voteToken');
        const thaiId = localStorage.getItem('thaiId');

        const response = await axios.post('http://localhost:3000/api/vote/vote', {
          candidateId,
          voteToken,
          thaiId
        });

        if (response.status === 200) {
          // Refresh vote count after successful vote
          this.fetchVotes();
        }
      } catch (error) {
        console.error('Error submitting vote:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(to right, #eef2f3, #ffffff);
  border-radius: 12px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #222;
  margin-bottom: 40px;
}

.info-box {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.info-box p {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.vote-button {
  background-color: #0069d9;
  color: white;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 17px;
  transition: background-color 0.3s;
}

.vote-button:hover {
  background-color: #004a9f;
}

.candidates-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.candidate-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.candidate-image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #007bff;
}

.candidate-info {
  font-size: 16px;
  color: #333;
}

.vote-score {
  margin-top: 12px;
  font-size: 20px;
  font-weight: bold;
  color: #28a745;
}

.details-button {
  margin-top: 18px;
  background-color: #28a745;
  color: white;
  padding: 10px 18px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-size: 16px;
  transition: background-color 0.3s;
}

.details-button:hover {
  background-color: #218838;
}
</style>
