import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { HttpClient } from '../HttpClient';

const BASE_URL = 'http://localhost';

const server = setupServer();

describe('HttpClient', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('returns the GET response body', async () => {
    server.use(
      http.get(`${BASE_URL}/menu`, () => HttpResponse.json({ items: [{ id: '1' }] })),
    );

    await expect(HttpClient.get(`${BASE_URL}/menu`)).resolves.toEqual({
      items: [{ id: '1' }],
    });
  });

  it('sends a JSON body on POST and returns the response body', async () => {
    let receivedBody: unknown;

    server.use(
      http.post(`${BASE_URL}/otps`, async ({ request }) => {
        receivedBody = await request.json();
        return HttpResponse.json({ id: 'otp-1' }, { status: 201 });
      }),
    );

    const response = await HttpClient.post(`${BASE_URL}/otps`, { phone: '+79990000000' });

    expect(receivedBody).toEqual({ phone: '+79990000000' });
    expect(response).toEqual({ id: 'otp-1' });
  });

  it('sends a JSON body on PUT and returns the response body', async () => {
    let receivedBody: unknown;

    server.use(
      http.put(`${BASE_URL}/cart`, async ({ request }) => {
        receivedBody = await request.json();
        return HttpResponse.json({ ok: true });
      }),
    );

    await expect(HttpClient.put(`${BASE_URL}/cart`, { productId: '1' })).resolves.toEqual(
      {
        ok: true,
      },
    );
    expect(receivedBody).toEqual({ productId: '1' });
  });

  it('sends a JSON body on PATCH and returns the response body', async () => {
    let receivedBody: unknown;

    server.use(
      http.patch(`${BASE_URL}/cart/1`, async ({ request }) => {
        receivedBody = await request.json();
        return HttpResponse.json({ quantity: 2 });
      }),
    );

    await expect(
      HttpClient.patch(`${BASE_URL}/cart/1`, { quantity: 2 }),
    ).resolves.toEqual({
      quantity: 2,
    });
    expect(receivedBody).toEqual({ quantity: 2 });
  });

  it('sends a DELETE request and returns the response body', async () => {
    server.use(http.delete(`${BASE_URL}/cart/1`, () => HttpResponse.json({ ok: true })));

    await expect(HttpClient.delete(`${BASE_URL}/cart/1`)).resolves.toEqual({ ok: true });
  });

  it('appends query params to the request URL', async () => {
    let receivedUrl = '';

    server.use(
      http.get(`${BASE_URL}/menu`, ({ request }) => {
        receivedUrl = request.url;
        return HttpResponse.json([]);
      }),
    );

    await HttpClient.get(`${BASE_URL}/menu`, { params: { size: 'large' } });

    expect(new URL(receivedUrl).searchParams.get('size')).toBe('large');
  });

  it('rejects when the abort signal is aborted before the response', async () => {
    server.use(
      http.get(`${BASE_URL}/slow`, async () => {
        await delay('infinite');
        return HttpResponse.json({ ok: true });
      }),
    );

    const abortController = new AbortController();
    const requestPromise = HttpClient.get(`${BASE_URL}/slow`, {
      signal: abortController.signal,
    });

    abortController.abort();

    await expect(requestPromise).rejects.toThrow();
  });

  it('rejects when the response status is not 2xx', async () => {
    server.use(
      http.get(`${BASE_URL}/fail`, () =>
        HttpResponse.json({ message: 'nope' }, { status: 500 }),
      ),
    );

    await expect(HttpClient.get(`${BASE_URL}/fail`)).rejects.toThrow();
  });
});
