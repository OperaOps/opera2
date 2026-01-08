export interface Analysis {
  dataSources: string[];
  steps: string[];
  notes?: string[];
}

export function analysisToHtml(analysis: Analysis): string {
  const dataSourcesHtml = analysis.dataSources.map(source => 
    `<li><strong>📊</strong> ${escapeHtml(source)}</li>`
  ).join('');
  
  const stepsHtml = analysis.steps.map(step => 
    `<li><strong>⚙️</strong> ${escapeHtml(step)}</li>`
  ).join('');
  
  const notesHtml = analysis.notes && analysis.notes.length > 0 ? 
    `<div style="margin-top: 8px;">
      <strong>📝 Notes:</strong>
      <ul>${analysis.notes.map(note => `<li>${escapeHtml(note)}</li>`).join('')}</ul>
    </div>` : '';
  
  return `
    <div style="background: linear-gradient(to right, #e3f2fd, #f3e5f5); border: 1px solid #2196f3; padding: 12px; margin: 12px 0; border-radius: 8px;">
      <div style="display: flex; align-items: center; margin-bottom: 8px;">
        <span style="margin-right: 8px;">🤖</span>
        <strong>What Opera Did</strong>
      </div>
      <div>
        <strong>📊 Data Sources:</strong>
        <ul style="margin: 4px 0; padding-left: 20px;">${dataSourcesHtml}</ul>
        <strong>⚙️ Steps Taken:</strong>
        <ul style="margin: 4px 0; padding-left: 20px;">${stepsHtml}</ul>
        ${notesHtml}
      </div>
    </div>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
