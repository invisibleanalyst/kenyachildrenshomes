import kenya from '@svg-maps/kenya';
export const countyMap = kenya;
const programmes = ['Learning & opportunity', 'Care & belonging', 'Health & wellbeing', 'Family & community'];
export const projects = kenya.locations.map((county, i) => ({id:county.id, county:county.name, title:[ 'Community learning hub', 'Family support programme', 'School essentials initiative', 'Community wellbeing centre'][i%4], programme:programmes[i%4], status:['Active','Completed','Planned'][i%3], children:40+i*7, progress:[64,100,18][i%3], year:2024+i%3, description:['A welcoming space for after-school learning, reading, and mentorship.', 'Practical support and guidance to help families provide stable, nurturing care.', 'Learning materials and classroom support to help children participate in school.', 'A community-led space connecting families with nutrition and wellbeing support.'][i%4]}));
export const programmeNames = programmes;
export const totals = {children:projects.reduce((n,p)=>n+p.children,0), active:projects.filter(p=>p.status==='Active').length, completed:projects.filter(p=>p.status==='Completed').length, planned:projects.filter(p=>p.status==='Planned').length};
