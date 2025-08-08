interface ExplanationBoxProps {
  topic: string;
  children?: React.ReactNode;
  link: string;
  section?: string;
}

const ExplanationBox = ({
  topic,
  children,
  link,
  section,
}: ExplanationBoxProps) => {
  return (
    <section
      className="flex flex-col gap-2 bg-gray-100 p-5 rounded-xl"
      id={section}
    >
      <h2 className="text-3xl font-semibold">{topic}</h2>
      <article className="text-lg font-light">{children}</article>
      <p className="italic">
        Video link:{" "}
        <a
          href={link}
          className="hover: underline hover:text-green-600 transition-all"
        >
          {link}
        </a>
      </p>
    </section>
  );
};

export default ExplanationBox;
