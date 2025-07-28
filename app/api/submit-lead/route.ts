import { NextRequest, NextResponse } from 'next/server'

const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/18576297/uue0tef/'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Prepare data for Zapier webhook
    const zapierData = {
      timestamp: new Date().toISOString(),
      name: body.name,
      email: body.email,
      company: body.company || '',
      
      // Calculator results
      contractValue: body.contractValue,
      cashExtraction: body.cashExtraction,
      dealSize: body.dealSize,
      dailyLeads: body.dailyLeads,
      showUpRate: body.showUpRate,
      conversionRate: body.conversionRate,
      followUpIntensity: body.followUpIntensity,
      totalCrmLeads: body.totalCrmLeads,
      dailyBookedCalls: body.dailyBookedCalls,
      unqualifiedFraction: body.unqualifiedFraction,
      averageOrderValue: body.averageOrderValue,
      
      // Additional context
      source: 'Revenue Calculator',
      userAgent: request.headers.get('user-agent') || '',
    }

    // Send data to Zapier webhook
    const zapierResponse = await fetch(ZAPIER_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zapierData),
    })

    if (!zapierResponse.ok) {
      console.error('Zapier webhook failed:', zapierResponse.status, zapierResponse.statusText)
      // Still return success to user - we don't want to block their experience
      return NextResponse.json({ 
        success: true, 
        message: 'Lead captured successfully',
        warning: 'Webhook delivery pending'
      })
    }

    const zapierResult = await zapierResponse.text()
    console.log('Zapier webhook success:', zapierResult)

    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully' 
    })

  } catch (error) {
    console.error('Submit lead error:', error)
    
    // Return success even on error - don't block user experience
    return NextResponse.json({ 
      success: true, 
      message: 'Lead captured successfully',
      warning: 'Processing in background'
    })
  }
}