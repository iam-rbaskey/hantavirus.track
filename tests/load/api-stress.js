import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp up to 50 concurrent users
    { duration: '1m', target: 200 },  // Spike to 200 concurrent users
    { duration: '30s', target: 0 },   // Cool down
  ],
  thresholds: {
    // 95% of dashboard requests must complete in under 100ms (Cache hit expected)
    'http_req_duration{endpoint:dashboard}': ['p(95)<100'],
    
    // 95% of pagination queries must complete in under 500ms
    'http_req_duration{endpoint:countries}': ['p(95)<500'],
    
    // Global error rate must be beneath 1%
    http_req_failed: ['rate<0.01'],   
  },
};

const BASE_URL = 'http://localhost:3000/api/v1';

export default function () {
  // 1. Dashboard Endpoint (Heavily Cached)
  const dashboardRes = http.get(`${BASE_URL}/dashboard`, { tags: { endpoint: 'dashboard' } });
  check(dashboardRes, {
    'dashboard status is 200': (r) => r.status === 200,
    'dashboard returns success: true': (r) => JSON.parse(r.body).success === true,
  });

  sleep(1);

  // 2. Countries Pagination Endpoint (Database Hit)
  const countriesRes = http.get(`${BASE_URL}/countries?page=1&limit=20`, { tags: { endpoint: 'countries' } });
  check(countriesRes, {
    'countries status is 200': (r) => r.status === 200,
  });

  sleep(1);

  // 3. News Pagination Endpoint
  const newsRes = http.get(`${BASE_URL}/news?page=1&limit=10`, { tags: { endpoint: 'news' } });
  check(newsRes, {
    'news status is 200': (r) => r.status === 200,
  });

  sleep(1);

  // 4. Timeline Pagination Endpoint
  const timelineRes = http.get(`${BASE_URL}/timeline?page=1&limit=10`, { tags: { endpoint: 'timeline' } });
  check(timelineRes, {
    'timeline status is 200': (r) => r.status === 200,
  });
  
  sleep(1);
}
