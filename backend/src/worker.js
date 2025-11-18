const MODEL = 'llama-3.3-70b-versatile'

const getCorsHeaders = (origin) => ({
  'Access-Control-Allow-Origin': origin || '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
})

const jsonResponse = (data, corsHeaders, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin')
    const corsHeaders = getCorsHeaders(origin)
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
        return jsonResponse({ status: 'ok', message: 'PerfectFit AI Worker API' }, corsHeaders)
      }

      if (request.method === 'POST' && url.pathname === '/api/recommend/bra') {
        const body = await request.json()
        const result = await handleRecommendation('bra', body, env)
        return jsonResponse(result, corsHeaders)
      }

      if (request.method === 'POST' && url.pathname === '/api/recommend/panty') {
        const body = await request.json()
        const result = await handleRecommendation('panty', body, env)
        return jsonResponse(result, corsHeaders)
      }

      return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
    } catch (error) {
      console.error('Worker error:', error)
      return jsonResponse({ error: 'Internal server error', message: error.message }, corsHeaders, 500)
    }
  },
}

async function handleRecommendation(type, formData = {}, env) {
  const { aiSummary, recommendedStyles, keywords } = await generateAiInsights(type, formData, env)

  const primaryQuery = buildSearchQuery(type, formData, keywords, true)
  let products = await fetchSerperProducts(primaryQuery, env)

  if (!products.length && formData.country) {
    const fallbackQuery = buildSearchQuery(type, formData, keywords, false)
    products = await fetchSerperProducts(fallbackQuery, env)
  }

  return {
    aiSummary,
    recommendedStyles,
    products,
  }
}

