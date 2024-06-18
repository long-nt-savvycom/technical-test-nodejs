import http from 'k6/http';

import { check } from 'k6';

export const options = {
  vus: 10000, // Number of virtual users (concurrent users)
  duration: '1m', // Duration of the test (e.g., '10s', '1m', '2h')
  // thresholds: {
    // 'http_req_duration': ['p(95)<2000'], // 95% of requests should complete below 2 seconds
    // 'errors': ['rate<0.01'], // Error rate should be less than 1%
  // },
};


export default function () {
  const url = 'http://localhost:3001/v1/login';
  const payload = JSON.stringify({
    username: 'abc123',
    password: 'abc123',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };


  const res = http.post(url, payload, params);

  // Check if the request was successful
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

}
