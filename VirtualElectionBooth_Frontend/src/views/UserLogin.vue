<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Election Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" required placeholder="Enter your email" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required placeholder="Enter your password" />
        </div>
        <button type="submit" class="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      mockUsers: [
        { email: "a", password: "a" },
        { email: "b", password: "e" },
        { email: "e", password: "a" }, // user ที่คุณใช้ก่อนหน้านี้
      ],
    };
  },
  methods: {
    login() {
      const foundUser = this.mockUsers.find(
        user => user.email === this.email && user.password === this.password
      );

      if (foundUser) {
        localStorage.setItem("currentUser", this.email);
        this.$router.push("/home");
      } else {
        alert("Invalid email or password. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
/* Background */
.login-container {
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

/* Login form */
.login-form {
  background: #ffffff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  text-align: center;
}

/* Title */
.login-form h2 {
  color: #003366;
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: 600;
}

/* Form elements */
.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-group label {
  font-size: 16px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #003366;
  outline: none;
}

/* Button */
.submit {
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

.submit:hover {
  background-color: #005bb5;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .login-form {
    padding: 30px;
  }

  .login-btn {
    padding: 14px;
  }
}
</style>
