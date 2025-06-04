<template>
  <div class="login-container">
    <div class="login-form">
      <h2>เข้าสู่ระบบเลือกตั้ง</h2>
      <form @submit.prevent="requestOtp">
        <!-- Thai ID Input -->
        <div class="form-group">
          <label for="thaiId">เลขบัตรประชาชน</label>
          <input type="text" id="thaiId" v-model="thaiId" required placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
            maxlength="13" @input="validateThaiId" />
          <p v-if="idError" style="color: red">{{ idError }}</p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit" :disabled="isLoading">
          {{ isLoading ? 'กำลังขอ OTP...' : 'ขอ OTP' }}
        </button>
        <p v-if="message" style="color: green">{{ message }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      thaiId: '',
      message: '',
      idError: '',
      isLoading: false
    }
  },
  methods: {
    // ตรวจสอบเลขบัตรประชาชน
    validateThaiId() {
      if (this.thaiId.length < 13) {
        this.idError = 'เลขบัตรประชาชนต้องมี 13 หลัก';
      } else if (!this.isValidThaiId(this.thaiId)) {
        this.idError = 'เลขบัตรประชาชนไม่ถูกต้อง';
      } else {
        this.idError = '';
      }
    },
    // ฟังก์ชันตรวจสอบเลขบัตรประชาชน (ตัดความซับซ้อน ใช้ตรวจความยาวพอ)
    isValidThaiId(id) {
      return id.length === 13;
    },

    // ฟังก์ชันขอ OTP (LOGIN)
    // async requestOtp() {
    //   if (this.idError || this.thaiId.length !== 13) return;

    //   this.isLoading = true;

    //   try {
    //     const res = await axios.post(
    //       'http://localhost:3000/api/auth/request-otp',
    //       { thaiId: this.thaiId },
    //       { withCredentials: true }  // ต้องเพิ่มบรรทัดนี้
    //     );

    //     this.message = res.data.message;

    //     console.log("User logged in with Thai ID:", this.thaiId);

    //     // เปลี่ยนหน้าไปกรอก OTP โดยส่ง thaiId ไปเป็น query
    //     this.$router.push({ name: 'Otp', query: { thaiId: this.thaiId } });
    //   } catch (err) {
    //     this.message = err.response?.data?.message || 'เกิดข้อผิดพลาด';
    //   } finally {
    //     this.isLoading = false;
    //   }
    // }
    // ฟังก์ชันขอ OTP (LOGIN)
async requestOtp() {
  if (this.idError || this.thaiId.length !== 13) return;

  this.isLoading = true;

  try {
    const res = await axios.post(
      'http://localhost:3000/api/otp/send-otp',    // 🟢 เปลี่ยนตรงนี้
      { thaiId: this.thaiId },
      { withCredentials: true }
    );

    this.message = res.data.message;

    console.log("User logged in with Thai ID:", this.thaiId);

    // เปลี่ยนหน้าไปกรอก OTP โดยส่ง thaiId ไปเป็น query
    this.$router.push({ name: 'Otp', query: { thaiId: this.thaiId } });
  } catch (err) {
    this.message = err.response?.data?.message || 'เกิดข้อผิดพลาด';
  } finally {
    this.isLoading = false;
  }
}

  }
}
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

.submit:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
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
