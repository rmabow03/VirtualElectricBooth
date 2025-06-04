-- Drop the existing schema if any
DROP SCHEMA IF EXISTS virtual_election_db;

-- Create a new database for virtual election system
CREATE DATABASE IF NOT EXISTS virtual_election_db;
USE virtual_election_db;

-- Table to store registered voters
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thai_id VARCHAR(13) NOT NULL UNIQUE,
  phone VARCHAR(15) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store OTP codes for login
CREATE TABLE otp_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thai_id CHAR(13) NOT NULL,
  otp_code VARCHAR(6) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (thai_id) REFERENCES users(thai_id) ON DELETE CASCADE
);

-- Table to store votes, including selected candidate/option
CREATE TABLE votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thai_id CHAR(13) NOT NULL,
  selected_option VARCHAR(255) NOT NULL,
  voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (thai_id) REFERENCES users(thai_id) ON DELETE CASCADE
);

-- Table for storing admin users who can log in and view the election results
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP NULL
);

-- Optional: Table to track the number of votes for each candidate (could be useful in an election with many candidates)
CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  party VARCHAR(255),
  total_votes INT DEFAULT 0
);
