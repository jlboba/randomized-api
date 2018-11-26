SELECT
  cohorts.id AS cohort_id,
  cohorts.name AS cohort_name,
  students.id AS student_id,
  students.name AS student_name,
  students.nickname AS student_nickname,
  students.cohort_id AS students_cohort_id
FROM cohorts
LEFT JOIN students
  ON students.cohort_id = cohorts.id
