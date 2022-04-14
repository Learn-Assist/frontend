import CardSubject, { CardSubjectProps } from "./CardSubject";

function SubjectSection() {
	const x: CardSubjectProps[] = [
		{
			title: "English",
			description: "The description of the subject",
			grade: 1,
			buttonAction: "Edit Subject",
			numberOfLessons: 5,
			numberOfTests: 2,
			numberOfTopics: 12,
		},
		{
			title: "Math",
			description: "The description of the subject",
			grade: 1,
			buttonAction: "Edit Subject",
			numberOfLessons: 2,
			numberOfTests: 2,
			numberOfTopics: 4,
		},
		{
			title: "Science",
			description: "The description of the subject",
			grade: 1,
			buttonAction: "Edit Subject",
			numberOfLessons: 4,
			numberOfTests: 2,
			numberOfTopics: 10,
		},
		{
			title: "Social",
			description: "The description of the subject",
			grade: 1,
			buttonAction: "Edit Subject",
			numberOfLessons: 4,
			numberOfTests: 3,
			numberOfTopics: 11,
		},
		{
			title: "English",
			description: "The description of the subject",
			grade: 2,
			buttonAction: "Edit Subject",
			numberOfLessons: 5,
			numberOfTests: 3,
			numberOfTopics: 14,
		},
	];
	return (
		<>
			<h3 className="text-2xl font-bold p-4">Subjects</h3>
			<div className="w-full grid grid-cols-12 gap-5">
				{x.map((subject) => (
					<CardSubject {...subject} />
				))}
			</div>
		</>
	);
}

export default SubjectSection;
