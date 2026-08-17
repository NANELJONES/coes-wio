import { getSchools, getSchoolsList } from '@/lib/schools'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const minimal = searchParams.get('minimal') === 'true'
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const skip = parseInt(searchParams.get('skip') || '0', 10)
    
    // Get filter parameters
    const year = searchParams.get('year')
    const country = searchParams.get('country')
    const status = searchParams.get('status')
    
    // If minimal=true, only fetch essential fields (slug, name, year)
    // This is much lighter and faster for navigation lists
    let schools = minimal 
      ? await getSchoolsList(1000) // Get all for filtering
      : await getSchools(1000) // Get all for filtering
    
    // Apply filters
    if (year) {
      schools = schools.filter(s => s.schoolYear === parseInt(year))
    }
    if (country) {
      // Compare country case-insensitively since we capitalize in UI
      schools = schools.filter(s => {
        const schoolCountry = s.country?.toLowerCase()
        const filterCountry = country.toLowerCase()
        return schoolCountry === filterCountry
      })
    }
    if (status) {
      schools = schools.filter(s => s.schoolStatus === status)
    }
    
    // Apply pagination
    const total = schools.length
    const paginatedSchools = schools.slice(skip, skip + limit)
    const hasMore = skip + limit < total
    
    return Response.json({
      success: true,
      data: paginatedSchools,
      hasMore,
      count: paginatedSchools.length,
      total
    })
  } catch (error) {
    console.error('API Error fetching schools:', error)
    return Response.json({ 
      success: false, 
      message: 'Failed to fetch schools' 
    }, { status: 500 })
  }
}
