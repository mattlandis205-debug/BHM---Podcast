
import { HistoricalFigure } from './types';

export const FIGURES: HistoricalFigure[] = [
  {
    id: 'boston-king',
    name: 'Boston King',
    side: 'British',
    story: 'One of 500,000 enslaved people in the colonies. When the British took Charleston in 1780, he escaped to their lines, seeking the "happiness of liberty" promised by the King\'s proclamations.',
    outcome: 'Surviving smallpox and capture, he was eventually evacuated by the British to Nova Scotia in the "Book of Negroes," escaping the Americans who demanded his return.',
    image: 'https://m.media-amazon.com/images/I/61jgUyNrjAL._SL1275_.jpg'
  },
  {
    id: 'peter-salem',
    name: 'Peter Salem',
    side: 'American',
    story: 'Born into slavery in Massachusetts, Peter was freed by his master to enlist in the Continental Army. He fought at Bunker Hill, Harlem Heights, and Trenton.',
    outcome: 'While he fought for the Patriot cause, the new America did not offer broad freedom. By 1792, Black men were banned from the very militias they had served in.',
    image: 'https://freedomsway.org/wp-content/uploads/2021/09/Peter-Salem-by-Walter-J.-Williams-Jr.-Pastal-on-painting-1.jpg'
  },
  {
    id: 'elizabeth-freeman',
    name: 'Elizabeth Freeman',
    side: 'Legal',
    story: 'Also known as Mum Bett, she heard her owner drafting words about "equality and liberty" and decided to test them in court, arguing that the Massachusetts Constitution applied to her.',
    outcome: 'She won her case in 1781, helping to kick off "freedom suits" that eventually led to the end of slavery in her state, showing a legal path to liberation.',
    image: 'https://www.womenshistory.org/sites/default/files/styles/main_image/public/images/2021-04/Elizabeth-Freeman-Square.png?itok=Gh9kjkZX'
  }
];

export interface SortingFact {
  id: number;
  text: string;
  correctSide: 'British' | 'American';
}

export const FACTS_TO_SORT: SortingFact[] = [
  { id: 1, text: "Dunmore's Proclamation (1775): Freedom for Patriot-owned slaves.", correctSide: 'British' },
  { id: 2, text: "Philipsburg Proclamation (1779): Universal offer for runaways.", correctSide: 'British' },
  { id: 3, text: "The Book of Negroes: 3,000 souls evacuated to Canada.", correctSide: 'British' },
  { id: 4, text: "Brutal camp conditions and smallpox outbreaks.", correctSide: 'British' },
  { id: 5, text: "Rhode Island Slave Enlistment Act (1st RI Regiment).", correctSide: 'American' },
  { id: 6, text: "Freedom Suits used state constitutions to end slavery.", correctSide: 'American' },
  { id: 7, text: "Service in integrated Continental Army units.", correctSide: 'American' },
  { id: 8, text: "1792 Militia Act: Banning Black men from service.", correctSide: 'American' }
];

export const PODCAST_CONTEXT = `
This activity is based on a podcast about Black History Month and the American Revolution. 
Key themes:
1. The founding contradiction: Freedom for white colonists vs. slavery for Black people.
2. The British Promise: Proclamations (1775, 1779) offering freedom to slaves of PATRIOT masters only.
3. The American Reality: Black soldiers like Peter Salem fought for liberty, but the new nation failed to provide it broadly.
4. Elizabeth Freeman: Used the law to win her freedom in Massachusetts.
5. The Book of Negroes: 4,000 Black Loyalists were taken to Canada by the British.
`;
