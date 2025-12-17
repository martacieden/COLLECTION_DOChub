// AI Rules Generator Service
// Calls Google Gemini API to generate collection rules from natural language descriptions

import { GoogleGenAI, Type } from '@google/genai';

export interface CollectionRule {
  id: string;
  type: 'document_type' | 'tags' | 'client' | 'keywords' | 'date_range' | 'vendor';
  label: string;
  value: string;
  operator: 'is' | 'contains' | 'equals' | 'not';
  enabled: boolean;
}

export interface GenerateRulesRequest {
  description: string;
  existingDocumentTypes?: string[];
  existingTags?: string[];
  existingClients?: string[];
  existingVendors?: string[];
}

export interface GenerateRulesResponse {
  rules: CollectionRule[];
  matchedDocCount: number;
  reasoning?: string;
}

// Get API key from environment variable
const getApiKey = (): string | null => {
  // Vite exposes env vars with VITE_ prefix
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_api_key_here') {
    console.error('[AI Service] VITE_GEMINI_API_KEY is not configured');
    console.error('[AI Service] Please add VITE_GEMINI_API_KEY=your_key to .env.local');
    return null;
  }
  
  return apiKey;
};

// Helper to wait for a specified time
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate collection rules using AI based on a natural language description
 * @param request - The description and optional context for rule generation
 * @returns Promise with generated rules or throws an error
 */