async function generateAiInsights(type, formData, env) {
  if (!env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set')
  }

  const prompt = type === 'bra' ? buildBraPrompt(formData) : buildPantyPrompt(formData)

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.7,
      max_tokens: 2000,
      messages: [
        {
          role: 'system',
          content:
            type === 'bra'
              ? 'You are a professional bra fitting expert with years of experience helping women find the perfect fit. Be detailed, helpful, and considerate.'
              : 'You are a professional panty fitting expert with years of experience helping women find the perfect fit. Be detailed, helpful, and considerate.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!groqResponse.ok) {
    const errorText = await groqResponse.text()
    throw new Error(`Groq API error (${groqResponse.status}): ${errorText}`)
  }

  const completion = await groqResponse.json()
  const aiResponse = completion.choices?.[0]?.message?.content || ''
  const { aiSummary, recommendedStyles, keywords } = parseAiResponse(aiResponse)

  return { aiSummary, recommendedStyles, keywords }
}

function parseAiResponse(aiResponse) {
  const analysisMatch = aiResponse.match(/ANALYSIS:\s*(.+?)(?=RECOMMENDED_STYLES:|$)/s)
  const stylesMatch = aiResponse.match(/RECOMMENDED_STYLES:\s*(.+?)(?=KEYWORDS:|$)/s)
  const keywordsMatch = aiResponse.match(/KEYWORDS:\s*(.+?)$/s)

  return {
    aiSummary: analysisMatch ? analysisMatch[1].trim() : aiResponse,
    recommendedStyles: stylesMatch ? stylesMatch[1].trim() : '',
    keywords: keywordsMatch ? keywordsMatch[1].trim() : '',
  }
}

function buildBraPrompt(formData) {
  return `You are a professional bra fitting expert. Based on the following user preferences, provide detailed recommendations:

Age Range: ${formData.ageRange || 'Not specified'}
Body Type: ${formData.bodyType || 'Not specified'}
Bra Size: ${formData.braSize || 'Not specified'}
Breast Type: ${formData.breastType || 'Not specified'}
Dress Type: ${formData.dressType || 'Not specified'}
Occasion: ${formData.occasion || 'Not specified'}
Appearance Preference: ${formData.appearancePreference || 'Not specified'}
For Sexual Experience: ${formData.sexualExperience || 'Not specified'}
Color Preference: ${formData.colorPreference || 'Any'}

Please provide:
1. A detailed analysis of why specific bra types would work best for this user
2. Recommended bra styles (e.g., push-up, sports bra, t-shirt bra, etc.)
3. Specific features to look for (e.g., padding, wire-free, seamless, etc.)
4. Shopping keywords that would help find the perfect bra (combine all relevant terms)

Format your response as:
ANALYSIS: [detailed explanation]
RECOMMENDED_STYLES: [specific bra types and features]
KEYWORDS: [comma-separated keywords for shopping search]`
}

function buildPantyPrompt(formData) {
  return `You are a professional panty fitting expert. Based on the following user preferences, provide detailed recommendations:

Age Range: ${formData.ageRange || 'Not specified'}
Body Type: ${formData.bodyType || 'Not specified'}
Hip Size: ${formData.hipSize || 'Not specified'} inches
Panty Size: ${formData.pantySize || 'Not specified'}
Butt Type: ${formData.buttType || 'Not specified'}
Panty Style Preference: ${formData.pantyStyle || 'Not specified'}
Purpose: ${formData.purpose || 'Not specified'}
Color Preference: ${formData.colorPreference || 'Any'}

Please provide:
1. A detailed analysis of why specific panty types would work best for this user
2. Recommended panty styles and features (e.g., seamless, high-waist, breathable, etc.)
3. Specific features to look for based on body type and purpose
4. Shopping keywords that would help find the perfect panty (combine all relevant terms)

Format your response as:
ANALYSIS: [detailed explanation]
RECOMMENDED_STYLES: [specific panty types and features]
KEYWORDS: [comma-separated keywords for shopping search]`
}

const toLower = (value) => (typeof value === 'string' ? value.toLowerCase() : '')

function buildSearchQuery(type, formData, keywords, includeCountry) {
  const segments = []
  if (type === 'bra') {
    segments.push('best bra')
    if (includeCountry && formData.country) segments.push(`in ${formData.country}`)
    if (formData.breastType) segments.push(`for ${toLower(formData.breastType)} breasts`)
    if (formData.dressType) segments.push(`for ${toLower(formData.dressType)}`)
    if (formData.appearancePreference) segments.push(toLower(formData.appearancePreference))
    if (formData.colorPreference) segments.push(`${toLower(formData.colorPreference)} color`)
    if (formData.braSize) segments.push(`size ${formData.braSize}`)
  } else {
    segments.push('best panty')
    if (includeCountry && formData.country) segments.push(`in ${formData.country}`)
    if (formData.buttType) segments.push(`for ${toLower(formData.buttType)}`)
    if (formData.pantyStyle) segments.push(`${toLower(formData.pantyStyle)} style`)
    if (formData.purpose) segments.push(`for ${toLower(formData.purpose)}`)
    if (formData.colorPreference) segments.push(`${toLower(formData.colorPreference)} color`)
    if (formData.pantySize) segments.push(`size ${formData.pantySize}`)
  }

  if (keywords) segments.push(keywords)

  return segments.join(' ').replace(/\s+/g, ' ').trim()
}

async function fetchSerperProducts(query, env) {
  if (!env.SERPER_API_KEY) {
    throw new Error('SERPER_API_KEY is not set')
  }

  try {
    const response = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': env.SERPER_API_KEY,
      },
      body: JSON.stringify({
        q: query,
        num: 40,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Serper API error (${response.status}): ${errorText}`)
    }

    const data = await response.json()
    return mapProducts(data?.shopping || [])
  } catch (error) {
    console.error('Serper API error:', error)
    return []
  }
}

function mapProducts(items) {
  if (!Array.isArray(items)) return []
  return items.map((item) => ({
    title: item.title,
    price: item.price,
    image: item.image || item.imageUrl,
    imageUrl: item.image || item.imageUrl,
    link: item.link,
    rating: item.rating,
    store: item.source,
  }))
}

