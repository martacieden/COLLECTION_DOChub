// Mock Data for Document Hub - додаткові дані для тестування

// Mock Search Queries and Expected Results
export interface SearchScenario {
  query: string;
  expectedResults: string[]; // IDs документів
  expectedCount: number;
}

export const mockSearchScenarios: SearchScenario[] = [
  {
    query: "all trust documents",
    expectedResults: ["doc-31"],
    expectedCount: 1
  },
  {
    query: "insurance policies for the ranch",
    expectedResults: ["doc-32"],
    expectedCount: 1
  },
  {
    query: "employee benefits handbook",
    expectedResults: ["doc-33", "doc-34"],
    expectedCount: 2
  },
  {
    query: "api documentation",
    expectedResults: ["doc-35"],
    expectedCount: 1
  },
  {
    query: "johnson family financial documents",
    expectedResults: ["doc-31", "doc-39"],
    expectedCount: 2
  },
  {
    query: "engineering documentation",
    expectedResults: ["doc-35", "doc-36"],
    expectedCount: 2
  },
  {
    query: "product roadmap",
    expectedResults: ["doc-37"],
    expectedCount: 1
  }
];

// Mock AI Chat Responses
export interface AIChatQuestion {
  question: string;
  answer: string;
}

export interface AIChatResponse {
  documentId: string;
  questions: AIChatQuestion[];
}

export const mockAIChatResponses: Record<string, AIChatResponse> = {
  "doc-31": {
    documentId: "doc-31",
    questions: [
      {
        question: "Who are the beneficiaries?",
        answer: "The primary beneficiaries are Robert Johnson Jr. (40%), Sarah Johnson (40%), and Emily Johnson (20%). There are also provisions for minor beneficiaries through a trust structure."
      },
      {
        question: "What happens if a beneficiary predeceases?",
        answer: "If a beneficiary predeceases the grantor, their share is redistributed equally among the surviving beneficiaries, with special provisions for minor children through a guardian trust."
      }
    ]
  },
  "doc-32": {
    documentId: "doc-32",
    questions: [
      {
        question: "What is the liability coverage limit?",
        answer: "The general liability coverage limit is $5 million per occurrence, with an aggregate limit of $10 million per policy period."
      },
      {
        question: "Does it cover equipment damage?",
        answer: "Yes, the policy covers equipment damage up to $500,000 per item, with a total equipment coverage limit of $2 million."
      }
    ]
  },
  "doc-33": {
    documentId: "doc-33",
    questions: [
      {
        question: "What is the PTO policy for new employees?",
        answer: "New employees accrue 15 days of PTO per year during their first three years, increasing to 20 days after three years of service. PTO accrues monthly at 1.25 days per month for the first tier."
      },
      {
        question: "What is the remote work policy?",
        answer: "Employees may work remotely up to 3 days per week with manager approval. Full remote work requires VP approval and is subject to quarterly performance reviews."
      }
    ]
  },
  "doc-35": {
    documentId: "doc-35",
    questions: [
      {
        question: "How do I authenticate API requests?",
        answer: "API requests require a Bearer token in the Authorization header. Tokens can be obtained through the /auth/login endpoint using valid credentials."
      },
      {
        question: "What is the rate limit?",
        answer: "The API has a rate limit of 100 requests per minute per API key. Exceeding this limit will result in a 429 Too Many Requests response."
      }
    ]
  }
};

// Mock Bulk Operations
export interface BulkOperation {
  type: "download" | "share" | "addToCollection" | "delete" | "move";
  documents: string[]; // IDs документів
  description: string;
  estimatedSize?: string; // Для download операцій
  shareWith?: string[]; // Для share операцій
  permissions?: "view" | "edit"; // Для share операцій
  collection?: string; // Для addToCollection операцій
  targetCollection?: string; // Для move операцій
}

export const mockBulkOperations: BulkOperation[] = [
  {
    type: "download",
    documents: ["doc-31", "doc-39"],
    description: "Download all Johnson family trust documents",
    estimatedSize: "7.8 MB"
  },
  {
    type: "share",
    documents: ["doc-35", "doc-36"],
    shareWith: ["New Engineering Associate"],
    permissions: "view",
    description: "Share engineering documentation with new team member"
  },
  {
    type: "addToCollection",
    documents: ["doc-37", "doc-38"],
    collection: "Q1 2025 Planning",
    description: "Add product documents to planning collection"
  },
  {
    type: "move",
    documents: ["doc-32"],
    targetCollection: "Insurance Documents",
    description: "Move insurance policy to insurance collection"
  },
  {
    type: "delete",
    documents: ["doc-temp-001"],
    description: "Delete temporary test documents"
  }
];

// Mock Upload Queue
export interface UploadItem {
  id: string;
  fileName: string;
  status: "uploading" | "queued" | "completed" | "failed" | "paused";
  progress: number; // 0-100
  size: number; // Розмір в байтах
  startTime: string | null; // ISO дата або null
  estimatedTimeRemaining?: string; // Для відображення
  error?: string; // Для failed статусу
}

export const mockUploadQueue: UploadItem[] = [
  {
    id: "upload-001",
    fileName: "Wayne_Trust_Annual_Review_2024.pdf",
    status: "uploading",
    progress: 65,
    size: 3456789,
    startTime: "2024-12-12T10:30:00Z",
    estimatedTimeRemaining: "45 seconds"
  },
  {
    id: "upload-002",
    fileName: "Property_Deed_Henderson_Ranch.pdf",
    status: "queued",
    progress: 0,
    size: 2345678,
    startTime: null,
    estimatedTimeRemaining: "2 minutes"
  },
  {
    id: "upload-003",
    fileName: "Employee_Handbook_2025_Update.pdf",
    status: "completed",
    progress: 100,
    size: 4567890,
    startTime: "2024-12-12T09:15:00Z",
    estimatedTimeRemaining: undefined
  },
  {
    id: "upload-004",
    fileName: "Large_Archive.zip",
    status: "failed",
    progress: 23,
    size: 123456789,
    startTime: "2024-12-12T08:00:00Z",
    error: "File size exceeds maximum limit of 100MB"
  },
  {
    id: "upload-005",
    fileName: "Contract_Amendment_Draft.docx",
    status: "paused",
    progress: 45,
    size: 567890,
    startTime: "2024-12-12T10:00:00Z",
    estimatedTimeRemaining: "30 seconds"
  }
];

// Mock Filter Options
export interface FilterOptions {
  categories: string[];
  workspaces: string[];
  dateRanges: string[];
  fileTypes: string[];
  tags: string[];
}

export const mockFilterOptions: FilterOptions = {
  categories: [
    "Legal Documents",
    "Insurance",
    "HR Policies",
    "Engineering",
    "Product",
    "Financial"
  ],
  workspaces: ["Athena", "Koop"],
  dateRanges: [
    "Last 7 days",
    "Last 30 days",
    "Last 90 days",
    "Last year",
    "All time"
  ],
  fileTypes: ["pdf", "docx", "xlsx", "pptx", "md", "png"],
  tags: [
    "trust",
    "estate-planning",
    "insurance",
    "hr",
    "benefits",
    "engineering",
    "api",
    "product",
    "financial",
    "tax"
  ]
};