export async function generateCollectionRules(
  request: GenerateRulesRequest
): Promise<GenerateRulesResponse> {
  console.log('[AI Service] generateCollectionRules called');
  console.log('[AI Service] Description:', request.description);

  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error('API key not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.');
  }

  console.log('[AI Service] Initializing GoogleGenAI client');
  const ai = new GoogleGenAI({ apiKey });

  // Build the prompt - aligned with actual table columns in AllDocumentsTable
  const systemPrompt = `You are an AI assistant for a family office document management system. Users create "collections" to organize documents using filtering rules.

THE DOCUMENTS TABLE HAS THESE COLUMNS:
• Name - Document name (e.g., "Invoice #1247 - Electrical Work", "Building Permit - Oak Street")
• Description - Document description text
• Type - FILE FORMAT only: PDF, DOCX, XLSX (NOT semantic type!)
• Attached to - Projects/records (e.g., "Oak Street Renovation", "Financial - Invoices")
• Organization - Company name (e.g., "Smith Family", "Johnson Family Trust")
• Uploaded by - Person who uploaded
• Uploaded on - Date (e.g., "Nov 28, 2024")
• Signature status - Signed, Pending, Waiting for Signature

AVAILABLE RULE TYPES:

1. document_type (Document category) - Searches: Name, Description, Attached to, Category
   Use for semantic document categories found in NAME like: Invoice, Permit, Contract, Agreement, Change Order, Lien Waiver, Blueprint
   Example: "Invoice" matches "Invoice #1247 - Electrical Work Phase 1"

2. keywords - Searches: Name + Description
   Use for specific terms: project names, work types, locations
   Example: "Oak Street" matches docs with "Oak Street" in name or description
   Example: "electrical" matches "Invoice #1247 - Electrical Work"

3. client - Searches: Organization column
   Use for family offices/trusts: "Smith Family", "Johnson Family Trust", "Summation Partners"
   
4. vendor - Searches: Organization, Name, Description, Uploaded by
   Use for company names: "Studio XYZ", "ABC Plumbing"

5. date_range - Searches: Uploaded on column
   Use for dates/years: "2024", "Nov", "December"

6. tags - Searches: document tags (not visible in table but stored)
   Common tags: Construction, Architecture, Permits, Contract, Executed

OPERATORS: Use "contains" for flexibility, "is" for exact match, "not" to exclude

EXAMPLES:
"All invoices" → document_type CONTAINS "Invoice"

"Permits from Smith Family" → 
  document_type CONTAINS "Permit"
  client CONTAINS "Smith"

"Oak Street invoices from 2024" →
  document_type CONTAINS "Invoice"
  keywords CONTAINS "Oak Street"
  date_range CONTAINS "2024"

"PDF invoices from Johnson family about electrical work for 2025" →
  document_type CONTAINS "Invoice"
  client CONTAINS "Johnson"
  keywords CONTAINS "electrical"
  date_range CONTAINS "2025"
  (Note: PDF is ignored - it's a file format, not a filter)

RULES:
1. Generate a rule for EACH distinct filter criterion mentioned in the description
2. Typical criteria to look for:
   - Document category (invoice, permit, contract, etc.) → document_type
   - Family/company name → client
   - Project/location name → keywords
   - Year or date → date_range
   - Specific terms/topics → keywords
3. Use "contains" operator for all rules
4. IGNORE file formats like PDF, DOCX, XLSX - do not create rules for them
5. All rules: enabled=true
6. IDs: "rule-1", "rule-2", "rule-3", etc.
7. matchedDocCount: 0 (system calculates)`;

  const userPrompt = `Collection description: "${request.description}"
${request.existingDocumentTypes?.length ? `\nAvailable document types: ${request.existingDocumentTypes.join(', ')}` : ''}${request.existingTags?.length ? `\nAvailable tags: ${request.existingTags.join(', ')}` : ''}${request.existingClients?.length ? `\nKnown clients: ${request.existingClients.join(', ')}` : ''}${request.existingVendors?.length ? `\nKnown vendors: ${request.existingVendors.join(', ')}` : ''}

Generate the best filtering rules for this collection.`;

  // Retry logic for temporary errors (503, 429)
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[AI Service] Attempt ${attempt}/${maxRetries} - Calling Gemini API with model gemini-2.5-flash`);

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
        ],
        config: {
          temperature: 0.7,
          maxOutputTokens: 4096,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              rules: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    type: {
                      type: Type.STRING,
                      enum: ['document_type', 'tags', 'client', 'keywords', 'date_range', 'vendor']
                    },
                    label: { type: Type.STRING },
                    value: { type: Type.STRING },
                    operator: {
                      type: Type.STRING,
                      enum: ['is', 'contains', 'equals', 'not']
                    },
                    enabled: { type: Type.BOOLEAN }
                  },
                  required: ['id', 'type', 'label', 'value', 'operator', 'enabled']
                }
              },
              matchedDocCount: { type: Type.INTEGER },
              reasoning: { type: Type.STRING }
            },
            required: ['rules', 'matchedDocCount']
          }
        }
      });

      console.log('[AI Service] Gemini response received');
      console.log('[AI Service] Response text:', response.text);
      console.log('[AI Service] Finish reason:', response.candidates?.[0]?.finishReason);

      // Check if response was truncated
      const finishReason = response.candidates?.[0]?.finishReason;
      if (finishReason === 'MAX_TOKENS') {
        console.error('[AI Service] Response was truncated due to max tokens limit');
        throw new Error('AI response was truncated. Please try a shorter description.');
      }

      // Parse the response
      let result: GenerateRulesResponse;
      try {
        result = JSON.parse(response.text || '{}');
      } catch (parseError) {
        console.error('[AI Service] JSON parse error:', parseError);
        console.error('[AI Service] Raw response text:', response.text);
        throw new Error('AI returned invalid JSON. Please try again.');
      }

      console.log('[AI Service] Parsed result:', JSON.stringify(result, null, 2));
      console.log('[AI Service] Generated', result.rules?.length || 0, 'rules');

      // Validate the response structure
      if (!result.rules || !Array.isArray(result.rules)) {
        console.error('[AI Service] Invalid response structure - rules is not an array');
        throw new Error('Invalid response from AI: rules array is missing');
      }

      // Validate each rule has required fields
      for (const rule of result.rules) {
        if (!rule.id || !rule.type || !rule.label || !rule.operator) {
          console.error('[AI Service] Invalid rule structure:', rule);
          throw new Error('Invalid rule structure in AI response');
        }
      }

      if (result.reasoning) {
        console.log('[AI Service] AI reasoning:', result.reasoning);
      }

      return result;

    } catch (error) {
      console.error(`[AI Service] Attempt ${attempt} failed:`, error);
      lastError = error instanceof Error ? error : new Error(String(error));

      // Check if it's a retryable error (503 overloaded, 429 rate limit)
      const errorMessage = lastError.message || '';
      const isRetryable = errorMessage.includes('503') || 
                          errorMessage.includes('overloaded') || 
                          errorMessage.includes('UNAVAILABLE') ||
                          errorMessage.includes('429') ||
                          errorMessage.includes('RESOURCE_EXHAUSTED');

      if (isRetryable && attempt < maxRetries) {
        const waitTime = attempt * 2000; // 2s, 4s, 6s
        console.log(`[AI Service] Retryable error detected. Waiting ${waitTime}ms before retry...`);
        await sleep(waitTime);
        continue;
      }

      // Non-retryable error or max retries reached
      if (errorMessage.includes('API_KEY_INVALID')) {
        throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY in .env.local');
      }
      if (errorMessage.includes('PERMISSION_DENIED')) {
        throw new Error('Permission denied. Your API key may not have access to this model.');
      }
      if (errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('429')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      if (errorMessage.includes('503') || errorMessage.includes('overloaded') || errorMessage.includes('UNAVAILABLE')) {
        throw new Error('AI service is temporarily overloaded. Please try again in a few seconds.');
      }

      throw lastError;
    }
  }

  // This shouldn't be reached, but just in case
  throw lastError || new Error('Failed to generate rules after multiple attempts');
}

/**
 * Get label for rule type
 */
export function getRuleTypeLabel(type: CollectionRule['type']): string {
  const labels: Record<CollectionRule['type'], string> = {
    document_type: 'Document category',
    tags: 'Tags',
    client: 'Client',
    keywords: 'Contains keywords',
    date_range: 'Date range',
    vendor: 'Vendor',
  };
  return labels[type] || type;
}
