interface Props {
  question: any;
}

export default function QuestionView({ question }: Props) {
  if (!question) return null;

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'];

  return (
    <div className="max-w-5xl w-full flex flex-col items-center animate-fade-in text-center">
      <h2 className="text-6xl font-black text-white leading-tight mb-16">{question.questionText}</h2>
      <div className="grid grid-cols-2 gap-8 w-full">
        {question.answers.map((ans: string, i: number) => (
          <div key={i} className={`${colors[i]} py-10 rounded-3xl text-4xl font-black text-white shadow-xl`}>
            {ans}
          </div>
        ))}
      </div>
    </div>
  );
}