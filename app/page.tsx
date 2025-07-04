import { ConstructionReport } from "@/components/constructionReport";

// Updated data structure based on the new JSON format
const sampleReportData = {
  siteInfo: {
    date: "2025-07-01",
    projectName: "Luxury Apartment Complex",
    client: "Elite Realty Developers",
    projectType: "Residential",
    mainConsultant: "Urban Design Associates",
    mainContractor: "BuildRight Constructions",
    interiorDesigner: "Design Innovations Studio",
    otherConsultants: ["Structural Engineering Solutions"],
  },
  phaseAnalysis: {
    rawPhaseCompletion: 18,
    finishedPhaseCompletion: 88,
    progressGap: 70,
    estimatedTimespan: "8-14 months realistic range",
    qualityConsistency:
      "The raw phase indicates fair alignment and basic prep, but lacks clarity in plumbing/HVAC. The finished render is high-end with luxury finishes and precise detailing—suggesting premium consistency, though dependent on site execution accuracy.",
  },
  metrics: {
    overallCompletion: 19,
    block: 20,
    electrical: 10,
    plumbing: 0,
    hvac: 0,
    ceiling: 15,
    flooring: 0,
    wall: 0,
    jonery: 0,
    curtain: 0,
    glass: 0,
  },

  components: {
    completed: 0,
    inProgress: 3,
    pending: 7,
    total: 10,
  },
  categories: [
    {
      name: "BLOCKWORK",
      completion: 20,
      subcategories: [
        {
          name: "Marking (partition thickness)",
          completion: 20,
          quality: "Fair",
          observations:
            "Red markings on the ceiling but no clear wall thickness identification on block surfaces.",
          deficiencies: [
            "No visible labels or wall width dimensions",
            "Potential misalignment risk without demarcation",
          ],
        },
        {
          name: "Levels marking",
          completion: 0,
          quality: "Poor",
          observations: "No visible level datums or leveling reference lines.",
          deficiencies: [
            "No top-of-wall markings",
            "No floor/ceiling height marks",
          ],
        },
        {
          name: "Mock layering (blockwork)",
          completion: 0,
          quality: "Not Applicable",
          observations: "No test panels or mock-ups present.",
          deficiencies: [
            "Mock layering missing",
            "Unable to verify workmanship consistency",
          ],
        },
        {
          name: "Block",
          completion: 40,
          quality: "Fair",
          observations:
            "Walls constructed but unplastered; visible chase cuts and damage from electrical routing.",
          deficiencies: [
            "Rough block alignment in some zones",
            "Exposed vertical chases",
            "Damaged block edges",
          ],
        },
      ],
    },
    {
      name: "ELECTRICAL WORK",
      subcategories: [
        {
          name: "Wall marking (all kinds of points)",
          completion: 10,
          quality: "Poor",
          observations:
            "Basic red ceiling grid lines possibly for electrical points, no switch/socket labeling on walls.",
          deficiencies: [
            "No point codes or symbols",
            "Unclear electrical function marking",
          ],
        },
        {
          name: "Chiseling work",
          completion: 15,
          quality: "Fair",
          observations:
            "Vertical chisel cuts in wall observed with debris; partial depth routing.",
          deficiencies: ["Open chases", "Alignment and depth inconsistent"],
        },
        {
          name: "Conduiting work",
          completion: 10,
          quality: "Poor",
          observations:
            "Some vertical black conduits entering slab above doorway. No fixing clamps or terminations.",
          deficiencies: [
            "Conduit unsupported",
            "Routing not completed or protected",
          ],
        },
        {
          name: "Wall box / GI box",
          completion: 5,
          quality: "Poor",
          observations:
            "Few low-level wall boxes; misaligned and not flushed with wall face.",
          deficiencies: ["Poor alignment", "No plaster guard"],
        },
        {
          name: "Floor box",
          completion: 0,
          quality: "Not Applicable",
          observations: "No visible floor boxes or cover plates.",
          deficiencies: ["Not initiated"],
        },
        {
          name: "Wall DB boxes",
          completion: 0,
          quality: "Not Applicable",
          observations: "No distribution boards or DB recesses present.",
          deficiencies: ["No DB cutouts or layout markings"],
        },
        {
          name: "Lift/Solar/Water heater/HVAC",
          completion: 0,
          quality: "Not Applicable",
          observations:
            "No indication of any services for high-power or specialized systems.",
          deficiencies: ["Main cable path or sleeves not visible"],
        },
      ],
    },
    {
      name: "PLUMBING WORK",
      subcategories: [
        {
          name: "Markings",
          completion: 0,
          quality: "Poor",
          observations: "No plumbing-related wall or floor markings visible.",
          deficiencies: ["Plumbing zones not marked"],
        },
        {
          name: "Underground tank, overhead tank, man holes",
          completion: 0,
          quality: "Not Applicable",
          observations: "Not shown in the images provided.",
          deficiencies: ["No manhole/tank prep in view"],
        },
        {
          name: "Toilet locations",
          completion: 0,
          quality: "Not Applicable",
          observations: "No visible sanitary pipe stubs or wall sleeves.",
          deficiencies: ["Toilet risers and drain lines not present"],
        },
        {
          name: "Wall, floor, ceiling markings",
          completion: 0,
          quality: "Poor",
          observations: "No plumbing coordination visible.",
          deficiencies: ["Plumbing integration markings missing"],
        },
        {
          name: "Chisel, sleeve placements",
          completion: 0,
          quality: "Not Applicable",
          observations: "No sleeves or through-wall pipes installed.",
          deficiencies: ["No holes for plumbing conduits"],
        },
        {
          name: "Cone cuttings",
          completion: 0,
          quality: "Not Applicable",
          observations: "No slab penetration protections visible.",
          deficiencies: ["Safety/strength cone not performed"],
        },
        {
          name: "FN wall hardware",
          completion: 0,
          quality: "Not Applicable",
          observations: "No final plumbing accessories present.",
          deficiencies: ["Flush valves or hardware not installed"],
        },
        {
          name: "Supply & drains",
          completion: 0,
          quality: "Not Applicable",
          observations: "None seen on walls or floors.",
          deficiencies: ["Zero visible plumbing pipes"],
        },
        {
          name: "Floor drains",
          completion: 0,
          quality: "Not Applicable",
          observations: "No drain boxes or grates visible.",
          deficiencies: ["Drainage not initiated"],
        },
        {
          name: "Sanitary fittings",
          completion: 0,
          quality: "Not Applicable",
          observations: "No WC, lavatory or shower fittings present.",
          deficiencies: ["Fittings installation yet to begin"],
        },
      ],
    },
    {
      name: "HVAC WORKS",
      subcategories: [
        {
          name: "Duct marking, duct installation, equipment placement, grille/diffuser installation, insulation, testing & balancing",
          completion: 0,
          quality: "Not Applicable",
          observations: "No visible signs of HVAC ductwork or services.",
          deficiencies: ["HVAC layout and fixings not started"],
        },
      ],
    },
    {
      name: "CEILING WORKS",
      subcategories: [
        {
          name: "Grid marking",
          completion: 15,
          quality: "Fair",
          observations:
            "Ceiling red markings possibly intended for layout grid; no framing or leveling in place.",
          deficiencies: ["No false ceiling support or MEP coordination"],
        },
        {
          name: "Level marking",
          completion: 0,
          quality: "Poor",
          observations: "No laser levels, chalk lines, or datum lines seen.",
          deficiencies: ["Ceiling height not confirmed or marked"],
        },
        {
          name: "Layout marking",
          completion: 20,
          quality: "Fair",
          observations: "Grid planning visible on slab, but lacks detail.",
          deficiencies: [
            "No visible light fixture coordination or access panel plan",
          ],
        },
      ],
    },
    {
      name: "FLOORING WORKS",
      subcategories: [
        {
          name: "Marking all floor electrical points / floor boxes",
          completion: 0,
          quality: "Poor",
          observations: "No floor box indicators, tags or templates.",
          deficiencies: ["Missing box layout for floor power or data"],
        },
        {
          name: "Conduiting",
          completion: 0,
          quality: "Poor",
          observations: "No conduits seen embedded in floor.",
          deficiencies: ["Embedded conduit installation not started"],
        },
        {
          name: "Plumbing drain points in bathrooms",
          completion: 0,
          quality: "Not Applicable",
          observations: "No bathroom space visible or marked.",
          deficiencies: ["Drainage system layout not evident"],
        },
        {
          name: "Level marking",
          completion: 0,
          quality: "Poor",
          observations: "No elevation references on columns/walls.",
          deficiencies: ["Slab leveling not validated"],
        },
        {
          name: "Layout marking",
          completion: 0,
          quality: "Poor",
          observations: "No tile set-out or direction markings.",
          deficiencies: ["Tiling plan or joints layout absent"],
        },
      ],
    },
    {
      name: "WALL FINISHES",
      subcategories: [
        {
          name: "Putty work (wall preparation)",
          completion: 0,
          quality: "Not Applicable",
          observations: "Block walls are bare.",
          deficiencies: ["No plaster or finishing started"],
        },
        {
          name: "Sanding",
          completion: 0,
          quality: "Not Applicable",
          observations: "Not yet applicable.",
          deficiencies: ["Prerequisite works pending"],
        },
        {
          name: "Primer",
          completion: 0,
          quality: "Not Applicable",
          observations: "No coating or primer applied.",
          deficiencies: ["No base preparation"],
        },
        {
          name: "Wall points / sockets / light points / telephone/TV",
          completion: 10,
          quality: "Poor",
          observations: "Minimal wall boxes seen, none clearly labeled.",
          deficiencies: ["No finishing or accurate outlet boxes"],
        },
        {
          name: "Door/window edge treatment",
          completion: 0,
          quality: "Poor",
          observations: "No architraves or finishing strips installed.",
          deficiencies: ["Raw edges, no protective seals"],
        },
        {
          name: "Final coat finish",
          completion: 0,
          quality: "Not Applicable",
          observations: "No painting or final finish.",
          deficiencies: ["Surface unfinished"],
        },
      ],
    },
    {
      name: "JOINERY WORKS",
      subcategories: [
        {
          name: "On wall markings (elec/plumbing/HVAC)",
          completion: 5,
          quality: "Fair",
          observations: "Minor red/blue markings; no legend.",
          deficiencies: ["No wall IDs or reference labels"],
        },
        {
          name: "Plastic finish or paint",
          completion: 0,
          quality: "Not Applicable",
          observations: "No visible finish on any joinery elements.",
          deficiencies: ["Joinery finishing not started"],
        },
        {
          name: "Joinery installation hardware",
          completion: 0,
          quality: "Not Applicable",
          observations: "No visible hinges, brackets, or support frames.",
          deficiencies: ["Joinery prep and fixing missing"],
        },
        {
          name: "Clear for joinery installation",
          completion: 25,
          quality: "Good",
          observations: "Walls free and accessible for future joinery.",
          deficiencies: ["No guides or starter points for carpentry"],
        },
      ],
    },
    {
      name: "CURTAIN WORKS",
      subcategories: [
        {
          name: "Curtain layer (1 or 2)",
          completion: 0,
          quality: "Not Applicable",
          observations: "No curtain elements seen.",
          deficiencies: ["Type/layer not decided on site"],
        },
        {
          name: "Box preparation",
          completion: 0,
          quality: "Not Applicable",
          observations: "No pelmet or recessed curtain boxes.",
          deficiencies: ["False ceiling not prepped for curtains"],
        },
        {
          name: "Light & elec point",
          completion: 0,
          quality: "Not Applicable",
          observations: "No control points or connections for motors.",
          deficiencies: ["Switch/relay point not present"],
        },
        {
          name: "Motorized or normal",
          completion: 0,
          quality: "Not Applicable",
          observations: "Undecided at this stage.",
          deficiencies: ["Not clarified on site"],
        },
        {
          name: "Track installation",
          completion: 0,
          quality: "Not Applicable",
          observations: "Not initiated.",
          deficiencies: ["Track base not fixed"],
        },
        {
          name: "Curtain installation",
          completion: 0,
          quality: "Not Applicable",
          observations: "Curtains not in place.",
          deficiencies: ["Curtain works pending"],
        },
      ],
    },
    {
      name: "GLASS WORK",
      subcategories: [
        {
          name: "Marking on site",
          completion: 0,
          quality: "Not Applicable",
          observations: "No marking for windows or doors.",
          deficiencies: ["Opening outlines not defined"],
        },
        {
          name: "Frame installation",
          completion: 0,
          quality: "Not Applicable",
          observations: "No aluminum or uPVC frames installed.",
          deficiencies: ["Frame placement not started"],
        },
        {
          name: "Sizing & measurement confirmation",
          completion: 0,
          quality: "Not Applicable",
          observations: "No tape markings or dimensional checks evident.",
          deficiencies: ["Dimensional survey absent"],
        },
        {
          name: "Glass installation",
          completion: 0,
          quality: "Not Applicable",
          observations: "Not present in any location.",
          deficiencies: ["Glass installation pending"],
        },
      ],
    },
  ],
  summary: {
    overallCompletion: 22,
    keyStrengths: [
      "Solid blockwork execution in progress",
      "Initial electrical ceiling conduits laid",
    ],
    keyDeficiencies: [
      "No HVAC, floor conduit, or sanitary work evident",
      "Wall and floor boxes largely missing",
      "Ceiling and finishes not initiated",
    ],
    recommendations: [
      "Begin ceiling and flooring layout to prevent delays",
      "Accelerate DB/floor/wall box installations",
      "Add level benchmarks and service labeling for coordination",
      "Ensure debris is cleared to allow clean joinery staging",
    ],
  },
  historicalTrends: [
    { date: "2025-06-01", completion: 40 },
    { date: "2025-06-15", completion: 55 },
    { date: "2025-06-22", completion: 65 },
    { date: "2025-06-29", completion: 73 },
    { date: "2025-07-01", completion: 78 },
  ],
  insights: {
    aiSummary:
      "Project progress shows strong structural foundation with blockwork at 85% completion. However, critical systems like HVAC, plumbing, and electrical installations are significantly behind schedule. Safety compliance at 38% requires immediate attention. The 53% gap between raw and finished phases indicates substantial work ahead.",
    recommendations: [
      "Prioritize safety compliance improvements to meet regulatory standards",
      "Accelerate HVAC and plumbing installations to prevent project delays",
      "Implement comprehensive quality control for electrical work",
      "Establish clear level benchmarks and service coordination protocols",
    ],
    risks: [
      {
        level: "high",
        description:
          "Safety compliance at 38% poses significant regulatory and operational risks",
      },
      {
        level: "medium",
        description:
          "Large gap between raw and finished phases may impact project timeline",
      },
    ],
  },
  images: {
    current: "./image1.jpg",
    render: "./image2.jpg",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <ConstructionReport data={sampleReportData} />
    </div>
  );
}
