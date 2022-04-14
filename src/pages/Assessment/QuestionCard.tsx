import { useState } from "react";

type QuestionProps = {
	questionNumber: number;
	question: string;
	answers: {
		answer: string;
		correct: boolean;
	}[];
};
function QuestionCard(props: QuestionProps) {
	const [isAnswered, setIsAnswered] = useState(false);
	const [selectedAnswer, setselectedAnswer] = useState("");
	return (
		<div className="card w-full bg-primary text-primary-content">
			<div className="card-body">
				<h2 className="card-title text-xl font-bold">
					{props.questionNumber}
					{". "}
					{props.question}
				</h2>

				{props.answers.map((answer, index) => (
					<div key={index} className="my-2">
						<button
							onClick={() => {
								setIsAnswered(true);
								if (!isAnswered) setselectedAnswer(answer.answer);
							}}
							className={`btn btn-sm ${
								isAnswered && selectedAnswer === answer.answer
									? answer.correct
										? "btn-success"
										: "btn-error"
									: "btn-accent"
							}`}
						>
							{answer.answer}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default QuestionCard;
