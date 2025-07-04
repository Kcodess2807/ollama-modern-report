import { NextRequest, NextResponse } from 'next/server';

type OutputFormat = 'json' | 'markdown' | 'structured' | 'detailed';

// Utility function for safe error message extraction
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const errorObj = error as { message: unknown };
    if (typeof errorObj.message === 'string') {
      return errorObj.message;
    }
  }
  return String(error);
};

export async function POST(req: NextRequest) {
  try {
    const { image1, image2, outputFormat, siteInfo }: {
      image1: string;
      image2: string;
      outputFormat: OutputFormat;
      siteInfo: {
        date: string;
        location: string;
        supervisor: string;
        weather: string;
      };
    } = await req.json();

    console.log('Received request with images:', {
      image1Length: image1.length,
      image2Length: image2.length,
      siteInfo
    });

    // Check if Ollama is running first
    console.log('Checking Ollama service...');
    try {
      const healthCheck = await fetch('http://localhost:11434/api/tags', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!healthCheck.ok) {
        throw new Error(`Ollama health check failed with status: ${healthCheck.status}`);
      }
      
      console.log('Ollama service is running');
    } catch (healthError: unknown) {
      console.error('Ollama health check failed:', getErrorMessage(healthError));
      return NextResponse.json(
        { 
          error: 'Ollama service is not running or not accessible',
          details: 'Please ensure Ollama is running on localhost:11434',
          suggestion: 'Run "ollama serve" in your terminal'
        },
        { status: 503 }
      );
    }

    // Advanced construction-specific system prompt for dynamic analysis
    const systemPrompt = `You are a Senior Construction Project Manager and Quantity Surveyor with 25+ years of experience. Analyze these construction images and provide a comprehensive assessment.

CRITICAL ANALYSIS REQUIREMENTS:

IMAGE 1 - RAW CONSTRUCTION PHASE:
- Assess structural concrete work, blockwork progress, electrical rough-ins
- Evaluate plumbing installations, HVAC preparations, foundation quality
- Identify visible construction elements and their completion status

IMAGE 2 - FINISHED CONSTRUCTION PHASE:
- Analyze ceiling works, flooring installations, wall finishes
- Evaluate joinery work, curtain installations, glass work quality
- Assess lighting systems, furniture placement, overall completion

TRADE-SPECIFIC ASSESSMENT (provide realistic percentages based on visual evidence):

1. BLOCKWORK - Wall construction quality and completion
2. ELECTRICAL WORK - Installation progress and safety compliance
3. PLUMBING WORK - System installation and fixture placement
4. HVAC WORKS - Equipment and ductwork installation status
5. CEILING WORKS - False ceiling and lighting integration
6. FLOORING WORKS - Material installation and finishing quality
7. WALL FINISHES - Surface preparation and application quality
8. JOINERY WORKS - Doors, windows, built-in elements
9. CURTAIN WORKS - Window treatments and installation
10. GLASS WORK - Windows, partitions, quality assessment

Return this EXACT JSON structure with realistic values based on visual analysis:

{
  "phaseAnalysis": {
    "rawPhaseCompletion": <number 0-100>,
    "finishedPhaseCompletion": <number 0-100>,
    "progressGap": <number 0-100>,
    "estimatedTimespan": "<string>",
    "qualityConsistency": "<string>"
  },
  "metrics": {
    "overallCompletion": <number 0-100>,
    "structuralIntegrity": <number 0-100>,
    "alignmentAccuracy": <number 0-100>,
    "qualityScore": <number 0-100>,
    "safetyCompliance": <number 0-100>,
    "scheduleAdherence": <number 0-100>
  },
  "components": {
    "completed": <number>,
    "inProgress": <number>,
    "pending": <number>,
    "total": <number>
  },
  "tradeAnalysis": {
    "blockwork": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>", "<deficiency2>"],
      "compliance": "<compliance status>"
    },
    "electricalWork": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "plumbingWork": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "hvacWorks": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "ceilingWorks": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "flooringWorks": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "wallFinishes": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "joineryWorks": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "curtainWorks": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    },
    "glassWork": {
      "completionPercentage": <number 0-100>,
      "quality": "<Poor/Fair/Good/Excellent>",
      "status": "<completed/inProgress/pending>",
      "observations": "<specific observations>",
      "deficiencies": ["<deficiency1>"],
      "compliance": "<compliance status>"
    }
  },
  "componentDetails": [
    {"name": "Blockwork", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Electrical Work", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Plumbing Work", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "HVAC Works", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Ceiling Works", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Flooring Works", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Wall Finishes", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Joinery Works", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Curtain Works", "status": "<completed/inProgress/pending>", "quality": "<quality>"},
    {"name": "Glass Work", "status": "<completed/inProgress/pending>", "quality": "<quality>"}
  ],
  "visualObservations": {
    "rawPhaseDetails": "<detailed description of Image 1>",
    "finishedPhaseDetails": "<detailed description of Image 2>",
    "qualityIndicators": ["<indicator1>", "<indicator2>"],
    "deficiencies": ["<deficiency1>", "<deficiency2>"],
    "strengths": ["<strength1>", "<strength2>"]
  },
  "historicalTrends": [
    {"date": "2025-01-01", "completion": <estimated_percentage>},
    {"date": "2025-02-01", "completion": <estimated_percentage>},
    {"date": "2025-03-01", "completion": <estimated_percentage>},
    {"date": "2025-04-01", "completion": <estimated_percentage>},
    {"date": "2025-05-01", "completion": <estimated_percentage>},
    {"date": "2025-06-01", "completion": <estimated_percentage>},
    {"date": "${siteInfo.date}", "completion": <current_percentage>}
  ],
  "insights": {
    "aiSummary": "<comprehensive analysis based on visual evidence>",
    "recommendations": ["<recommendation1>", "<recommendation2>"],
    "risks": [
      {
        "level": "<low/medium/high>",
        "description": "<risk description>",
        "mitigation": "<mitigation strategy>"
      }
    ],
    "nextPhaseRequirements": ["<requirement1>", "<requirement2>"]
  }
}

Base ALL assessments on actual visual evidence from the images. Provide realistic construction industry percentages and observations.`;

    console.log('Sending request to Ollama...');

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llava:7b', // Changed to 3b model for better compatibility
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `Perform comprehensive construction trade analysis. Image 1: Raw construction phase with concrete work and structural elements. Image 2: Finished interior space with completed finishes. Analyze all 10 construction trades and provide realistic completion percentages and quality assessments based on visual evidence.`,
            images: [
              image1.split(',')[1],
              image2.split(',')[1]
            ]
          }
        ],
        stream: false,
        options: {
          temperature: 0.05,
          top_p: 0.7,
          num_ctx: 4096, // Reduced for better compatibility
          num_predict: 2048, // Reduced for better compatibility
          repeat_penalty: 1.2,
          seed: 42
        }
      }),
      signal: AbortSignal.timeout(120000) // 2 minute timeout
    });

    console.log('Ollama response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Ollama API error:', errorText);
      
      return NextResponse.json(
        { 
          error: `Ollama API error: ${response.status}`,
          details: errorText,
          suggestion: 'Check if the model is loaded and Ollama is running properly'
        },
        { status: 500 }
      );
    }

    const data = await response.json();
    let aiResult = data.message?.content || '';

    console.log('AI Result length:', aiResult.length);
    console.log('AI Result preview:', aiResult.substring(0, 500));

    if (!aiResult || aiResult.trim() === '') {
      console.error('Empty response from Ollama');
      return NextResponse.json(
        { 
          error: 'Empty response from Ollama',
          suggestion: 'Try again or check if the model supports image analysis'
        },
        { status: 500 }
      );
    }

    // Enhanced JSON cleaning for better parsing
    aiResult = aiResult.trim();
    
    // Remove any markdown formatting
    aiResult = aiResult.replace(/``````\n?/g, '');
    
    // Find JSON boundaries more accurately
    const jsonStart = aiResult.indexOf('{');
    const jsonEnd = aiResult.lastIndexOf('}');
    
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      aiResult = aiResult.substring(jsonStart, jsonEnd + 1);
    } else {
      console.error('No valid JSON found in response');
      return NextResponse.json(
        { 
          error: 'Invalid JSON response from AI',
          rawResponse: aiResult.substring(0, 500)
        },
        { status: 500 }
      );
    }

    try {
      const parsedResult = JSON.parse(aiResult);
      console.log('Successfully parsed AI result');
      
      // Validate that we have the required structure
      if (!parsedResult.metrics || !parsedResult.components) {
        throw new Error('Missing required data structure in AI response');
      }

      // Ensure components total is calculated correctly
      if (parsedResult.components) {
        const { completed, inProgress, pending } = parsedResult.components;
        parsedResult.components.total = (completed || 0) + (inProgress || 0) + (pending || 0);
      }

      // Ensure historicalTrends has proper date format
      if (parsedResult.historicalTrends && Array.isArray(parsedResult.historicalTrends)) {
        parsedResult.historicalTrends = parsedResult.historicalTrends.map((trend: any) => ({
          ...trend,
          date: trend.date || new Date().toISOString().split('T')[0]
        }));
      }

      const finalResult = {
        siteInfo,
        ...parsedResult
      };

      return NextResponse.json({ 
        result: JSON.stringify(finalResult, null, 2)
      });

    } catch (parseError: unknown) {
      console.error('JSON parse error:', getErrorMessage(parseError));
      console.error('AI response that failed to parse:', aiResult.substring(0, 1000));
      
      return NextResponse.json(
        { 
          error: 'Failed to parse AI response as valid JSON',
          details: getErrorMessage(parseError),
          rawResponse: aiResult.substring(0, 500)
        },
        { status: 500 }
      );
    }

  } catch (error: unknown) {
    console.error('Error:', getErrorMessage(error));
    return NextResponse.json(
      { 
        error: `Failed to process images: ${getErrorMessage(error)}`,
        suggestion: 'Check if Ollama is running and the model is available'
      },
      { status: 500 }
    );
  }
}
