import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    
    if (!query) {
      return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
    }
    
    // For now, return a simple CSV with sample data
    // In a real implementation, this would fetch data based on the query
    const csvData = `Name,Date,Type,Status
John Doe,2024-01-15,Consultation,Completed
Jane Smith,2024-01-16,Cleaning,Completed
Bob Johnson,2024-01-17,Examination,Scheduled`;

    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="export-${Date.now()}.csv"`
      }
    });
    
  } catch (error: any) {
    console.error('❌ Error exporting CSV:', error);
    return NextResponse.json(
      { error: 'Failed to export CSV', details: error.message },
      { status: 500 }
    );
  }
}
