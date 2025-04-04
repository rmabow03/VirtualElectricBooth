<template>
  <div>
    <h1>Vote for Your Candidate</h1>
    <div v-for="candidate in candidates" :key="candidate.id">
      <input type="radio" :id="'candidate-' + candidate.id" v-model="selectedCandidate" :value="candidate.id" />
      <label :for="'candidate-' + candidate.id">
        <img v-if="candidate.image" :src="candidate.image" :alt="candidate.name" class="candidate-image" />
        <div class="candidate-info">
          <h2>{{ candidate.name }}</h2>
          <p><strong>Party:</strong> {{ candidate.party }}</p>
        </div>
      </label>
    </div>

    <button :disabled="hasVoted || !selectedCandidate" @click="voteForCandidate">
      Vote Now
    </button>

    <p v-if="hasVoted">You have already voted.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasVoted: false,
      selectedCandidate: null,
      candidates: [
        { id: 1, name: "John Doe", party: "Democratic Party", image: "src/assets/candidate1.jpg" },
        { id: 2, name: "Jane Smith", party: "Republican Party", image: "src/assets/candidate2.jpg" },
        { id: 3, name: "Robert Brown", party: "Independent", image: "src/assets/candidate3.jpg" },
        { id: 4, name: "Emily White", party: "Green Party", image: "src/assets/candidate4.jpg" },
      ],
    };
  },
  mounted() {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      alert("Please login first.");
      this.$router.push("/login");
    }
    this.checkIfVoted();
  },
  methods: {
    checkIfVoted() {
      this.hasVoted = localStorage.getItem("hasVoted") === "true";
    },
    voteForCandidate() {
      if (!this.selectedCandidate) return;

      localStorage.setItem("hasVoted", "true");
      localStorage.setItem("votedForCandidate", this.selectedCandidate);

      let votes = JSON.parse(localStorage.getItem("votes")) || {};
      votes[this.selectedCandidate] = (votes[this.selectedCandidate] || 0) + 1;
      localStorage.setItem("votes", JSON.stringify(votes));

      alert(`Thank you for voting!`);
      this.$router.push("/confirmation");
    },
  },
};
</script>



<style scoped>
.candidate-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

button {
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:disabled {
  background-color: #ccc;
}

p {
  margin-top: 20px;
  font-size: 16px;
  color: red;
}
</style>
