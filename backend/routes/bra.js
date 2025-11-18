import express from 'express'
import Groq from 'groq-sdk'
import axios from 'axios'

const router = express.Router()
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

router.post('/bra', async (req, res) => {
  try {
    const formData = req.body

    // Build AI prompt
    const prompt = `You are a professional bra fitting expert. Based on the following user preferences, provide detailed recommendations:

Age Range: ${formData.ageRange}
Body Type: ${formData.bodyType}
Bra Size: ${formData.braSize}
Breast Type: ${formData.breastType}
Dress Type: ${formData.dressType}
Occasion: ${formData.occasion}
Appearance Preference: ${formData.appearancePreference}
For Sexual Experience: ${formData.sexualExperience}
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

    // Get AI response
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional bra fitting expert with years of experience helping women find the perfect fit. Be detailed, helpful, and considerate.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 2000,
    })

    const aiResponse = completion.choices[0]?.message?.content || ''

    // Parse AI response
    const analysisMatch = aiResponse.match(/ANALYSIS:\s*(.+?)(?=RECOMMENDED_STYLES:|$)/s)
    const stylesMatch = aiResponse.match(/RECOMMENDED_STYLES:\s*(.+?)(?=KEYWORDS:|$)/s)
    const keywordsMatch = aiResponse.match(/KEYWORDS:\s*(.+?)$/s)

    const aiSummary = analysisMatch ? analysisMatch[1].trim() : aiResponse
    const recommendedStyles = stylesMatch ? stylesMatch[1].trim() : ''
    const keywords = keywordsMatch ? keywordsMatch[1].trim() : ''

    // Build search query
    let searchQuery = `best bra`
    if (formData.breastType) searchQuery += ` for ${formData.breastType.toLowerCase()} breasts`
    if (formData.dressType) searchQuery += ` for ${formData.dressType.toLowerCase()}`
    if (formData.appearancePreference) searchQuery += ` ${formData.appearancePreference.toLowerCase()}`
    if (formData.colorPreference) searchQuery += ` ${formData.colorPreference.toLowerCase()} color`
    if (formData.braSize) searchQuery += ` size ${formData.braSize}`
    if (keywords) searchQuery += ` ${keywords}`

    // Search products using Serper
    let products = []
    try {
      const serperResponse = await axios.post(
        'https://google.serper.dev/shopping',
        {
          q: searchQuery,
          num: 40,
        },
        {
          headers: {
            'X-API-KEY': process.env.SERPER_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      )

      if (serperResponse.data && serperResponse.data.shopping) {
        products = serperResponse.data.shopping.map((item) => ({
          title: item.title,
          price: item.price,
          image: item.image,
          link: item.link,
          rating: item.rating,
          store: item.source,
        }))
      }
    } catch (error) {
      console.error('Serper API error:', error.message)
    }

    res.json({
      aiSummary,
      recommendedStyles,
      products,
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
})

export default router

