export function toHtmlTable(title: string, subtitle: string, columns: string[], rows: (string|number)[][]): string {
  const headerRow = `<tr>${columns.map(col => `<th>${escapeHtml(col)}</th>`).join('')}</tr>`;
  const dataRows = rows.map(row => 
    `<tr>${row.map(cell => `<td>${escapeHtml(String(cell))}</td>`).join('')}</tr>`
  ).join('');
  
  return `
    <h2>${escapeHtml(title)}</h2>
    <p><em>${escapeHtml(subtitle)}</em></p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>${headerRow}</thead>
      <tbody>${dataRows}</tbody>
    </table>
  `;
}

export function toHtmlCards(title: string, cards: {heading: string, body: string, footnote?: string}[]): string {
  const cardHtml = cards.map(card => `
    <div style="border: 1px solid #ccc; padding: 12px; margin: 8px 0; border-radius: 4px;">
      <h3>${escapeHtml(card.heading)}</h3>
      <p>${escapeHtml(card.body)}</p>
      ${card.footnote ? `<small><em>${escapeHtml(card.footnote)}</em></small>` : ''}
    </div>
  `).join('');
  
  return `
    <h2>${escapeHtml(title)}</h2>
    ${cardHtml}
  `;
}

export function toHtmlBullets(title: string, bullets: string[]): string {
  const bulletList = `<ul>${bullets.map(bullet => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`;
  
  return `
    <h2>${escapeHtml(title)}</h2>
    ${bulletList}
  `;
}

export function wrapResponse(
  title: string, 
  subtitle: string, 
  sectionsHtml: string[], 
  notes?: string[], 
  followUps?: string[]
): string {
  const notesHtml = notes && notes.length > 0 ? 
    `<div style="background: #fff3cd; padding: 8px; margin: 12px 0; border-radius: 4px;">
      <strong>Notes:</strong><br>${notes.map(note => `• ${escapeHtml(note)}`).join('<br>')}
    </div>` : '';
    
  const followUpsHtml = followUps && followUps.length > 0 ?
    `<div style="background: #d1ecf1; padding: 8px; margin: 12px 0; border-radius: 4px;">
      <strong>Suggested Follow-ups:</strong><br>${followUps.map(follow => `• ${escapeHtml(follow)}`).join('<br>')}
    </div>` : '';
  
  return `
    <div>
      <h1>${escapeHtml(title)}</h1>
      <p><em>${escapeHtml(subtitle)}</em></p>
      ${sectionsHtml.join('')}
      ${notesHtml}
      ${followUpsHtml}
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
