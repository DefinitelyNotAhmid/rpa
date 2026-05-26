export type UniversityCategory = "florida" | "out-of-state";

export interface University {
  name: string;
  domain: string;
  logo: string;
  categories: UniversityCategory[];
  coordinates: [number, number];
}

export const universities: University[] = [
  { name: "University of Miami",          domain: "miami.edu", logo: "/University of Miami.png",                        categories: ["florida"],                  coordinates: [-80.2781, 25.7174] },
  { name: "Central Michigan University",  domain: "cmich.edu", logo: "/Central-Michigan-University.jpg",                categories: ["out-of-state"],             coordinates: [-84.7741, 43.5773] },
  { name: "Campbell University",          domain: "campbell.edu", logo: "/Campbell University.jpg",                        categories: ["out-of-state"],             coordinates: [-78.7399, 35.4084] },
  { name: "Bethune-Cookman University",   domain: "cookman.edu", logo: "/Bethune-cookman-university.png",                 categories: ["florida"],                  coordinates: [-81.0317, 29.2106] },
  { name: "Miami Dade College",           domain: "mdc.edu", logo: "/miami-dade-college.jpg",                         categories: ["florida"],                  coordinates: [-80.1974, 25.7743] },
  { name: "St. Thomas University",        domain: "stu.edu", logo: "/st-thomas-university.jpg",                       categories: ["florida"],                  coordinates: [-80.3415, 25.9169] },
  { name: "Allen University",             domain: "allenuniversity.edu", logo: "/allen-university.jpg",                           categories: ["out-of-state"],             coordinates: [-81.0421, 34.0021] },
  { name: "Bethany College",              domain: "bethanylb.edu", logo: "/Bethany-College.jpg",                            categories: ["out-of-state"],             coordinates: [-97.6753, 38.5742] },
  { name: "Briar Cliff University",       domain: "briarcliff.edu", logo: "/Briar-Cliff-University.jpg",                     categories: ["out-of-state"],             coordinates: [-96.3988, 42.5157] },
  { name: "College of the Redwoods",      domain: "redwoods.edu", logo: "/College-of-the-Redwoods.jpg",                    categories: ["out-of-state"],             coordinates: [-124.1986, 40.6961] },
  { name: "Edward Waters College",        domain: "ewc.edu", logo: "/Edward-Waters-College-FL.jpg",                   categories: ["florida"],                  coordinates: [-81.6674, 30.3388] },
  { name: "Florida Memorial University",  domain: "fmuniv.edu", logo: "/Florida-Memorial-University-FL.jpg",             categories: ["florida"],                  coordinates: [-80.2456, 25.9420] },
  { name: "Grand Canyon University",      domain: "gcu.edu", logo: "/GCU-Arena.jpg",                                  categories: ["out-of-state"],             coordinates: [-112.1148, 33.5091] },
  { name: "St. Andrews University",       domain: "sa.edu", logo: "/St.-Andrews-University-NC.jpg",                  categories: ["out-of-state"],             coordinates: [-79.4680, 34.7553] },
  { name: "Mayville State University",    domain: "mayvillestate.edu", logo: "/Mayville-State-University-ND.jpg",               categories: ["out-of-state"],             coordinates: [-97.3261, 47.4988] },
  { name: "Judson University",            domain: "judsonu.edu", logo: "/Judson-University-IL.jpg",                       categories: ["out-of-state"],             coordinates: [-88.3090, 42.0597] },
  { name: "Morningside College",          domain: "morningside.edu", logo: "/Morningside-College-IA.jpg",                     categories: ["out-of-state"],             coordinates: [-96.3590, 42.4735] },
  { name: "Clarke University",            domain: "clarke.edu", logo: "/Clarke-University-IA.jpg",                       categories: ["out-of-state"],             coordinates: [-90.6907, 42.5094] },
  { name: "Valdosta State University",    domain: "valdosta.edu", logo: "/Valdosta-State-University-GA-scaled.jpg",        categories: ["out-of-state"],             coordinates: [-83.2785, 30.8472] },
  { name: "Middle Georgia State",         domain: "mga.edu", logo: "/Middle-Georgia-State-GA.jpg",                    categories: ["out-of-state"],             coordinates: [-83.7002, 32.8409] },
  { name: "Fort Valley State University", domain: "fvsu.edu", logo: "/Fort-Valley-State-University-GA.jpg",            categories: ["out-of-state"],             coordinates: [-83.8954, 32.5348] },
  { name: "Columbus State University",    domain: "columbusstate.edu", logo: "/Columbus-State-University-GA-scaled.jpg",        categories: ["out-of-state"],             coordinates: [-84.9416, 32.5015] },
  { name: "Tallahassee Community College",domain: "tcc.fl.edu", logo: "/Tallahassee-Community-College-FL-scaled.jpg",    categories: ["florida"],                  coordinates: [-84.2807, 30.4383] },
  { name: "Southeastern University",      domain: "seu.edu", logo: "/Southeastern-University-FL.jpg",                 categories: ["florida"],                  coordinates: [-81.9498, 28.0195] },
];
