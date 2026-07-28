import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { PageSubnav } from "@/components/page-subnav";

const ABOUT_NAV = [
  { label: "About", href: "/about" },
  { label: "People", href: "/about/people" },
  { label: "Contact", href: "/about/contact" },
];

const LEADERSHIP = [
  {
    name: "Aude Oliva",
    role: "MIT director of the MIT-IBM Computing Research Lab, director of strategic industry engagement in the MIT Schwarzman College of Computing, and a senior research scientist at MIT CSAIL, working on natural and artificial intelligence.",
    image: "/images/Aude_Oliva-768x768.jpg",
  },
  {
    name: "David Cox",
    role: "IBM director the MIT-IBM Computing Research Lab and the VP, AI Foundations at IBM Research. Formerly a Harvard professor, he is a computational neuroscientist prioritizing the Lab's work in neuro-symbolic AI and other key areas while leading the Lab's IBM team in Cambridge, MA.",
    image: "/images/DavidCox-500x500.jpeg",
  },
  {
    name: "Anantha Chandrakasan",
    role: "MIT chair of the MIT-IBM Computing Research Lab, MIT provost, and the Vannevar Bush Professor of Electrical Engineering and Computer Science. His research focuses on making electronic circuits more energy efficient.",
    image: "/images/Anantha_Chandrakasan.jpg",
  },
  {
    name: "Jay Gambetta",
    role: "IBM chair of the MIT-IBM Computing Research Lab, director of Research at IBM and IBM fellow. He leads IBM's global research initiatives, spearheading the company's strategy and vision to develop the future of computing, which includes AI, semiconductors, and quantum computing.",
    image: "/images/Jay_Gambetta.webp",
  },
  {
    name: "Daniel Huttenlocher",
    role: "MIT co-chair of the MIT-IBM Computing Research Lab, dean of the MIT Schwarzman College of Computing, and the Henry Ellis Warren (1894) Professor of Electrical Engineering and Computer Science. He is recognized for his work in computer vision, social media, and understanding artificial intelligence.",
    image: "/images/Huttenlocher-300x300.jpg",
  },
];

const PEOPLE_ALPHA = [
  "Srinivasan Arunachalam", "Takashi Ando", "Navid Azizan", "Ramon Fernandez Astudillo",
  "Faez Ahmed", "Jacob Andreas", "Pulkit Agrawal", "Masataro Asai", "Lisa Amini",
  "Adam Bogue", "Sara Beery", "Dimitris Bertsimas", "Abhishek Bhandwaldar",
  "Paola Cappellaro", "Andrew Cross", "Guy Cohen", "Pin-Yu Chen", "Isaac Chuang",
  "Shiyu Chang", "John Cohn", "David Cox", "Anantha Chandrakasan",
  "Priya Donti", "Nima Dehmamy", "Veronique Demers", "Jesús del Alamo",
  "Tamar Eilam", "Markus Ettl",
  "Gabriele Farina", "Chuchu Fan", "Rogerio Feris", "Nathan Fulton",
  "Jay Gambetta", "Ankit Gupta", "Alexandru Gheorghiu", "William H. Green",
  "Brian Goehring", "Marzyeh Ghassemi", "Negin Golrezaei", "Polina Golland",
  "James Glass", "Dan Gutfreund", "Chuang Gan",
  "Ruonan Han", "Zhang-Wei Hong", "Pavithra Harsha", "Kaiming He", "Naoise Holohan",
  "Anette \"Peko\" Hosoi", "Lauren Hinkel", "Daniel Huttenlocher", "Aram Harrow", "Song Han",
  "Vasileios Kalantzis", "Hari Krovi", "James Kozloski", "Dina Katabi", "Yoon Kim", "Michael Katz",
  "Franck Le", "Retsef Levi", "Ja Young Lee", "Ju Li", "Charles E. Leiserson", "Sijia Liu",
  "Sendhil Mullainathan", "Adriane Mullins", "Mauro Martino", "Adriana Meza Soria",
  "Wojciech Matusik", "Liz McShane", "Louis Mandel", "Ian Molloy", "Youssef Mroueh",
  "Manish Nagireddy", "Anand Natarajan", "Lam M. Nguyen", "Kenney Ng",
  "Elsa Olivetti", "Asu Ozdaglar", "Una-May O'Reilly", "Aude Oliva",
  "Hanhee Paik", "Emily Pritchett", "Pablo Parrilo", "Srinivasan Parthasarathy",
  "Dirk Pfeiffer", "Georgia Perakis", "Rameswar Panda",
  "Bharat Runwal", "Sriram Raghavan", "Patrick Rall", "John Rozen",
  "Jonathan Ragan-Kelley", "Giuseppe Romano",
  "Vadim Sheinin", "Nir Shavit", "Partha Suryanarayanan", "Paul Solomon", "Wei Sun",
  "Tess Smidt", "Julian Shun", "Jonathan Z Sun", "Samantha Smiley", "Kate Soule",
  "Devavrat Shah", "Mark Squillante", "Peter Shor", "Armando Solar-Lezama",
  "Prasanna Sattigeri", "Justin Solomon", "Hendrik Strobelt", "Akash Srivastava",
  "Teodor Todorov", "Neil Thompson", "Antonio Torralba",
  "Filippo Utro", "Caroline Uhler",
  "Vinod Vaikuntanathan",
  "Daniel Weidele", "Campbell Watson", "Sherrie Wang", "Hao Wang", "Brian Williams",
  "Bo Wu", "Jeff Welser", "Gregory Wornell",
  "Bilge Yildiz",
  "Y. Karen Zheng", "Yada Zhu", "Yang Zhang", "Gaoyuan Zhang",
];

