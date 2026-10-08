import type { SkillNode } from '../types/portfolio';

export const skillsData: SkillNode[] = [
  {
    id: 'sandhya',
    name: 'SANDHYA',
    category: 'core',
    color: '#a855f7',
    position: [0, 0, 0],
    description: 'Full Stack Developer • Specializing in React.js, TypeScript, Python, REST APIs, and MySQL/PostgreSQL architectures',
    connectionTo: ['react', 'typescript', 'python', 'fastapi', 'mysql', 'postgresql', 'apis'],
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    color: '#61dafb',
    position: [-2.4, 1.4, 0.4],
    description: 'Component-based architecture, responsive interfaces for HMS & Divine Food, custom hooks, and dynamic data-driven dashboards',
    connectionTo: ['typescript', 'redux', 'tailwind', 'javascript'],
    codeSnippet: `// Responsive Patient Queue & Appointment Hook (HMS)
export function useHospitalWorkflow(clinicId: string) {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [activeWaitTime, setActiveWaitTime] = useState(0);

  useEffect(() => {
    fetchActiveQueue(clinicId).then((data) => {
      setPatients(data.records);
      setActiveWaitTime(data.averageWaitMinutes);
    });
  }, [clinicId]);

  return { patients, activeWaitTime, activeCount: patients.length };
}`,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    color: '#3178c6',
    position: [-1.4, 2.2, -0.6],
    description: 'Strict type safety, generic interfaces, API contract validation, reducing runtime errors across enterprise web systems',
    connectionTo: ['react', 'fastapi', 'redux'],
    codeSnippet: `interface HMSPatientRecord {
  readonly patientId: string;
  readonly admissionTimestamp: string;
  fullName: string;
  triageSeverity: 'NORMAL' | 'URGENT' | 'CRITICAL';
  assignedDoctorId: string;
  vitalMetrics: {
    heartRateBpm: number;
    systolicBp: number;
    diastolicBp: number;
  };
}`,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    color: '#fbbf24',
    position: [2.2, 1.6, 0.3],
    description: 'Backend logic, deep learning pipelines, data structures & algorithms, OOP, automated testing, and retail billing logic',
    connectionTo: ['fastapi', 'mysql', 'oop'],
    codeSnippet: `# Modular Deep Learning Image Classification Pipeline
class RetinopathyPipeline:
    def __init__(self, model_weights: str):
        self.preprocessor = ImagePreprocessor(target_size=(512, 512))
        self.model = torch.load(model_weights)
        self.classes = ["No DR", "Mild", "Moderate", "Severe", "PDR"]

    def predict(self, raw_image: np.ndarray) -> dict:
        tensor = self.preprocessor.apply_clahe_and_crop(raw_image)
        with torch.no_grad():
            output = self.model(tensor)
            prob = torch.softmax(output, dim=-1)
            pred_idx = torch.argmax(prob).item()
            return {"stage": self.classes[pred_idx], "confidence": float(prob[pred_idx])}`,
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    color: '#059669',
    position: [1.6, 0.6, -1.2],
    description: 'Asynchronous RESTful APIs, Pydantic schema validation, high-concurrency routing, and automated OpenAPI documentation',
    connectionTo: ['python', 'mysql', 'apis'],
    codeSnippet: `@router.post("/hms/appointments/book", response_model=AppointmentResponse)
async def book_patient_appointment(
    payload: BookAppointmentSchema,
    db: Session = Depends(get_db)
):
    # Enforces transactional lock preventing double-booking
    service = AppointmentService(db)
    return await service.create_verified_slot(payload)`,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'database',
    color: '#00758f',
    position: [0.6, -2.1, -0.4],
    description: 'Optimized relational queries, schema normalization, transaction integrity, indexing, supporting 50+ concurrent users with zero race conditions',
    connectionTo: ['fastapi', 'python', 'postgresql'],
    codeSnippet: `-- Optimized Index & Query for HMS Core Workflows
EXPLAIN ANALYZE
SELECT p.id, p.full_name, a.appointment_time, a.status
FROM patients p
INNER JOIN appointments a ON p.id = a.patient_id
WHERE a.clinic_id = 104 AND a.status = 'SCHEDULED'
ORDER BY a.appointment_time ASC
LIMIT 50;`,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'database',
    color: '#336791',
    position: [1.8, -1.4, 0.5],
    description: 'ACID transactions, partitioned records, relational integrity, foreign key constraints, and ledger accounting',
    connectionTo: ['fastapi', 'mysql'],
  },
  {
    id: 'redux',
    name: 'Redux',
    category: 'frontend',
    color: '#764abc',
    position: [-2.6, 0.2, 1.2],
    description: 'Centralized state management, immutable state slices, asynchronous thunks, and predictable dashboard state handling (CodeTru)',
    connectionTo: ['react', 'typescript'],
  },
  {
    id: 'apis',
    name: 'REST APIs',
    category: 'backend',
    color: '#ec4899',
    position: [0.2, 1.8, 1.2],
    description: 'RESTful API development and integration, HTTP status semantics, payload serialization, and reduced response times',
    connectionTo: ['react', 'fastapi', 'python'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    color: '#f7df1e',
    position: [-2.6, -0.6, -0.8],
    description: 'ES6+ modules, asynchronous event loop, promises, functional programming, and clean DOM manipulation',
    connectionTo: ['react', 'html', 'css'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    color: '#38bdf8',
    position: [-1.8, -1.2, 0.8],
    description: 'Responsive UI components, design tokens, utility-first styling, and high-performance cross-device layouts',
    connectionTo: ['react', 'css'],
  },
  {
    id: 'oop',
    name: 'OOP & Concepts',
    category: 'core',
    color: '#10b981',
    position: [1.2, 2.2, 0.8],
    description: 'Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), Software Design Principles, Debugging & Clean Code',
    connectionTo: ['python', 'typescript'],
  },
  {
    id: 'git',
    name: 'Git & Agile',
    category: 'tools',
    color: '#f05032',
    position: [2.6, -0.4, -0.6],
    description: 'Git, GitHub, Agile/Scrum methodology, sprint planning, daily stand-ups, code reviews, and version control',
    connectionTo: ['sandhya'],
  },
];
