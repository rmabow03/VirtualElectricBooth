INSERT INTO users (thai_id, phone) VALUES ('1234567890123', '0812345678');

-- Insert OTP requests
INSERT INTO otp_requests (thai_id, otp_code) VALUES ('1234567890123', '123456');

-- Insert votes (as an example)
INSERT INTO votes (thai_id, selected_option) VALUES ('1234567890123', 'Candidate 1');

-- Insert a candidate (optional)
INSERT INTO candidates (name, party) VALUES ('John Doe', 'Democratic Party');