export default function PeoplePage() {
  return (
    <PageShell variant="basic">
      <PageSubnav items={ABOUT_NAV} current="People" />
      <section className="page-section--basic-content basic-content">
        <div className="content-container">
          <div className="padded-content">
            <h1 className="basic-page-title type-xl">
              Who we are
            </h1>

            <div className="type-b" style={{ maxWidth: "800px", marginBottom: "64px" }}>
              <p>
                As a collaborative research team, we focus on foundational science,
                developing and integrating state-of-the-art AI, algorithms, and quantum
                computing for today and the future. At MIT and IBM, we are committed to
                fundamentally rethinking and elevating the capabilities of systems to address
                real-world challenges.
              </p>
            </div>

            <h2 className="type-l" style={{ marginBottom: "32px" }}>
              Leadership
            </h2>

            <div className="type-b" style={{ maxWidth: "800px", marginBottom: "48px" }}>
              <p>
                The MIT-IBM Computing Research Lab is chaired by MIT Provost and Vannevar
                Bush Professor of Electrical Engineering and Computer Science Anantha
                Chandrakasan, Director of Research at IBM and IBM Fellow Jay Gambetta, and
                MIT co-chair and MIT Stephen A. Schwarzman College of Computing Dean Dan
                Huttenlocher. David Cox of IBM Research and Aude Oliva of MIT co-direct the
                Lab.
              </p>
            </div>

            <div
              className="grid grid-cols-1 gap-8 min-[1056px]:grid-cols-5"
              style={{ marginBottom: "96px" }}
            >
              {LEADERSHIP.map((leader) => (
                <div key={leader.name}>
                  <div style={{ marginBottom: "16px" }}>
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      width={300}
                      height={300}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <h3 className="type-m" style={{ marginBottom: "8px" }}>
                    {leader.name}
                  </h3>
                  <p className="type-s" style={{ color: "#767676" }}>
                    {leader.role}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="type-l" style={{ marginBottom: "32px" }}>
              People
            </h2>

            <div
              className="grid grid-cols-2 gap-x-8 gap-y-4 min-[1056px]:grid-cols-4"
              style={{ maxWidth: "1000px" }}
            >
              {PEOPLE_ALPHA.map((name) => (
                <div key={name} className="type-s">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
