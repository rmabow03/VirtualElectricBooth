CREATE DATABASE IF NOT EXISTS virtual_election_db;
USE virtual_election_db;

-- Table to store registered voters
CREATE TABLE voters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thai_id CHAR(13) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  has_voted BOOLEAN DEFAULT FALSE
);

-- Table to store OTP codes for login
CREATE TABLE otp_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thai_id CHAR(13) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (thai_id) REFERENCES voters(thai_id) ON DELETE CASCADE
);

-- Table to store votes (you can expand this based on how many choices/candidates)
CREATE TABLE votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thai_id CHAR(13) NOT NULL,
  selected_option VARCHAR(255) NOT NULL,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (thai_id) REFERENCES voters(thai_id) ON DELETE CASCADE
);

-- Optional: admin table to login and view results
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);
