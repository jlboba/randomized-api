SELECT
  lists.id AS list_id,
  lists.name AS list_name,
  students.name AS student_name,
  students.nickname AS student_nickname,
  cohorts.name AS cohort_name,
  list_join.category AS category
FROM lists
LEFT JOIN list_join
  ON lists.id = list_join.list_id
LEFT JOIN students
  ON students.id = list_join.student_id
LEFT JOIN cohorts
  ON cohorts.id = lists.cohort_id
WHERE lists.cohort_id = $1
ORDER BY list_id ASC
