import routes from './routes.ts';

function handler(request: Request) {
  const routeKeys = Object.keys(routes);

  for (const routeKey of routeKeys) {
    const route = routes[routeKey];
    const match = route.pattern.exec(request.url);

    if (match) {
      return route.handler(request, match);
    }
  }

  return new Response('Not Found', {
    status: 404,
  });
}

export const abortController = new AbortController();

const PORT = Deno.env.get('PORT') || 8000;

Deno.serve({ port: PORT as number, signal: abortController.signal }, handler);
