import { HttpResponse, http } from 'msw';

type CreateUserBody = {
  email: string;
  password: string;
};

export const handlers = [
  http.get('/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Mock User',
    });
  }),

  http.post('/users', async ({ request }) => {
    const body = (await request.json()) as CreateUserBody;

    return HttpResponse.json({
      id: '123',
      ...body,
    });
  }),
];
