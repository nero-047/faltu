export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
          Welcome to <span className="text-blue-600 dark:text-blue-400">Falutu</span>  
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          The ultimate place for<b>curious minds</b> and<b>faltu geniuses</b> who love exploring  
          the<b>weirdest, smartest, and trickiest</b> questions out there.
        </p>
      </div>

      {/* Mission Section */}
      <section className="mt-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🎯 Our Mission
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Our mission is simple:<b>Challenge your brain, expand your knowledge, and have fun while doing it</b>.  
          Whether it&apos;s<b>Data Structures, Algorithms, Math, Physics, Logical Puzzles, or Random Trivia</b>,  
          Faltu is here to<b>make you think, learn, and laugh</b>.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          We believe that<b>real learning</b> happens when you<b>question everything</b>, and that&apos;s exactly  
          what we do here—<b>ask interesting questions, break them down, and give mind-blowing explanations</b>.
        </p>
      </section>

      {/* What We Offer Section */}
      <section className="mt-12 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🚀 What Do We Offer?
        </h2>
        <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
          <li>✅<b>Daily Thought-Provoking Questions</b> – Not just coding, but puzzles from all fields.</li>
          <li>✅<b>Deep-Dive Solutions</b> – We don&apos;t just give answers, we explain the logic behind them.</li>
          <li>✅<b>Logical Reasoning Challenges</b> – Because<b>critical thinking</b> is a superpower.</li>
          <li>✅<b>Brain Teasers & Riddles</b> – To keep your mind sharp and entertained.</li>
          <li>✅<b>Knowledge Blogs</b> – We write about<b>technology, science, history, and beyond</b>.</li>
          <li>✅<b>Fun & Interactive Learning</b> – No boring lectures, just<b>epic problem-solving</b>.</li>
        </ul>
      </section>

      {/* Why Falutu Section */}
      <section className="mt-12 bg-blue-50 dark:bg-blue-900 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🤔 Why Falutu?
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Because<b>learning should never be boring</b>.  
          Whether you&apos;re a<b>student</b>, a<b>developer</b>, or just someone who loves  
         <b>challenging your brain</b>, this place is for you.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          We don&apos;t just focus on<b>coding</b>, we focus on<b>thinking</b>.  
         <b>Logic, reasoning, problem-solving, and curiosity</b> – these are the real skills  
          that<b>make you unstoppable</b> in any field.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          So if you&apos;re tired of<b>boring learning</b> and want something  
         <b>engaging, challenging, and a little bit crazy</b> – you&apos;re in the right place.
        </p>
      </section>

      {/* Join Us Section */}
      <section className="mt-12 p-8 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          🎉 Join the Falutu Community
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Whether you&apos;re here to<b>sharpen your problem-solving skills, challenge yourself,  
          or just enjoy some fun logical puzzles</b>, we welcome you to our<b>growing community</b>.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Let&apos;s<b>solve, learn, and grow</b> together – one<b>mind-bending</b> question at a time.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="mt-12 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          📩 Contact Us
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          Have questions, suggestions, or just want to say hi? Reach out to us at:
        </p>
        <p className="mt-2 text-lg font-semibold text-blue-600 dark:text-blue-300">
          <a href="mailto:contact@faltu.dev">contact@faltu.dev</a>
        </p>
      </section>
    </main>
  );
}