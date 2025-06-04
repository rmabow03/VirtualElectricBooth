<template>
  <div class="otp-container">
    <div class="otp-form">
      <h2>ยืนยันตัวตน</h2>
      <p>กรุณากรอกเลข OTP 6 หลักที่ส่งไปยังหมายเลขโทรศัพท์ของคุณ</p>
      <div class="otp-inputs">
        <input v-for="(digit, index) in 6" :key="index" type="text" maxlength="1" v-model="otp[index]"
          @input="focusNext(index, $event)" />
      </div>
      <button @click="submitOtp" class="submit">ยืนยัน OTP</button>
      
      <!-- ปุ่ม "ขอ OTP อีกครั้ง" -->
      <button v-if="canRequestOtp" @click="requestOtp" class="request-otp">ขอ OTP อีกครั้ง</button>

      <p v-if="message" :style="{ color: isError ? 'red' : 'green' }">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      otp: ['', '', '', '', '', ''],
      message: '',
      isError: false,
      thaiId: '', // รับจาก query
      canRequestOtp: true, // ตัวแปรสำหรับกำหนดว่าให้ขอ OTP ได้หรือไม่
    }
  },
  mounted() {
    this.thaiId = this.$route.query.thaiId || ''
    console.log('thaiId:', this.thaiId)
  },
  methods: {
    focusNext(index, event) {
      if (event.inputType !== 'deleteContentBackward' && event.target.value && index < 5) {
        event.target.nextElementSibling?.focus()
      }
    },
    async submitOtp() {
      const code = this.otp.join('');
      if (code.length === 6 && /^\d+$/.test(code)) {
        try {
          const response = await axios.post(
            'http://localhost:3000/api/auth/verify-otp',
            {
              thaiId: this.thaiId,
              otp: code
            },
            {
              withCredentials: true // ส่งคุกกี้ไปด้วย
            }
          );

          // ตรวจสอบว่า API ส่งข้อความกลับมา
          if (response.data && response.data.message) {
            this.message = response.data.message;
            this.isError = false;

            // เก็บข้อมูลใน localStorage หลังจาก OTP ถูกต้อง
            localStorage.setItem('voteToken', response.data.token);  // เก็บ token
            localStorage.setItem('thaiId', this.thaiId);  // เก็บ Thai ID

            setTimeout(() => {
              this.$router.push({ name: 'Home' }); // เปลี่ยนหน้าไปที่หน้า Home หลังจาก OTP ถูกต้อง
            }, 1000);
          } else {
            this.message = 'ไม่สามารถยืนยัน OTP ได้';
            this.isError = true;
          }
        } catch (error) {
          // ตรวจสอบ error response ที่ละเอียดขึ้น
          if (error.response && error.response.data) {
            this.message = error.response.data.message || 'เกิดข้อผิดพลาด';
          } else {
            this.message = 'เกิดข้อผิดพลาดในการติดต่อเซิร์ฟเวอร์';
          }
          this.isError = true;
        }
      } else {
        this.message = 'กรุณากรอก OTP ให้ครบ 6 หลัก';
        this.isError = true;
      }
    },
    async requestOtp() {
      // ตั้งค่าปุ่มว่าไม่สามารถขอ OTP ได้ในช่วงเวลาหนึ่ง
      this.canRequestOtp = false;

      try {
        const response = await axios.post(
          'http://localhost:3000/api/auth/request-otp',
          {
            thaiId: this.thaiId
          }
        );

        if (response.data && response.data.message) {
          this.message = response.data.message;
          this.isError = false;
        } else {
          this.message = 'ไม่สามารถขอ OTP ใหม่ได้';
          this.isError = true;
        }

        // ให้สามารถขอ OTP ได้อีกครั้งหลังจาก 60 วินาที
        setTimeout(() => {
          this.canRequestOtp = true;
        }, 60000); // 60 วินาที
      } catch (error) {
        this.message = 'เกิดข้อผิดพลาดในการขอ OTP';
        this.isError = true;
        this.canRequestOtp = true;
      }
    }
  }
}
</script>

<style scoped>
/* เหมือนเดิม */
.otp-container {
  height: 100vh;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.otp-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.otp-form h2 {
  font-size: 24px;
  color: #003366;
  margin-bottom: 10px;
}

.otp-form p {
  margin-bottom: 20px;
  font-size: 14px;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.otp-inputs input {
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit {
  background-color: #003366;
  color: white;
  padding: 12px 20px;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

.submit:hover {
  background-color: #005bb5;
}

/* สไตล์ปุ่ม "ขอ OTP อีกครั้ง" */
.request-otp {
  background-color: #ff5c5c;
  color: white;
  padding: 12px 20px;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}

.request-otp:hover {
  background-color: #e74c3c;
}
</style>