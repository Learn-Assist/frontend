function Section1() {
	return (
		<div className="w-full overflow-auto">
			<div className="shadow-xl border stats border-base-300">
				<div className="stat mx-5">
					<div className="stat-title">Grade 1 completion</div>
					<div className="stat-value">69%</div>
					<div className="stat-actions">
						<button className="btn btn-sm btn-primary">Start Learning</button>
					</div>
				</div>
				<div className="stat">
					<div className="stat-title">Assignment and homeworks</div>
					<div className="stat-value">8/14</div>
					<div className="stat-actions">
						<button className="btn btn-sm btn-primary">View all</button>
						<button className="btn btn-sm btn-accent btn-outline ml-3">
							Due tomorrow
						</button>
					</div>
				</div>
				<div className="stat">
					<div className="stat-title">Average score</div>
					<div className="stat-value">85.9%</div>
					<div className="stat-actions">
						<button className="btn btn-sm btn-primary">Take a test</button>
						<button className="btn btn-sm btn-accent btn-outline ml-3">
							View all tests
						</button>
					</div>
				</div>
			</div>
			<div className="shadow-xl w-full mt-2 border stats border-base-300">
				<div className="stat">
					<div className="stat-value">19/43</div>
					<div className="stat-title">
						Topics learnt and assessed in grade 1
					</div>
					<div className="stat-desc">
						<progress
							value="45"
							max="100"
							className="progress progress-secondary"
						></progress>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Section1;
