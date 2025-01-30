import { RenderMode, ServerRoute } from '@angular/ssr';

export async function getPrerenderParams(): Promise<Record<string, string>[]> {
  return [
    { categoryId: '4' },
    { categoryId: '5' },
    { categoryId: '6' },
    { categoryId: '7' },
    { categoryId: '9' },
    { categoryId: '10' },
    { categoryId: '11' },
    { categoryId: '12' },
    { categoryId: '15' },
  ];
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'gallery/:categoryId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
