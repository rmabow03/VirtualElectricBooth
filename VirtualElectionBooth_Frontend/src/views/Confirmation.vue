<template>
  <div class="confirmation-container">
    <h1 class="title">Thank you for voting!</h1>
    <p>Your vote has been successfully recorded.</p>
    <div class="receipt">
      <p><strong>Vote Receipt ID:</strong> {{ receiptId }}</p>
    </div>
    <button class="back-button" @click="goToHome">Back to Home</button>
    <button class="logout-button" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      receiptId: this.generateReceiptId(),
    };
  },
  methods: {
    generateReceiptId() {
      return Math.random().toString(36).substr(2, 9);
    },
    goToHome() {
      this.$router.push("/home");
    },
    logout() {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("hasVoted");
      localStorage.removeItem("votedForCandidate");
      this.$router.push("/login");
    },
  },
};
</script>



  <style scoped>
  .confirmation-container {
    text-align: center;
    padding: 20px;
  }
  
  .receipt {
    margin: 20px 0;
    font-size: 18px;
  }
  
  .back-button,
  .logout-button {
    margin-top: 20px;
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .logout-button {
    background-color: #dc3545;
    margin-left: 10px;
  }
  
  button:hover {
    opacity: 0.8;
  }
  </style>
  