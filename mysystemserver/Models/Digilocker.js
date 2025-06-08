const mongoose = require('mongoose');

const SubjectGradeSchema = new mongoose.Schema({
  subject: String,
  grade: String
});

const DigilockerSchema = new mongoose.Schema({
  cert_id: { type: String, required: true, unique: true },
  mothers_name: String,
  name: String,
  percentage: String,
  roll_number: String,
  subject_grades: [
    { subject: String, grade: String }
],
  total_marks: String,
  digilocker_user_id: { type: String, required: false },
  digilocker_password: { type: String, required: false },
  document_type: { type: String, required: false },
  data: { type: String, required: false },
  content_type: { type: String, required: false },
});

module.exports = mongoose.model('Digilocker', DigilockerSchema);
// module.exports = mongoose.model('Subject', SubjectGradeSchema);
// Export both in one object
// module.exports = {
//     Digilocker: mongoose.model('Digilocker', DigilockerSchema),
//     Subject: mongoose.model('Subject', SubjectGradeSchema) // Only if used independently
//   };
