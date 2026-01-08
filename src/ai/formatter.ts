import { Answer } from './answerSchema';
import { analysisToHtml } from './analysisBanner';
import { toHtmlTable, toHtmlCards, toHtmlBullets, wrapResponse } from './formatHtml';

export function formatAnswerToHtml(ans: Answer): { analysisHtml: string; answerHtml: string } {
  // Build analysis HTML
  const analysisHtml = analysisToHtml(ans.analysis);
  
  // Build answer HTML
  let answerHtml = '';
  
  if (ans.format === 'table' && ans.columns && ans.rows) {
    const displayRows = ans.rows.slice(0, 20); // Limit to 20 rows
    const hasMore = ans.rows.length > 20;
    
    answerHtml = toHtmlTable(
      ans.title || 'Data Table',
      ans.subtitle || `${displayRows.length} rows${hasMore ? ' (showing first 20)' : ''}`,
      ans.columns,
      displayRows
    );
    
    if (hasMore) {
      answerHtml += `<p><em>Showing first 20 of ${ans.rows.length} rows</em></p>`;
    }
  } else if (ans.format === 'cards' && ans.cards) {
    answerHtml = toHtmlCards(ans.title || 'Cards', ans.cards);
  } else if (ans.format === 'bullets' && ans.bullets) {
    answerHtml = toHtmlBullets(ans.title || 'List', ans.bullets);
  } else if (ans.format === 'mixed' && ans.blocks) {
    const sections: string[] = [];
    
    ans.blocks.forEach(block => {
      if (block.kind === 'table' && block.columns && block.rows) {
        sections.push(toHtmlTable(
          block.title || 'Table',
          `${block.rows.length} rows`,
          block.columns,
          block.rows.slice(0, 20)
        ));
      } else if (block.kind === 'cards' && block.cards) {
        sections.push(toHtmlCards(block.title || 'Cards', block.cards));
      } else if (block.kind === 'bullets' && block.bullets) {
        sections.push(toHtmlBullets(block.title || 'List', block.bullets));
      }
    });
    
    answerHtml = wrapResponse(
      ans.title || 'Mixed Content',
      ans.subtitle || 'Multiple sections',
      sections,
      ans.notes,
      ans.followUps
    );
  } else {
    // Fallback for unknown format
    answerHtml = `<h2>${ans.title || 'Response'}</h2><p>${ans.subtitle || 'No content available'}</p>`;
  }
  
  // Add follow-ups and notes if not already included
  if (ans.format !== 'mixed' && (ans.notes || ans.followUps)) {
    const sections = [answerHtml];
    answerHtml = wrapResponse(
      ans.title || 'Response',
      ans.subtitle || '',
      sections,
      ans.notes,
      ans.followUps
    );
  }
  
  return { analysisHtml, answerHtml };
}
