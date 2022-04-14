import { BsThreeDots } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
function GradeSection() {
	const grades = [
		{ grade: 1, numberOfStudents: 123, numberOfSubjects: 4 },
		{ grade: 2, numberOfStudents: 113, numberOfSubjects: 4 },
		{ grade: 3, numberOfStudents: 132, numberOfSubjects: 4 },
		{ grade: 4, numberOfStudents: 101, numberOfSubjects: 5 },
		{ grade: 5, numberOfStudents: 124, numberOfSubjects: 5 },
		{ grade: 6, numberOfStudents: 152, numberOfSubjects: 5 },
		{ grade: 7, numberOfStudents: 135, numberOfSubjects: 6 },
	];
	return (
		<>
			<h3 className="text-2xl font-bold p-4">Grades</h3>
			<div className="overflow-x-auto">
				<table className="table table-zebra w-full">
					<thead>
						<tr>
							<th>Grade</th>
							<th>Number of Subjects</th>
							<th>Number of Students</th>
							<th>
								<BsThreeDots size={18} />
							</th>
						</tr>
					</thead>
					<tbody>
						{grades.map((grade, index) => (
							<tr>
								<th>{grade.grade}</th>
								<td>{grade.numberOfSubjects}</td>
								<td>{grade.numberOfStudents}</td>
								<td>
									<button>
										<AiOutlineEdit size={18} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default GradeSection;
