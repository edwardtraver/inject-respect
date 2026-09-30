/*
 * The INJECT-RESPECT Tool (v3.3) — content
 * Authors: Edward C. Traver, Sarah A. Schmalzle, Christopher Welsh, and Sarah Kattakuzhy
 * The INJECT-RESPECT Tool © 2026 is licensed under CC BY-NC-SA 4.0.
 *
 * Editing notes
 * - `quick` and `detailed` mirror the two columns of the table.
 * - To highlight a question, write it as an object: { text: "…", priority: true }.
 *   It then shows in bold with a "Priority" marker.
 * - Words in a question that match a glossary entry are linked automatically
 *   (see `glossaryLinks` below).
 */

window.INJECT_RESPECT = {
  title: "The INJECT-RESPECT Tool",
  version: "3.3",

  instructions: [
    "These prompts provide guidance to obtain a history of injection drug use, focusing on infectious and non-infectious harms. The interview should ideally be conversational, with these points acting as a guide, rather than a checklist.",
    "For situations where time is limited, focus on the “Quick Interview” column. If time is plentiful, use questions from both columns. Focus the history on the past few months or weeks, since that has a greater influence on the current risk of infectious and other complications."
  ],

  // Guidance on the conversation, from the tool's instructions
  framing: {
    lead: [
      "The questions in this tool may elicit feelings of shame, trauma, and stigma among people who use drugs. Many people who use drugs have experienced stigma from healthcare workers and/or in healthcare settings.",
      "Additionally, it is important to value people who use drugs as complex, unique individuals. Be curious and treat everyone with respect."
    ],
    pointsIntro: "To facilitate an open and respectful conversation:",
    points: [
      "Frame the conversation around the health of the patient.",
      "If you have information about positive drug toxicology testing, present that first in a matter-of-fact way, rather than leading with questions about drug use that could put patients in the position to feel misled or tricked.",
      "To the extent possible, limit the number of clinicians in the room and take steps to ensure privacy.",
      "The conversation should directly assess risks and yield opportunities for specific harm reduction counseling and further treatment."
    ],
    more: "See the references for more information on harm reduction counseling."
  },

  domains: [
    {
      id: "intensity", letter: "I", name: "Intensity",
      mnemonic: "frequency, amount, quantity",
      keywords: "frequency, amount, quantity",
      quick: [
        "When was your most recent injection drug use?",
        "How frequently do you usually inject drugs?"
      ],
      detailed: [
        "How many times per day (or week) do you inject drugs?",
        "Has the amount used increased, decreased, or stayed the same during the past month? Why has it changed?"
      ]
    },
    {
      id: "network", letter: "N", name: "Network",
      mnemonic: "sharing, lending, buying",
      keywords: "sharing, lending, buying",
      quick: [
        "Do you share drugs or equipment with other people? With a sexual partner?"
      ],
      detailed: [
        "Do you know if those people have HIV infection?",
        "Do you give used supplies to others?"
      ]
    },
    {
      id: "junk", letter: "J", name: "Junk",
      mnemonic: "drug, substance, route, form",
      keywords: "drug, substance, form",
      quick: [
        "Which drugs do you inject?"
      ],
      detailed: [
        "What formulations of drugs do you inject (e.g., tablets/pills, powdered vs black tar heroin)?"
      ]
    },
    {
      id: "effect", letter: "E", name: "Effect",
      mnemonic: "hit, motivation, feeling",
      keywords: "hit, feeling",
      quick: [
        "Do you often or have you recently missed a vein or had trouble injecting?"
      ],
      detailed: [
        "Do you test your drugs with fentanyl test strips, xylazine test strips, or other tests?",
        "Do you take test-hits of your drugs to determine potency?"
      ]
    },
    {
      id: "cleaning", letter: "C", name: "Cleaning",
      mnemonic: "supplies for reuse, skin",
      keywords: "supplies for reuse, skin",
      quick: [
        "Do you reuse needles, syringes, filters, or other supplies on yourself?",
        "Do you wash or clean your injection site before injecting? If so, with what (e.g., soap, alcohol)?"
      ],
      detailed: [
        "Do you clean supplies before you reuse, borrow, or lend them?",
        "How do you clean your supplies (i.e., boiling, bleach)?"
      ]
    },
    {
      id: "tools", letter: "T", name: "Tools",
      mnemonic: "syringes, needles, water, filters, cookers",
      keywords: "syringes, needles, filters",
      quick: [
        "Where do you obtain syringes, needles, and other equipment?"
      ],
      detailed: [
        "What do you use as a filter (e.g., cigarette filter, pocket lint, sterile cotton)?",
        "How do you dispose of needles and syringes?"
      ]
    },
    {
      id: "reversal", letter: "R", name: "Reversal",
      mnemonic: "naloxone",
      keywords: "overdose, naloxone",
      quick: [
        "Have you ever had an overdose or a near-overdose?",
        "Is naloxone (Narcan) available while you are using? How often?"
      ],
      detailed: [
        "Is someone available to administer naloxone (Narcan)?",
        "Do you have naloxone on you currently?"
      ]
    },
    {
      id: "environment", letter: "E", name: "Environment",
      mnemonic: "setting for use, safety",
      keywords: "setting for use, safety",
      quick: [
        "Do you inject alone?"
      ],
      detailed: [
        "Where are you when you typically inject drugs (e.g., home, street, supplier’s home, shooting gallery, safe injection space)?"
      ]
    },
    {
      id: "site", letter: "S", name: "Site",
      mnemonic: "anatomic location, tissue",
      keywords: "anatomic location, tissue",
      quick: [
        "Where on your body do you inject (e.g., arms, legs, groin, neck)?",
        "Do you know how to locate veins and arteries, and how to tell the difference?"
      ],
      detailed: [
        "Do you inject in veins (mainline), arteries, wounds, skin (skin pop), muscle (muscle pop, muscle-ing), or other tissues?",
        "What sites have you injected in in the past month?",
        "Where was your last injection?"
      ]
    },
    {
      id: "preparation", letter: "P", name: "Preparation",
      mnemonic: "cooking technique, loading syringes, tourniquet",
      keywords: "cooking technique, loading syringes, tourniquet",
      quick: [
        "Has your syringe or other equipment typically been used before by someone else to inject?",
        "Do you lick your needle prior to injecting?"
      ],
      detailed: [
        "What do you use to dissolve drugs (e.g., water, vinegar, etc.)?",
        "Do you use a syringe to split or mix drugs?",
        "Do you draw blood directly into a syringe filled with powder (instead of dissolving the powder in water first)?",
        "Do you use a tourniquet?",
        "Do you draw blood into the syringe before injecting (booting and jacking)?"
      ]
    },
    {
      id: "education", letter: "E", name: "Education",
      mnemonic: "",
      keywords: "",
      quick: [
        "Do you know where to safely obtain clean injection supplies?"
      ],
      detailed: [
        "Do you know where to obtain information on safer injection practices?",
        "Have you considered ingesting, smoking, snorting, or booty bumping drugs instead of injecting?"
      ]
    },
    {
      id: "care", letter: "C", name: "Care",
      mnemonic: "of injection sites",
      keywords: "of injection sites",
      quick: [
        "How do you care for your injection sites?",
        "Do you inject into the same site even if it seems to be infected, red, swollen, or painful?"
      ],
      detailed: [
        "Do you purposefully preserve any wounds for the purpose of injection into the wound bed or edge?",
        "Do you use antibiotics obtained from somewhere other than a pharmacy?",
        "What do you do if you have an area that might be infected?",
        "Do you use techniques or products to help heal wounds (e.g., lotions, ointments, or soaking)?"
      ]
    },
    {
      id: "technique", letter: "T", name: "Technique",
      mnemonic: "",
      keywords: "",
      quick: [
        "What injection techniques do you use to prevent injury and infection?"
      ],
      detailed: [
        "Are there any broken needles in your body?"
      ]
    }
  ],

  glossary: [
    ["Backloading", "Dividing a drug dose into multiple syringes by loading into the back of an empty syringe after removing the plunger. Also called piggybacking."],
    ["Black tar", "Form of heroin in a thick, semi-liquid form. Requires acidification for dissolving. Common on West Coast of USA."],
    ["Booting", "Process of drawing blood into the syringe to dissolve residual drug before reinjecting. Also called “booting and jacking.”"],
    ["Booty bumping", "Rectal administration of drugs, usually in aqueous solution using a needle-less syringe. Also known as boofing."],
    ["Coke", "Cocaine."],
    ["Cook", "Process of dissolving powdered drug in water, through heating."],
    ["Cooker", "Device used to heat drug and water solution, usually small metal basin with a handle."],
    ["Crack", "Crystalline cocaine."],
    ["Dope", "Heroin or other opioids."],
    ["Get off", "Use a drug, especially with desired effect."],
    ["Fell out", "Variable meanings, including fell down, lost consciousness, or overdosed."],
    ["Filter", "Material used to remove particulates from a drug and water solution, commonly cotton."],
    ["Front-loading", "Dividing a drug dose into multiple syringes by loading into the front of an empty syringe after removing the needle."],
    ["Harm reduction", "Philosophy and practice of minimizing the negative consequences of drug use, even with ongoing use."],
    ["Hit", "Successful drug administration with resulting effect, or the drug dose."],
    ["Hot blood", "Arterial blood, which appears bright red (a.k.a. red blood) and may cause a hot sensation if it is injected into."],
    ["Honey-hole", "A favorite spot on the body to inject, which yields reliable hits."],
    ["Injection drug use (IDU)", "Preferred term for the practice of consuming drugs through injection, including mainlining or skin or muscle popping. More accurate than “IV drug use.”"],
    ["Mainline, (-ing)", "Intravenous drug injection."],
    ["Muscle popping", "Intramuscular drug injection. Also known as “muscle-ing”."],
    ["Naloxone", "Opioid receptor antagonist medication, used to reverse opioid overdoses. Brand name Narcan."],
    ["Needle exchange", "Program which provides sterile, sealed injection equipment, including syringes, needles, cookers, filters, water, tourniquets, and alcohol swabs. Also called needle and syringe exchange, needle and syringe service program, etc. Does not necessarily require exchange or return of used equipment."],
    ["Opioid", "Natural, synthetic, and semisynthetic chemicals acting on the opioid receptors, including opium, heroin, morphine, codeine, oxycodone, methadone, and fentanyl."],
    ["Person who injects drugs (PWID)", "Preferred term for a person who consumes drugs through injections (see “Injection drug use”). A person-first term, which avoids overly labeling a person, in contrast to “IV drug user” or “addict.”"],
    ["Safe injection site", "Facility with medical staff to use drugs under supervision. Also called safer injection site, drug consumption rooms, overdose prevention site, and safe consumption site."],
    ["Scramble", "Mixture of an opioid (i.e., heroin or fentanyl) and diphenhydramine, lactulose, and/or benzodiazepines."],
    ["Shooting up", "Injecting drugs."],
    ["Shooting gallery", "Facility maintained for use of drugs."],
    ["Shot", "A dose of drug or drug-water solution."],
    ["Skin popping", "Intra- or subdermal drug injection."],
    ["Speed", "Amphetamine."],
    ["Speedball", "Mixture of an opioid and cocaine or amphetamine."],
    ["Tester", "A drug dose given out by dealers, usually for free, so that users can report back on the potency of the batch. May be unexpectedly potent, causing an overdose."],
    ["Test dose", "Small dose of drugs taken to test the quality and potency of the larger batch. Can be used to avoid unintentional overdose."],
    ["Tourniquet", "Rubber or cloth strap to constrict an arm or leg, causing the veins to distend and to facilitate intravenous injection. Also called a tie."]
  ],

  // Phrase in a question  →  glossary term it points to (longest phrases first)
  glossaryLinks: [
    ["booting and jacking", "Booting"],
    ["safe injection space", "Safe injection site"],
    ["muscle pop, muscle-ing", "Muscle popping"],
    ["shooting gallery", "Shooting gallery"],
    ["booty bumping", "Booty bumping"],
    ["black tar", "Black tar"],
    ["skin pop", "Skin popping"],
    ["mainline", "Mainline, (-ing)"],
    ["test-hits", "Test dose"],
    ["tourniquet", "Tourniquet"],
    ["naloxone", "Naloxone"]
  ],

  references: [
    { text: "Harm Reduction Coalition. Getting Off Right Safety Manual. Published 2012.", url: "https://harmreduction.org/drugs-and-drug-users/drug-tools/getting-off-right/", label: "harmreduction.org" },
    { text: "Peckham AM, Young EH. Opportunities to Offer Harm Reduction to People who Inject Drugs During Infectious Disease Encounters: Narrative Review. Open Forum Infectious Diseases. 2020;7(11).", url: "https://doi.org/10.1093/ofid/ofaa503", label: "doi:10.1093/ofid/ofaa503" },
    { text: "Stimson GV, Jones S, Chalmers C, Sullivan D. A short questionnaire (IRQ) to assess injecting risk behaviour. Addiction. 1998;93(3):337-347.", url: "https://doi.org/10.1046/j.1360-0443.1998.9333373.x", label: "doi:10.1046/j.1360-0443.1998.9333373.x" },
    { text: "Thakarar K, Nenninger K, Agmas W. Harm Reduction Services to Prevent and Treat Infectious Diseases in People Who Use Drugs. Infectious Disease Clinics of North America. 2020;34(3):605-620.", url: "https://doi.org/10.1016/j.idc.2020.06.013", label: "doi:10.1016/j.idc.2020.06.013" },
    { text: "Safespot Overdose Hotline [Internet]. [cited 2026 Sep 30]. SafeSpot Overdose Hotline.", url: "https://safe-spot.me/", label: "safe-spot.me" }
  ],

  authors: ["Edward C. Traver", "Sarah A. Schmalzle", "Christopher Welsh", "Sarah Kattakuzhy"],
  year: 2026,
  license: { name: "CC BY-NC-SA 4.0", url: "https://creativecommons.org/licenses/by-nc-sa/4.0/" }
};
