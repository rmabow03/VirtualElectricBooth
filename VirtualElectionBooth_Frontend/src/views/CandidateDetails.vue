<template>
  <div class="details-container">
    <h1 class="title">Candidate Details</h1>
    <div v-if="candidate" class="details-card">
      <img v-if="candidate.image" :src="candidate.image" :alt="candidate.name" class="candidate-image" />
      <div class="candidate-info">
        <h2>{{ candidate.name }}</h2>
        <p><strong>Party:</strong> {{ candidate.party }}</p>
        <p><strong>Experience:</strong> {{ candidate.experience }}</p>
        <p><strong>Policies:</strong></p>
        <ul>
          <li v-for="policy in candidate.policyDetails" :key="policy">{{ policy }}</li>
        </ul>
      </div>
    </div>
    <button class="back-button" @click="$router.push('/home')">Back to Home</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      candidate: null,
      candidates: [
        { id: 1, name: "John Doe", party: "Democratic Party", experience: "Senator for 10 years", policyDetails: ["Universal Healthcare", "Free Education", "Climate Change Initiatives"], image: "src/assets/candidate1.jpg" },
        { id: 2, name: "Jane Smith", party: "Republican Party", experience: "Governor for 8 years", policyDetails: ["Economic Growth", "Tax Reduction", "Stronger Border Security"], image: "src/assets/candidate1.jpg" },
        { id: 3, name: "Robert Brown", party: "Independent", experience: "Businessman and Philanthropist", policyDetails: ["Social Justice", "Affordable Housing", "Equal Pay"], image: "src/assets/candidate1.jpg" },
        { id: 4, name: "Emily White", party: "Green Party", experience: "Environmental Activist", policyDetails: ["Renewable Energy", "Wildlife Protection", "Zero-Waste Policy"], image: "src/assets/candidate1.jpg" }
      ]
    };
  },
  created() {
    const candidateId = parseInt(this.$route.params.id);
    this.candidate = this.candidates.find(c => c.id === candidateId);
  }
};
</script>

<style scoped>
.details-container {
  text-align: center;
  padding: 20px;
}
.details-card {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  width: 60%;
  margin: auto;
  border-radius: 5px;
  background-color: #fff;
}
.candidate-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 20px;
}
.candidate-info {
  text-align: left;
}
.back-button {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
