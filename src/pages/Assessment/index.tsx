import { useState } from "react";
import {
	useGetQuestions,
	useGetQuestionsFromFile,
	useSuggestion,
} from "../../api/OpenAI";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import QuestionCard from "./QuestionCard";
function Assessment() {
	const question = useGetQuestions();
	const fileQuestion = useGetQuestionsFromFile();
	const suggest = useSuggestion();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [input, setInput] = useState("");
	const [selectedKeyword, setSelectedKeyword] = useState("");
	const [file, setFile] = useState<any>();
	return (
		<>
			<div className="flex h-screen overflow-hidden">
				{/* Sidebar */}
				<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				{/* Content area */}
				<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
					{/*  Site header */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					<div className="w-full flex-col flex space-y-4 p-5 sm:px-2 md:px-16">
						<div className="my-5">
							<div className="text-lg font-bold mb-4">
								Enter a keyword to get topics from it:
							</div>
							<input
								type="text"
								onChange={(e) => setInput(e.target.value)}
								className="input input-primary w-1/2"
							/>
						</div>
						<div>
							<button
								onClick={() => {
									suggest.mutate(input);
								}}
								className="btn btn-primary"
							>
								Get Topics for this keyword
							</button>
						</div>
						<>
							<div className="divider">Or</div>
							<textarea
								onChange={(e) => setFile(e.target.value)}
								className="textarea textarea-bordered textarea-primary w-full"
							/>
							<div>
								<button
									onClick={() => {
										fileQuestion.mutate(file);
									}}
									className="w-48 btn btn-primary"
								>
									Get questions for the text above
								</button>
							</div>
						</>
						{suggest.isSuccess && !selectedKeyword && (
							<div>
								{suggest.data.data.map((topic: any, index: number) => {
									return (
										<button
											onClick={() => {
												setSelectedKeyword(topic);
												question.mutate(topic);
											}}
											key={index}
											className={`m-2 btn-sm btn ${
												selectedKeyword !== topic ? "btn-primary" : "btn-accent"
											} `}
										>
											{topic}
										</button>
									);
								})}
							</div>
						)}
						{selectedKeyword && question.isLoading && (
							<button className="btn btn-primary loading">
								Generating questions for {selectedKeyword}...
							</button>
						)}
						{fileQuestion.isLoading && (
							<button className="btn btn-primary loading">
								Generating questions for selected file...
							</button>
						)}
						{question.data?.data?.Questions?.map(
							(question: any, index: number) => (
								<QuestionCard
									key={index}
									questionNumber={index + 1}
									question={question.question}
									answers={question.answer}
								/>
							)
						)}
						{fileQuestion.data?.data?.Questions?.map(
							(question: any, index: number) => (
								<QuestionCard
									key={index}
									questionNumber={index + 1}
									question={question.question}
									answers={question.answer}
								/>
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Assessment;
