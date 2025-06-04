<template>
  <div class="vote-container">
    <h1 class="title">Vote for Your Candidate</h1>

    <div class="candidates-grid">
      <label v-for="candidate in candidates" :key="candidate._id" :for="'candidate-' + candidate._id"
        class="candidate-card">
        <input type="radio" :id="'candidate-' + candidate._id" v-model="selectedCandidate" :value="candidate.candidateId"
          class="hidden-radio" />

        <div :class="['card-content', { selected: selectedCandidate === candidate._id }]">
          <h2>{{ candidate.name }}</h2>
          <p><strong>Party:</strong> {{ candidate.party }}</p>
        </div>
      </label>
    </div>

    <button :disabled="hasVoted || !selectedCandidate" @click="voteForCandidate" class="vote-button">
      Vote Now
    </button>

    <p v-if="hasVoted" class="voted-message">You have already voted.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCandidate: null,
      candidates: [],
      voteToken: '',       // token เฉพาะของผู้ใช้
      thaiId: '',          // token เฉพาะของผู้ใช้
      hasVoted: false,
    };
  },
  methods: {
    // ฟังก์ชันตรวจสอบว่าผู้ใช้โหวตไปแล้วหรือยัง
    async checkIfVoted() {
      try {
        const res = await axios.post('http://localhost:3000/api/vote/check-token', {
          voteToken: this.voteToken,
          thaiId: this.thaiId
        });
        if (res.data.voted) {
          this.hasVoted = true;
        } else {
          this.hasVoted = false;
        }
      } catch (error) {
        console.error('Error checking vote token:', error.response);
      }
    },

    // ฟังก์ชันสำหรับโหวต
    async voteForCandidate() {
      if (!this.selectedCandidate || this.hasVoted) return;

      try {
        // แก้ไขให้ส่งข้อมูลไปตามที่ต้องการ
        const response = await axios.post('http://localhost:3000/api/vote/vote', {
          candidateId: this.selectedCandidate,   // ส่งค่า candidateId
          voteToken: this.voteToken,              // ส่งค่า voteToken
          thaiId: this.thaiId                     // ส่งค่า thaiId
        });

        alert('ขอบคุณที่โหวต!');
        this.$router.push('/confirmation');
      } catch (error) {
        console.error('Vote error:', error);
        alert('โหวตไม่สำเร็จ');
      }
    },

    // ฟังก์ชันดึงข้อมูลผู้สมัคร
    async fetchCandidates() {
      try {
        const res = await axios.get('http://localhost:3000/api/candidate/candidates');
        this.candidates = res.data;
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    },
  },

  // เมื่อคอมโพเนนต์ถูก mount
  mounted() {
    this.voteToken = localStorage.getItem('voteToken') || 'จากการ login หรือ route params';
    this.thaiId = localStorage.getItem('thaiId') || 'จากการ login หรือ route params';

    if (this.voteToken && this.thaiId) {
      this.checkIfVoted();  // ตรวจสอบการโหวต
    } else {
      // ถ้าผู้ใช้ไม่ได้ล็อกอินให้พาไปหน้า Login
      this.$router.push('/login');
    }

    this.fetchCandidates();  // ดึงข้อมูลผู้สมัคร
  }
};
</script>


<style scoped>
.vote-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
  background: #fdfdfd;
}

.title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.candidates-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.candidate-card {
  cursor: pointer;
  display: block;
  text-decoration: none;
}

.hidden-radio {
  display: none;
}

.card-content {
  border: 2px solid #e0e0e0;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  transition: all 0.3s ease;
  text-align: center;
}

.card-content.selected {
  border-color: #28a745;
  background-color: #eaffed;
}

.vote-button {
  margin-top: 30px;
  padding: 12px 25px;
  background-color: #28a745;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.vote-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.voted-message {
  margin-top: 20px;
  text-align: center;
  color: #c0392b;
  font-weight: bold;
}
</style>
